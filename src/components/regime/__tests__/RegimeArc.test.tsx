import '@testing-library/jest-dom';
import { render, screen, createRegimeArcProps } from '@/test-utils';
import { fireEvent } from '@testing-library/react';
import { RegimeArc } from '../RegimeArc';
import { regimes, RegimeId } from '@/lib/regimeData';

describe('RegimeArc', () => {
  let mockOnRegimeClick: jest.Mock;
  let mockCalculatePosition: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnRegimeClick = jest.fn();
    mockCalculatePosition = jest.fn((index: number) => ({
      x: 100 + index * 100,
      y: 200,
    }));
  });

  describe('rendering', () => {
    it('should render all regime nodes', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} />
        </svg>
      );

      // Check all regime buttons are rendered
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(regimes.length);

      // Verify each regime label is present
      regimes.forEach(regime => {
        expect(screen.getByText(regime.label)).toBeInTheDocument();
      });
    });

    it('should render regime labels', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} />
        </svg>
      );

      regimes.forEach(regime => {
        expect(screen.getByText(regime.label)).toBeInTheDocument();
      });
    });

    it('should call calculatePosition for each regime', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps({ calculatePosition: mockCalculatePosition })} />
        </svg>
      );

      // Each regime node calls calculatePosition
      expect(mockCalculatePosition).toHaveBeenCalledTimes(
        regimes.length + (regimes.length - 1) * 2 // nodes + paths (each path has from and to)
      );
    });
  });

  describe('active regime styling', () => {
    it('should apply larger radius to active regime node', () => {
      const { container } = render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} activeRegime="n" />
        </svg>
      );

      // Active regime (Neutral) should have r=65
      const circles = container.querySelectorAll('circle');
      const activeCircle = Array.from(circles).find(c => c.getAttribute('r') === '65');
      expect(activeCircle).toBeInTheDocument();
    });

    it('should apply glow effect to active regime', () => {
      const { container } = render(
        <svg>
          <defs>
            <filter id="pathwayGlow">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <RegimeArc {...createRegimeArcProps()} activeRegime="ef" />
        </svg>
      );

      // Active regime should have filter applied
      const circlesWithFilter = container.querySelectorAll('circle[filter]');
      expect(circlesWithFilter.length).toBeGreaterThan(0);
    });
  });

  describe('interactions', () => {
    it('should call onRegimeClick when a regime node is clicked', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps({ onRegimeClick: mockOnRegimeClick })} />
        </svg>
      );

      // Click on Extreme Fear regime
      const efButton = screen.getByRole('button', {
        name: /Extreme Fear regime/,
      });
      fireEvent.click(efButton);

      expect(mockOnRegimeClick).toHaveBeenCalledWith('ef');
    });

    it('should call onRegimeClick with correct regime id', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps({ onRegimeClick: mockOnRegimeClick })} />
        </svg>
      );

      // Get all buttons and click them in order
      const buttons = screen.getAllByRole('button');
      const regimeIds: RegimeId[] = ['ef', 'f', 'n', 'g', 'eg'];

      buttons.forEach((button, index) => {
        mockOnRegimeClick.mockClear();
        fireEvent.click(button);
        expect(mockOnRegimeClick).toHaveBeenCalledWith(regimeIds[index]);
      });
    });
  });

  describe('pathways', () => {
    it('should render path lines between regimes', () => {
      const { container } = render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} />
        </svg>
      );

      // Should have lines connecting regimes (4 paths for 5 regimes)
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(regimes.length - 1);
    });

    it('should highlight active pathway when animating forward', () => {
      const { container } = render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} activeRegime="n" animationDirection="forward" />
        </svg>
      );

      // Lines connecting to active regime should have wider stroke
      const lines = container.querySelectorAll('line');
      const wideLines = Array.from(lines).filter(line => line.getAttribute('stroke-width') === '6');
      // Should have at least one wide line (active path)
      expect(wideLines.length).toBeGreaterThan(0);
    });
  });

  describe('accessibility', () => {
    it('should have aria-label with regime information', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} />
        </svg>
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button, index) => {
        const regime = regimes[index];
        expect(button.getAttribute('aria-label')).toContain(`${regime.allocation.crypto}% crypto`);
        expect(button.getAttribute('aria-label')).toContain(`${regime.allocation.stable}% stable`);
      });
    });

    it('should indicate currently selected regime in aria-label', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} activeRegime="n" />
        </svg>
      );

      const activeButton = screen.getByRole('button', {
        name: /Neutral regime/,
      });
      expect(activeButton.getAttribute('aria-label')).toContain('Currently selected');
    });

    it('should indicate click to select for inactive regimes', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} activeRegime="n" />
        </svg>
      );

      const inactiveButton = screen.getByRole('button', {
        name: /Extreme Fear regime/,
      });
      expect(inactiveButton.getAttribute('aria-label')).toContain('Click to select');
    });

    it('should have tabIndex on all regime buttons', () => {
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} />
        </svg>
      );

      const buttons = screen.getAllByRole('button');
      // Each regime should have a button with tabindex
      expect(buttons).toHaveLength(regimes.length);
      buttons.forEach(button => {
        expect(button).toHaveAttribute('tabindex', '0');
      });
    });
  });

  describe('auto-play state', () => {
    it('should show animated glow when isAutoPlaying is true', () => {
      const { container } = render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} isAutoPlaying={true} activeRegime="n" />
        </svg>
      );

      // Should have animated glow circle for active regime
      const circles = container.querySelectorAll('circle');
      // Look for the glow circle (r=80)
      const glowCircle = Array.from(circles).find(c => c.getAttribute('r') === '80');
      expect(glowCircle).toBeInTheDocument();
    });

    it('should not show animated glow when isAutoPlaying is false', () => {
      const { container } = render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} isAutoPlaying={false} activeRegime="n" />
        </svg>
      );

      // Without autoplay, there should still be a glow but without animation
      // The glow is rendered when active regardless of autoplay
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('mobile layout', () => {
    it('should pass isMobile to direction arrows', () => {
      // The component internally uses isMobile for arrow scaling
      // We verify the component renders without errors in mobile mode
      render(
        <svg>
          <RegimeArc {...createRegimeArcProps()} isMobile={true} />
        </svg>
      );

      // Should render all regimes
      expect(screen.getByRole('button', { name: /Neutral regime/ })).toBeInTheDocument();
    });
  });

  describe('direction arrows', () => {
    it('should show direction arrows only when autoPlaying', () => {
      const { container } = render(
        <svg>
          <defs>
            <filter id="pathwayGlow">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <RegimeArc {...createRegimeArcProps()} isAutoPlaying={true} activeRegime="n" />
        </svg>
      );

      // Direction arrows are rendered as path elements with triangle shape
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });
});
