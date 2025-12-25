import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SubtitleChip } from '../SubtitleChip';

describe('SubtitleChip', () => {
  describe('simple subtitles (no flow indicators)', () => {
    it('renders plain text subtitle correctly', () => {
      render(<SubtitleChip subtitle="Zero rebalancing unless risk spikes" />);
      expect(screen.getByText('Zero rebalancing unless risk spikes')).toBeInTheDocument();
    });

    it('applies chip styling without animation', () => {
      const { container } = render(<SubtitleChip subtitle="Maintaining defensive allocation" />);
      const chip = container.querySelector('.rounded-full');
      expect(chip).toHaveClass('bg-gray-800', 'border-gray-600', 'text-gray-300');
    });

    it('does not render ArrowRight icon for plain text', () => {
      const { container } = render(<SubtitleChip subtitle="Holding positions; risk off" />);
      const icon = container.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('flow indicator subtitles', () => {
    it('detects unicode arrow (➔) and renders ArrowRight icon', () => {
      const { container } = render(<SubtitleChip subtitle="Lending ➔ Perps" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('animate-pulse');
    });

    it('detects alternative arrow (→) and renders icon', () => {
      const { container } = render(<SubtitleChip subtitle="Spot → LP" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('detects ASCII arrow (->) and renders icon', () => {
      const { container } = render(<SubtitleChip subtitle="USDC -> USDT" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('preserves text before and after arrow', () => {
      render(<SubtitleChip subtitle="Lending ➔ Perps" />);
      expect(screen.getByText(/Lending/)).toBeInTheDocument();
      expect(screen.getByText(/Perps/)).toBeInTheDocument();
    });

    it('applies pulse animation with 2s duration', () => {
      const { container } = render(<SubtitleChip subtitle="A ➔ B" />);
      const icon = container.querySelector('svg');
      expect(icon).toHaveStyle({ animationDuration: '2s' });
    });

    it('applies blue color to arrow icon', () => {
      const { container } = render(<SubtitleChip subtitle="A ➔ B" />);
      const icon = container.querySelector('svg');
      expect(icon).toHaveClass('text-blue-400');
    });

    it('handles multiple arrows correctly', () => {
      const { container } = render(<SubtitleChip subtitle="A ➔ B ➔ C" />);
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(2);
    });
  });

  describe('edge cases', () => {
    it('handles empty subtitle gracefully', () => {
      const { container } = render(<SubtitleChip subtitle="" />);
      expect(container.querySelector('.rounded-full')).toBeInTheDocument();
    });

    it('handles subtitle with only arrow', () => {
      const { container } = render(<SubtitleChip subtitle="➔" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('handles mixed arrow types', () => {
      const { container } = render(<SubtitleChip subtitle="A → B ➔ C" />);
      const icons = container.querySelectorAll('svg');
      expect(icons).toHaveLength(2);
    });
  });

  describe('styling consistency', () => {
    it('applies consistent chip styling regardless of content', () => {
      const { container: simpleContainer } = render(<SubtitleChip subtitle="Simple text" />);
      const { container: flowContainer } = render(<SubtitleChip subtitle="A ➔ B" />);

      const simpleChip = simpleContainer.querySelector('.rounded-full');
      const flowChip = flowContainer.querySelector('.rounded-full');

      expect(simpleChip?.className).toEqual(flowChip?.className);
    });
  });

  describe('SubtitleChip with parts array', () => {
    describe('keyword emphasis', () => {
      it('emphasizes keywords with blue color and semibold weight', () => {
        const subtitle = [
          { text: 'Rotating Stables: ' },
          { text: 'Lending', emphasis: true },
          { text: ' ➔ ' },
          { text: 'Perps', emphasis: true },
        ];

        const { container } = render(<SubtitleChip subtitle={subtitle} />);

        const emphasizedSpans = container.querySelectorAll('.text-blue-400.font-semibold');
        expect(emphasizedSpans).toHaveLength(2);
        expect(emphasizedSpans[0]).toHaveTextContent('Lending');
        expect(emphasizedSpans[1]).toHaveTextContent('Perps');
      });

      it('renders non-emphasized text in gray-300', () => {
        const subtitle = [{ text: 'Context text' }, { text: 'Keyword', emphasis: true }];

        const { container } = render(<SubtitleChip subtitle={subtitle} />);

        const contextSpan = container.querySelector('.text-gray-300');
        expect(contextSpan).toHaveTextContent('Context text');
      });

      it('replaces arrow parts with ArrowRight icon', () => {
        const subtitle = [{ text: 'Before' }, { text: ' ➔ ' }, { text: 'After' }];

        const { container } = render(<SubtitleChip subtitle={subtitle} />);

        const arrow = container.querySelector('svg');
        expect(arrow).toBeInTheDocument();
        expect(arrow).toHaveClass('text-blue-400', 'animate-pulse');
      });

      it('handles mixed emphasis correctly', () => {
        const subtitle = [
          { text: 'Zero rebalancing unless ' },
          { text: 'risk', emphasis: true },
          { text: ' spikes' },
        ];

        render(<SubtitleChip subtitle={subtitle} />);

        expect(screen.getByText(/Zero rebalancing unless/)).toHaveClass('text-gray-300');
        expect(screen.getByText('risk')).toHaveClass('text-blue-400', 'font-semibold');
        expect(screen.getByText(/spikes/)).toHaveClass('text-gray-300');
      });
    });

    describe('backward compatibility', () => {
      it('still renders legacy string format', () => {
        render(<SubtitleChip subtitle="Simple string subtitle" />);
        expect(screen.getByText('Simple string subtitle')).toBeInTheDocument();
      });

      it('handles legacy string with arrow', () => {
        const { container } = render(<SubtitleChip subtitle="A ➔ B" />);
        const arrow = container.querySelector('svg');
        expect(arrow).toBeInTheDocument();
      });
    });

    describe('edge cases', () => {
      it('handles empty parts array', () => {
        const { container } = render(<SubtitleChip subtitle={[]} />);
        expect(container.querySelector('.rounded-full')).toBeInTheDocument();
      });

      it('handles parts with only emphasis', () => {
        const subtitle = [
          { text: 'Keyword1', emphasis: true },
          { text: 'Keyword2', emphasis: true },
        ];

        const { container } = render(<SubtitleChip subtitle={subtitle} />);
        const emphasized = container.querySelectorAll('.text-blue-400');
        expect(emphasized).toHaveLength(2);
      });

      it('handles parts with no emphasis', () => {
        const subtitle = [{ text: 'Text1' }, { text: 'Text2' }];

        const { container } = render(<SubtitleChip subtitle={subtitle} />);
        const normal = container.querySelectorAll('.text-gray-300');
        expect(normal).toHaveLength(2);
      });

      it('handles different arrow formats', () => {
        const subtitle1 = [{ text: '➔' }];
        const subtitle2 = [{ text: '→' }];
        const subtitle3 = [{ text: ' ➔ ' }];
        const subtitle4 = [{ text: '->' }];

        const { container: c1 } = render(<SubtitleChip subtitle={subtitle1} />);
        const { container: c2 } = render(<SubtitleChip subtitle={subtitle2} />);
        const { container: c3 } = render(<SubtitleChip subtitle={subtitle3} />);
        const { container: c4 } = render(<SubtitleChip subtitle={subtitle4} />);

        expect(c1.querySelector('svg')).toBeInTheDocument();
        expect(c2.querySelector('svg')).toBeInTheDocument();
        expect(c3.querySelector('svg')).toBeInTheDocument();
        expect(c4.querySelector('svg')).toBeInTheDocument();
      });
    });
  });
});
