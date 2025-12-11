import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DirectionBadge } from '../DirectionBadge';

describe('DirectionBadge', () => {
  const defaultProps = {
    direction: 'forward' as const,
    label: 'Recovery Mode',
    regimeColor: '#3b82f6',
  };

  describe('direction rendering', () => {
    it('should render forward direction with correct gradient', () => {
      const { container } = render(<DirectionBadge {...defaultProps} />);

      const badge = container.querySelector('div');
      expect(badge).toHaveClass('from-blue-500/20');
      expect(badge).toHaveClass('to-cyan-500/20');
    });

    it('should render backward direction with correct gradient', () => {
      const { container } = render(<DirectionBadge {...defaultProps} direction="backward" />);

      const badge = container.querySelector('div');
      expect(badge).toHaveClass('from-red-500/20');
      expect(badge).toHaveClass('to-orange-500/20');
    });

    it('should render the provided label', () => {
      render(<DirectionBadge {...defaultProps} />);

      expect(screen.getByText('Recovery Mode')).toBeInTheDocument();
    });

    it('should render backward label', () => {
      render(<DirectionBadge {...defaultProps} direction="backward" label="Risk-Off" />);

      expect(screen.getByText('Risk-Off')).toBeInTheDocument();
    });
  });

  describe('autoplay animation', () => {
    it('should render without autoplay by default', () => {
      render(<DirectionBadge {...defaultProps} />);

      expect(screen.getByText('Recovery Mode')).toBeInTheDocument();
    });

    it('should render with autoplay enabled', () => {
      render(<DirectionBadge {...defaultProps} isAutoPlaying={true} />);

      expect(screen.getByText('Recovery Mode')).toBeInTheDocument();
    });

    it('should render backward with autoplay', () => {
      render(<DirectionBadge {...defaultProps} direction="backward" isAutoPlaying={true} />);

      expect(screen.getByText('Recovery Mode')).toBeInTheDocument();
    });
  });
});
