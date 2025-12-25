import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SharedAllocationPanel } from '../SharedAllocationPanel';
import type { AllocationBreakdown, ProtocolInfo } from '@/components/ui/allocation/types';

// Mock the child components
jest.mock('@/components/ui/allocation', () => ({
  AllocationComparison: ({
    before,
    after,
    timeframe,
    gradient,
  }: {
    before: AllocationBreakdown;
    after: AllocationBreakdown;
    timeframe: string;
    gradient: string;
  }) => (
    <div data-testid="allocation-comparison">
      <span data-testid="before">{JSON.stringify(before)}</span>
      <span data-testid="after">{JSON.stringify(after)}</span>
      <span data-testid="timeframe">{timeframe}</span>
      <span data-testid="gradient">{gradient}</span>
    </div>
  ),
  MaintainingAllocation: ({ message, subtitle }: { message: string; subtitle?: string }) => (
    <div data-testid="maintaining-allocation">
      <span data-testid="message">{message}</span>
      {subtitle && <span data-testid="subtitle">{subtitle}</span>}
    </div>
  ),
}));

jest.mock('../DirectionBadge', () => ({
  DirectionBadge: ({
    direction,
    label,
    regimeColor,
    isAutoPlaying,
  }: {
    direction: string;
    label: string;
    regimeColor: string;
    isAutoPlaying: boolean;
  }) => (
    <div data-testid="direction-badge">
      <span data-testid="direction">{direction}</span>
      <span data-testid="label">{label}</span>
      <span data-testid="regime-color">{regimeColor}</span>
      <span data-testid="auto-playing">{String(isAutoPlaying)}</span>
    </div>
  ),
}));

