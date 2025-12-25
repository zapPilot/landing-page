import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MaintainingAllocation } from '../MaintainingAllocation';

describe('MaintainingAllocation', () => {
  describe('basic rendering', () => {
    it('renders with default props', () => {
      render(<MaintainingAllocation />);
      expect(screen.getByText('Maintaining current allocation')).toBeInTheDocument();
      expect(screen.getByText('Zero rebalancing — Holiday Mode')).toBeInTheDocument();
    });

    it('renders custom message', () => {
      render(<MaintainingAllocation message="Custom message" />);
      expect(screen.getByText('Custom message')).toBeInTheDocument();
    });

    it('renders custom subtitle', () => {
      render(<MaintainingAllocation subtitle="Custom subtitle" />);
      expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
    });

    it('renders CheckCircle icon', () => {
      const { container } = render(<MaintainingAllocation />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('text-green-400');
    });
  });

  describe('SubtitleChip integration', () => {
    it('renders SubtitleChip component', () => {
      const { container } = render(<MaintainingAllocation subtitle="Test subtitle" />);
      expect(container.querySelector('.rounded-full')).toBeInTheDocument();
    });

    it('passes subtitle prop to SubtitleChip', () => {
      render(<MaintainingAllocation subtitle="Rotating Stables: Lending ➔ Perps" />);
      expect(screen.getByText(/Lending/)).toBeInTheDocument();
      expect(screen.getByText(/Perps/)).toBeInTheDocument();
    });

    it('renders flow arrow icon for subtitles with arrows', () => {
      const { container } = render(<MaintainingAllocation subtitle="A ➔ B" />);
      const icons = container.querySelectorAll('svg');
      // CheckCircle icon + ArrowRight icon = 2 icons
      expect(icons.length).toBeGreaterThanOrEqual(2);
    });

    it('passes parts array subtitle to SubtitleChip', () => {
      const subtitle = [{ text: 'Test ' }, { text: 'Keyword', emphasis: true }];

      render(<MaintainingAllocation subtitle={subtitle} />);
      expect(screen.getByText('Keyword')).toHaveClass('text-blue-400', 'font-semibold');
    });
  });

  describe('styling', () => {
    it('applies correct container classes', () => {
      const { container } = render(<MaintainingAllocation />);
      const panel = container.querySelector('.bg-gray-800\\/50');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveClass('border', 'border-gray-700', 'rounded-2xl');
    });

    it('applies vertical spacing to content', () => {
      const { container } = render(<MaintainingAllocation />);
      const contentDiv = container.querySelector('.space-y-2');
      expect(contentDiv).toBeInTheDocument();
    });
  });
});
