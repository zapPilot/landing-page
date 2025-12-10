import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { NetworkNode } from '../NetworkNode';
import type { Node } from '@/data/networkNodes';

describe('NetworkNode', () => {
  const mockNode: Node = {
    id: 'test-node',
    x: 100,
    y: 150,
    label: 'Test Protocol',
    type: 'protocol',
    color: '#8B5CF6',
    size: 45,
    icon: '🦄',
    apy: '18.4%',
    tvl: '$3.2B',
    status: 'active',
  };

  const defaultProps = {
    node: mockNode,
    isActive: false,
    isFocused: false,
    hasActiveConnection: false,
    onHoverStart: jest.fn(),
    onHoverEnd: jest.fn(),
    onClick: jest.fn(),
    onFocus: jest.fn(),
    index: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the node with correct label in aria-label', () => {
      render(<NetworkNode {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute(
        'aria-label',
        'Test Protocol - protocol with 18.4% APY'
      );
    });

    it('should render the node icon', () => {
      render(<NetworkNode {...defaultProps} />);

      expect(screen.getByText('🦄')).toBeInTheDocument();
    });

    it('should position node at correct coordinates', () => {
      const { container } = render(<NetworkNode {...defaultProps} />);

      const nodeDiv = container.firstChild as HTMLElement;
      expect(nodeDiv.style.left).toBe('100px');
      expect(nodeDiv.style.top).toBe('150px');
    });

    it('should apply transform classes for centering', () => {
      const { container } = render(<NetworkNode {...defaultProps} />);

      const nodeDiv = container.firstChild as HTMLElement;
      expect(nodeDiv).toHaveClass('-translate-x-1/2');
      expect(nodeDiv).toHaveClass('-translate-y-1/2');
    });
  });

  describe('tooltip/active state', () => {
    it('should show tooltip content when isActive is true', () => {
      render(<NetworkNode {...defaultProps} isActive={true} />);

      expect(screen.getByText('Test Protocol')).toBeInTheDocument();
      expect(screen.getByText('APY:')).toBeInTheDocument();
      expect(screen.getByText('18.4%')).toBeInTheDocument();
      expect(screen.getByText('TVL:')).toBeInTheDocument();
      expect(screen.getByText('$3.2B')).toBeInTheDocument();
    });

    it('should show status badge in tooltip when active', () => {
      render(<NetworkNode {...defaultProps} isActive={true} />);

      expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    });

    it('should not show tooltip when isActive is false', () => {
      render(<NetworkNode {...defaultProps} isActive={false} />);

      expect(screen.queryByText('APY:')).not.toBeInTheDocument();
      expect(screen.queryByText('TVL:')).not.toBeInTheDocument();
    });
  });

  describe('focus state', () => {
    it('should apply focus ring when isFocused is true', () => {
      const { container } = render(<NetworkNode {...defaultProps} isFocused={true} />);

      const nodeDiv = container.firstChild as HTMLElement;
      expect(nodeDiv).toHaveClass('ring-2');
      expect(nodeDiv).toHaveClass('ring-purple-400');
    });

    it('should not apply focus ring when isFocused is false', () => {
      const { container } = render(<NetworkNode {...defaultProps} isFocused={false} />);

      const nodeDiv = container.firstChild as HTMLElement;
      expect(nodeDiv).not.toHaveClass('ring-2');
    });

    it('should have tabIndex 0 when focused', () => {
      render(<NetworkNode {...defaultProps} isFocused={true} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabindex', '0');
    });

    it('should have tabIndex -1 when not focused', () => {
      render(<NetworkNode {...defaultProps} isFocused={false} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('active connection indicator', () => {
    it('should show green indicator when hasActiveConnection is true', () => {
      const { container } = render(
        <NetworkNode {...defaultProps} hasActiveConnection={true} />
      );

      const indicator = container.querySelector('.bg-green-400');
      expect(indicator).toBeInTheDocument();
    });

    it('should not show indicator when hasActiveConnection is false', () => {
      const { container } = render(
        <NetworkNode {...defaultProps} hasActiveConnection={false} />
      );

      const indicator = container.querySelector('.bg-green-400');
      expect(indicator).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should call onClick with node id when clicked', () => {
      const onClick = jest.fn();
      render(<NetworkNode {...defaultProps} onClick={onClick} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledWith('test-node');
    });

    it('should call onFocus when focused', () => {
      const onFocus = jest.fn();
      render(<NetworkNode {...defaultProps} onFocus={onFocus} />);

      const button = screen.getByRole('button');
      fireEvent.focus(button);

      expect(onFocus).toHaveBeenCalled();
    });
  });

  describe('node types', () => {
    it('should render chain node without APY', () => {
      const chainNode: Node = {
        id: 'ethereum',
        x: 200,
        y: 100,
        label: 'Ethereum',
        type: 'chain',
        color: '#627EEA',
        size: 38,
        icon: 'Ξ',
        status: 'mainnet',
      };

      render(<NetworkNode {...defaultProps} node={chainNode} isActive={true} />);

      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.queryByText('APY:')).not.toBeInTheDocument();
      expect(screen.getByText('MAINNET')).toBeInTheDocument();
    });

    it('should render intent node', () => {
      const intentNode: Node = {
        id: 'user',
        x: 300,
        y: 250,
        label: 'Portfolio Intent',
        type: 'intent',
        color: '#8B5CF6',
        size: 70,
        icon: '💼',
      };

      render(<NetworkNode {...defaultProps} node={intentNode} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Portfolio Intent - intent ');
    });
  });

  describe('status badge styling', () => {
    it('should apply green styling for active status', () => {
      render(<NetworkNode {...defaultProps} isActive={true} />);

      const statusBadge = screen.getByText('ACTIVE');
      expect(statusBadge).toHaveClass('bg-green-500/20');
      expect(statusBadge).toHaveClass('text-green-400');
    });

    it('should apply blue styling for mainnet status', () => {
      const mainnetNode = { ...mockNode, status: 'mainnet' };
      render(<NetworkNode {...defaultProps} node={mainnetNode} isActive={true} />);

      const statusBadge = screen.getByText('MAINNET');
      expect(statusBadge).toHaveClass('bg-blue-500/20');
      expect(statusBadge).toHaveClass('text-blue-400');
    });

    it('should apply purple styling for L2 status', () => {
      const l2Node = { ...mockNode, status: 'l2' };
      render(<NetworkNode {...defaultProps} node={l2Node} isActive={true} />);

      const statusBadge = screen.getByText('L2');
      expect(statusBadge).toHaveClass('bg-purple-500/20');
      expect(statusBadge).toHaveClass('text-purple-400');
    });
  });

  describe('accessibility', () => {
    it('should have button role for keyboard navigation', () => {
      render(<NetworkNode {...defaultProps} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have descriptive aria-label', () => {
      render(<NetworkNode {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-label')).toContain('Test Protocol');
      expect(button.getAttribute('aria-label')).toContain('protocol');
      expect(button.getAttribute('aria-label')).toContain('18.4% APY');
    });

    it('should have cursor-pointer class', () => {
      const { container } = render(<NetworkNode {...defaultProps} />);

      const nodeDiv = container.firstChild as HTMLElement;
      expect(nodeDiv).toHaveClass('cursor-pointer');
    });
  });
});