describe('SharedAllocationPanel', () => {
  const mockProtocols: ProtocolInfo = {
    stable: ['USDC', 'USDT'],
    lp: ['Uniswap V3'],
  };

  const mockAllocationBefore: AllocationBreakdown = {
    stable: 30,
    spot: 50,
    lp: 20,
  };

  const mockAllocationAfter: AllocationBreakdown = {
    stable: 60,
    spot: 25,
    lp: 15,
  };

  const baseProps = {
    regimeLabel: 'Fear',
    regimeColor: '#10b981',
    philosophy: 'Be fearful when others are greedy',
    author: 'Warren Buffett',
    strategyTitle: 'Reduce Risk',
    protocols: mockProtocols,
    isMaintaining: false,
  };

  describe('regime identity rendering', () => {
    it('renders regime label correctly', () => {
      render(<SharedAllocationPanel {...baseProps} />);
      expect(screen.getByText('Fear')).toBeInTheDocument();
    });

    it('renders regime philosophy correctly', () => {
      render(<SharedAllocationPanel {...baseProps} />);
      expect(screen.getByText('Be fearful when others are greedy')).toBeInTheDocument();
    });

    it('renders author with em dash prefix', () => {
      render(<SharedAllocationPanel {...baseProps} />);
      expect(screen.getByText('— Warren Buffett')).toBeInTheDocument();
    });

    it('renders color indicator with correct background', () => {
      const { container } = render(<SharedAllocationPanel {...baseProps} />);
      const colorIndicator = container.querySelector('.w-4.h-4.rounded-full');
      expect(colorIndicator).toHaveStyle({
        backgroundColor: '#10b981',
      });
    });

    it('applies regime color to philosophy text', () => {
      render(<SharedAllocationPanel {...baseProps} />);
      const philosophy = screen.getByText('Be fearful when others are greedy');
      expect(philosophy).toHaveStyle({ color: '#10b981' });
    });
  });

  describe('direction badge', () => {
    it('does not render direction badge when directionLabel is not provided', () => {
      render(<SharedAllocationPanel {...baseProps} />);
      expect(screen.queryByTestId('direction-badge')).not.toBeInTheDocument();
    });

    it('renders direction badge when directionLabel is provided', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          directionLabel="From Extreme Fear"
          animationDirection="forward"
        />
      );
      expect(screen.getByTestId('direction-badge')).toBeInTheDocument();
      expect(screen.getByTestId('label')).toHaveTextContent('From Extreme Fear');
    });

    it('passes correct animation direction to badge', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          directionLabel="Test Label"
          animationDirection="backward"
        />
      );
      expect(screen.getByTestId('direction')).toHaveTextContent('backward');
    });

    it('passes regime color to direction badge', () => {
      render(
        <SharedAllocationPanel {...baseProps} directionLabel="Test Label" regimeColor="#ff0000" />
      );
      expect(screen.getByTestId('regime-color')).toHaveTextContent('#ff0000');
    });

    it('passes isAutoPlaying flag to direction badge', () => {
      render(
        <SharedAllocationPanel {...baseProps} directionLabel="Test Label" isAutoPlaying={true} />
      );
      expect(screen.getByTestId('auto-playing')).toHaveTextContent('true');
    });
  });

  describe('allocation comparison mode', () => {
    it('shows AllocationComparison when isMaintaining is false and allocations are provided', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          isMaintaining={false}
          allocationBefore={mockAllocationBefore}
          allocationAfter={mockAllocationAfter}
        />
      );
      expect(screen.getByTestId('allocation-comparison')).toBeInTheDocument();
      expect(screen.queryByTestId('maintaining-allocation')).not.toBeInTheDocument();
    });

    it('passes correct allocation data to AllocationComparison', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          isMaintaining={false}
          allocationBefore={mockAllocationBefore}
          allocationAfter={mockAllocationAfter}
        />
      );
      expect(screen.getByTestId('before')).toHaveTextContent(JSON.stringify(mockAllocationBefore));
      expect(screen.getByTestId('after')).toHaveTextContent(JSON.stringify(mockAllocationAfter));
    });

    it('uses default timeframe when not provided', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          isMaintaining={false}
          allocationBefore={mockAllocationBefore}
          allocationAfter={mockAllocationAfter}
        />
      );
      expect(screen.getByTestId('timeframe')).toHaveTextContent('Over 5-10 days');
    });

    it('uses default gradient when not provided', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          isMaintaining={false}
          allocationBefore={mockAllocationBefore}
          allocationAfter={mockAllocationAfter}
        />
      );
      expect(screen.getByTestId('gradient')).toHaveTextContent('from-purple-400 to-blue-400');
    });

    it('uses provided timeframe when specified', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          isMaintaining={false}
          allocationBefore={mockAllocationBefore}
          allocationAfter={mockAllocationAfter}
          timeframe="Over 1-2 hours"
        />
      );
      expect(screen.getByTestId('timeframe')).toHaveTextContent('Over 1-2 hours');
    });

    it('uses provided gradient when specified', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          isMaintaining={false}
          allocationBefore={mockAllocationBefore}
          allocationAfter={mockAllocationAfter}
          comparisonGradient="from-green-400 to-blue-400"
        />
      );
      expect(screen.getByTestId('gradient')).toHaveTextContent('from-green-400 to-blue-400');
    });
  });

  describe('maintaining mode', () => {
    it('shows MaintainingAllocation when isMaintaining is true', () => {
      render(
        <SharedAllocationPanel {...baseProps} isMaintaining={true} strategyTitle="Hold Positions" />
      );
      expect(screen.getByTestId('maintaining-allocation')).toBeInTheDocument();
      expect(screen.queryByTestId('allocation-comparison')).not.toBeInTheDocument();
    });

    it('passes strategyTitle as message to MaintainingAllocation', () => {
      render(
        <SharedAllocationPanel {...baseProps} isMaintaining={true} strategyTitle="Monitor Market" />
      );
      expect(screen.getByTestId('message')).toHaveTextContent('Monitor Market');
    });

    it('passes strategySubtitle when provided', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          isMaintaining={true}
          strategyTitle="Hold Positions"
          strategySubtitle="Wait for signals"
        />
      );
      expect(screen.getByTestId('subtitle')).toHaveTextContent('Wait for signals');
    });

    it('shows MaintainingAllocation when allocations are missing', () => {
      render(
        <SharedAllocationPanel
          {...baseProps}
          isMaintaining={false}
          // No allocations provided
        />
      );
      expect(screen.getByTestId('maintaining-allocation')).toBeInTheDocument();
    });
  });

  describe('styling and layout', () => {
    it('applies correct container classes', () => {
      const { container } = render(<SharedAllocationPanel {...baseProps} />);
      const panel = container.querySelector('.bg-gray-900\\/95');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveClass('border', 'border-gray-800', 'rounded-2xl');
    });

    it('applies responsive padding classes', () => {
      const { container } = render(<SharedAllocationPanel {...baseProps} />);
      const panel = container.querySelector('.p-4');
      expect(panel).toBeInTheDocument();
    });

    it('applies overflow and height classes', () => {
      const { container } = render(<SharedAllocationPanel {...baseProps} />);
      const panel = container.querySelector('.overflow-y-auto');
      expect(panel).toHaveClass('h-full');
    });
  });

  describe('different regime scenarios', () => {
    const regimeScenarios = [
      {
        label: 'Extreme Fear',
        color: '#ef4444',
        philosophy: 'Buy when there is blood in the streets',
        author: 'Baron Rothschild',
      },
      {
        label: 'Greed',
        color: '#f59e0b',
        philosophy: 'Be greedy when others are fearful',
        author: 'Warren Buffett',
      },
      {
        label: 'Neutral',
        color: '#6b7280',
        philosophy: 'Markets can remain irrational longer than you can remain solvent',
        author: 'John Maynard Keynes',
      },
    ];

    regimeScenarios.forEach(({ label, color, philosophy, author }) => {
      it(`renders correctly for ${label} regime`, () => {
        const { unmount } = render(
          <SharedAllocationPanel
            {...baseProps}
            regimeLabel={label}
            regimeColor={color}
            philosophy={philosophy}
            author={author}
          />
        );

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(philosophy)).toBeInTheDocument();
        expect(screen.getByText(`— ${author}`)).toBeInTheDocument();

        unmount();
      });
    });
  });
});
