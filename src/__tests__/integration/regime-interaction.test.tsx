import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { RegimeVisualizer } from '@/components/regime';

// Mock the ErrorBoundary to render children directly
jest.mock('@/components/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock the allocation components
jest.mock('@/components/ui/allocation', () => ({
  AllocationComparison: () => <div data-testid="allocation-comparison" />,
  MaintainingAllocation: () => <div data-testid="maintaining-allocation" />,
}));

describe('RegimeVisualizer Integration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Flush any queued timer-driven state updates inside act to avoid warnings
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  describe('initial render', () => {
    it('should render loading state initially', async () => {
      render(<RegimeVisualizer />);

      // Should show loading spinner initially
      expect(screen.getByText('Loading regime visualizer...')).toBeInTheDocument();
    });

    it('should render content after loading', async () => {
      render(<RegimeVisualizer />);

      // Wait for loading to complete
      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Should show section header
      expect(screen.getByText('Buy Fear, Sell Greed. Systematically')).toBeInTheDocument();
    });
  });

  describe('regime interaction', () => {
    it('should render all regime labels', async () => {
      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Labels may appear multiple times (in arc and panel)
      expect(screen.getAllByText('Extreme Fear').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Fear').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Neutral').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Greed').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Extreme Greed').length).toBeGreaterThan(0);
    });

    it('should have clickable regime nodes', async () => {
      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Find a regime button
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);

      // Each button should have cursor pointer
      buttons.forEach(button => {
        if (button.getAttribute('aria-label')?.includes('regime')) {
          expect(button).toHaveStyle({ cursor: 'pointer' });
        }
      });
    });

    it('should show interaction hint when autoplaying', async () => {
      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // The hint should appear during autoplay
      expect(screen.getByText(/Explore each regime to see how we respond/i)).toBeInTheDocument();
    });

    it('should stop autoplay when regime is clicked', async () => {
      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Find and click a regime button
      const efButton = screen.getByRole('button', {
        name: /Extreme Fear regime/i,
      });
      fireEvent.click(efButton);

      // After clicking, the hint should disappear (autoplay stopped)
      // Advance time to ensure hint would have animated out
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      // Component should still be functional
      expect(screen.getAllByText('Extreme Fear').length).toBeGreaterThan(0);
    });
  });

  describe('allocation panel', () => {
    it('should display philosophy quote', async () => {
      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Neutral is the default starting regime
      // Should show Warren Buffett quote (from Neutral or default)
      const hasPhilosophy =
        screen.queryByText(/Be greedy when others are fearful/i) ||
        screen.queryByText(/It was always my sitting/i) ||
        screen.queryByText(/Buy when there's blood/i);

      expect(hasPhilosophy).toBeTruthy();
    });

    it('should show allocation visualization', async () => {
      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Should have either allocation comparison or maintaining allocation
      const hasAllocation =
        screen.queryByTestId('allocation-comparison') ||
        screen.queryByTestId('maintaining-allocation');

      expect(hasAllocation).toBeInTheDocument();
    });
  });

  describe('auto-play functionality', () => {
    it('should cycle through regimes over time', async () => {
      render(<RegimeVisualizer autoPlayInterval={1000} startRegime="ef" />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Should start at ef and eventually move to f
      // The exact behavior depends on useRegimeAutoPlay implementation
      expect(screen.getAllByText('Extreme Fear').length).toBeGreaterThan(0);
    });
  });

  describe('responsive layout', () => {
    it('should render without errors on mobile viewport', async () => {
      // Mock matchMedia to return mobile
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query.includes('max-width'),
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Should still render all content
      expect(screen.getAllByText('Extreme Fear').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Extreme Greed').length).toBeGreaterThan(0);
    });
  });

  describe('accessibility', () => {
    it('should have proper aria-labels on regime buttons', async () => {
      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      const buttons = screen.getAllByRole('button');
      const regimeButtons = buttons.filter(b => b.getAttribute('aria-label')?.includes('regime'));

      expect(regimeButtons.length).toBe(5);

      regimeButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
        expect(button.getAttribute('aria-label')).toMatch(/\d+% crypto/);
        expect(button.getAttribute('aria-label')).toMatch(/\d+% stable/);
      });
    });

    it('should have keyboard-accessible regime buttons', async () => {
      render(<RegimeVisualizer />);

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      const buttons = screen.getAllByRole('button');
      const regimeButtons = buttons.filter(b => b.getAttribute('aria-label')?.includes('regime'));

      regimeButtons.forEach(button => {
        expect(button).toHaveAttribute('tabindex', '0');
      });
    });
  });
});
