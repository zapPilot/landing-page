import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AllocationTransition } from './AllocationTransition';
import type { AllocationBreakdown } from './types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<unknown>) => <>{children}</>,
}));

// Mock TokenIcon components
jest.mock('@/components/ui/TokenIcon', () => ({
  TokenIcon: ({ token, size }: { token: string; size: number }) => (
    <span data-testid={`token-icon-${token}`} data-size={size}>
      {token}
    </span>
  ),
  TokenPair: ({ tokens, size }: { tokens: string[]; size: number }) => (
    <span data-testid={`token-pair-${tokens.join('-')}`} data-size={size}>
      {tokens.join('-')}
    </span>
  ),
}));

describe('AllocationTransition', () => {
  const mockBefore: AllocationBreakdown = {
    spot: 30,
    lp: 40,
    stable: 30,
  };

  const mockAfter: AllocationBreakdown = {
    spot: 50,
    lp: 30,
    stable: 20,
  };

  describe('Label rendering', () => {
    it('should NOT render "Before" text label', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // The text "Before" should NOT be rendered
      expect(screen.queryByText('Before')).not.toBeInTheDocument();
    });

    it('should NOT render "After" text label', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // The text "After" should NOT be rendered
      expect(screen.queryByText('After')).not.toBeInTheDocument();
    });

    it('should render allocation percentages from both before and after allocations', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // From before allocation (30, 40, 30)
      expect(screen.getAllByText(/30%/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/40%/).length).toBeGreaterThan(0);

      // From after allocation (50, 30, 20)
      expect(screen.getAllByText(/50%/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/20%/).length).toBeGreaterThan(0);
    });
  });

  describe('Arrow and timeframe rendering', () => {
    it('should render arrow by default', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      expect(screen.getByText('↓')).toBeInTheDocument();
    });

    it('should render default timeframe "Over 5-10 days"', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      expect(screen.getByText('Over 5-10 days')).toBeInTheDocument();
    });

    it('should render custom timeframe when provided', () => {
      render(
        <AllocationTransition before={mockBefore} after={mockAfter} timeframe="Over 2-3 weeks" />
      );

      expect(screen.getByText('Over 2-3 weeks')).toBeInTheDocument();
    });

    it('should hide arrow when showArrow is false', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} showArrow={false} />);

      expect(screen.queryByText('↓')).not.toBeInTheDocument();
      expect(screen.queryByText('Over 5-10 days')).not.toBeInTheDocument();
    });
  });

  describe('Non-scrollable content', () => {
    it('should not have overflow or scroll styles on the container', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      const rootDiv = container.firstChild as HTMLElement;

      // Verify the container uses space-y-4 (no scrolling behavior)
      expect(rootDiv).toHaveClass('space-y-4');

      // Ensure no overflow classes are applied
      expect(rootDiv.className).not.toContain('overflow');
      expect(rootDiv.className).not.toContain('scroll');
    });

    it('should render all allocation bars without scrolling', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Count the allocation bars (before and after)
      // Each ThreePartAllocationBar renders a div with class 'space-y-3'
      const allocationBars = container.querySelectorAll('.space-y-3');
      expect(allocationBars.length).toBe(2); // One for before, one for after
    });

    it('should render all allocation segments without truncation', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Each allocation bar should have its legend rendered
      // Check for "Spot", "LP", and "Stable" labels (rendered twice - once for each bar)
      const spotLabels = screen.getAllByText('Spot:');
      const lpLabels = screen.getAllByText('LP:');
      const stableLabels = screen.getAllByText('Stable:');

      expect(spotLabels.length).toBe(2); // Before and After
      expect(lpLabels.length).toBe(2); // Before and After
      expect(stableLabels.length).toBe(2); // Before and After
    });

    it('should not apply max-height constraints', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      const rootDiv = container.firstChild as HTMLElement;

      // Check that no max-height is applied via inline styles
      expect(rootDiv.style.maxHeight).toBeFalsy();

      // Check that no max-height classes are applied
      expect(rootDiv.className).not.toContain('max-h');
    });
  });

  describe('Size prop', () => {
    it('should default to "lg" size', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // ThreePartAllocationBar uses h-8 for lg size
      const bars = container.querySelectorAll('.h-8');
      expect(bars.length).toBe(2); // Before and After
    });

    it('should apply "sm" size when specified', () => {
      const { container } = render(
        <AllocationTransition before={mockBefore} after={mockAfter} size="sm" />
      );

      // ThreePartAllocationBar uses h-3 for sm size
      const bars = container.querySelectorAll('.h-3');
      expect(bars.length).toBe(2); // Before and After
    });

    it('should apply "md" size when specified', () => {
      const { container } = render(
        <AllocationTransition before={mockBefore} after={mockAfter} size="md" />
      );

      // ThreePartAllocationBar uses h-6 for md size
      const bars = container.querySelectorAll('.h-6');
      expect(bars.length).toBe(2); // Before and After
    });
  });

  describe('LP segment visibility', () => {
    it('should hide LP segment when value is 0', () => {
      const beforeNoLP: AllocationBreakdown = {
        spot: 70,
        lp: 0,
        stable: 30,
      };
      const afterNoLP: AllocationBreakdown = {
        spot: 50,
        lp: 0,
        stable: 50,
      };

      render(<AllocationTransition before={beforeNoLP} after={afterNoLP} />);

      // LP labels should not appear when value is 0
      expect(screen.queryByText('LP:')).not.toBeInTheDocument();
    });
  });
});
