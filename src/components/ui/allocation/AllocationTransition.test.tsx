import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
  TokenPair: ({ tokens, size, overlap }: { tokens: string[]; size: number; overlap?: boolean }) => (
    <span data-testid={`token-pair-${tokens.join('-')}`} data-size={size} data-overlap={overlap}>
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

  describe('Expand/Collapse behavior', () => {
    it('should show "Show Transition" button by default', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      expect(screen.getByText('Show Transition')).toBeInTheDocument();
    });

    it('should only show Target Allocation when collapsed', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Target Allocation should be visible
      expect(screen.getByText('Target Allocation')).toBeInTheDocument();

      // Starting Allocation should NOT be visible
      expect(screen.queryByText('Starting Allocation')).not.toBeInTheDocument();
    });

    it('should show Starting Allocation when expanded', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Click to expand
      fireEvent.click(screen.getByText('Show Transition'));

      // Starting Allocation should now be visible
      expect(screen.getByText('Starting Allocation')).toBeInTheDocument();
    });

    it('should show both allocations when expanded', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Click to expand
      fireEvent.click(screen.getByText('Show Transition'));

      // Both should be visible
      expect(screen.getByText('Starting Allocation')).toBeInTheDocument();
      expect(screen.getByText('Target Allocation')).toBeInTheDocument();
    });

    it('should display Starting Allocation above Target Allocation in DOM order', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Click to expand
      fireEvent.click(screen.getByText('Show Transition'));

      // Get the text content order - Starting should come before Target
      const textContent = container.textContent || '';
      const startingIndex = textContent.indexOf('Starting Allocation');
      const targetIndex = textContent.indexOf('Target Allocation');

      expect(startingIndex).toBeLessThan(targetIndex);
    });

    it('should toggle button text when clicked', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Initially shows "Show Transition"
      expect(screen.getByText('Show Transition')).toBeInTheDocument();

      // Click to expand
      fireEvent.click(screen.getByText('Show Transition'));

      // Now shows "Hide Transition"
      expect(screen.getByText('Hide Transition')).toBeInTheDocument();

      // Click to collapse
      fireEvent.click(screen.getByText('Hide Transition'));

      // Back to "Show Transition"
      expect(screen.getByText('Show Transition')).toBeInTheDocument();
    });

    it('should hide Starting Allocation when collapsed again', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand
      fireEvent.click(screen.getByText('Show Transition'));
      expect(screen.getByText('Starting Allocation')).toBeInTheDocument();

      // Collapse
      fireEvent.click(screen.getByText('Hide Transition'));
      expect(screen.queryByText('Starting Allocation')).not.toBeInTheDocument();
    });
  });

  describe('Label rendering', () => {
    it('should NOT render "Before" text label', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      // The text "Before" should NOT be rendered
      expect(screen.queryByText('Before')).not.toBeInTheDocument();
    });

    it('should NOT render "After" text label', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      // The text "After" should NOT be rendered
      expect(screen.queryByText('After')).not.toBeInTheDocument();
    });

    it('should render allocation percentages from both before and after allocations when expanded', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      // From before allocation (30, 40, 30)
      expect(screen.getAllByText(/30%/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/40%/).length).toBeGreaterThan(0);

      // From after allocation (50, 30, 20)
      expect(screen.getAllByText(/50%/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/20%/).length).toBeGreaterThan(0);
    });
  });

  describe('Arrow and timeframe rendering', () => {
    it('should render downward arrow when expanded', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Arrow should not be visible when collapsed
      expect(screen.queryByText('↓')).not.toBeInTheDocument();

      // Expand
      fireEvent.click(screen.getByText('Show Transition'));

      // Arrow should now be visible
      expect(screen.getByText('↓')).toBeInTheDocument();
    });

    it('should render "Transitioning to" text when expanded', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand
      fireEvent.click(screen.getByText('Show Transition'));

      expect(screen.getByText('Transitioning to')).toBeInTheDocument();
    });

    it('should render default timeframe when expanded', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Timeframe should not be visible when collapsed
      expect(screen.queryByText(/Execution:/)).not.toBeInTheDocument();

      // Expand
      fireEvent.click(screen.getByText('Show Transition'));

      expect(screen.getByText('Execution: Over 5-10 days')).toBeInTheDocument();
    });

    it('should hide arrow when showArrow is false', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} showArrow={false} />);

      // Expand
      fireEvent.click(screen.getByText('Show Transition'));

      expect(screen.queryByText('↓')).not.toBeInTheDocument();
      expect(screen.queryByText('Transitioning to')).not.toBeInTheDocument();
    });
  });

  describe('Non-scrollable content', () => {
    it('should not have overflow or scroll styles on the container', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      const rootDiv = container.firstChild as HTMLElement;

      // Verify the container uses space-y-4 (no scrolling behavior)
      expect(rootDiv).toHaveClass('space-y-4');

      // Ensure no overflow classes are applied
      expect(rootDiv.className).not.toContain('overflow');
      expect(rootDiv.className).not.toContain('scroll');
    });

    it('should render all allocation bars without scrolling when expanded', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      // Count the allocation bars (before and after)
      // Each ThreePartAllocationBar renders a div with class 'space-y-3'
      const allocationBars = container.querySelectorAll('.space-y-3');
      expect(allocationBars.length).toBe(2); // One for before, one for after
    });

    it('should render only one allocation bar when collapsed', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Only target allocation should be visible
      const allocationBars = container.querySelectorAll('.space-y-3');
      expect(allocationBars.length).toBe(1); // Only after/target
    });

    it('should render all allocation segments without truncation when expanded', () => {
      render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

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

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      const rootDiv = container.firstChild as HTMLElement;

      // Check that no max-height is applied via inline styles
      expect(rootDiv.style.maxHeight).toBeFalsy();

      // Check that no max-height classes are applied
      expect(rootDiv.className).not.toContain('max-h');
    });
  });

  describe('Size prop', () => {
    it('should default to "lg" size for target allocation', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // ThreePartAllocationBar uses h-8 for lg size (allocation bar has bg-gray-800)
      const bars = container.querySelectorAll('.h-8.bg-gray-800');
      expect(bars.length).toBe(1); // Only target allocation when collapsed
    });

    it('should use "md" size for starting allocation and "lg" for target when expanded', () => {
      const { container } = render(<AllocationTransition before={mockBefore} after={mockAfter} />);

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      // Starting allocation uses md (h-6), target uses lg (h-8)
      // Allocation bars have bg-gray-800 class
      const mdBars = container.querySelectorAll('.h-6.bg-gray-800');
      const lgBars = container.querySelectorAll('.h-8.bg-gray-800');
      expect(mdBars.length).toBe(1); // Starting allocation
      expect(lgBars.length).toBe(1); // Target allocation
    });

    it('should apply "sm" size when specified', () => {
      const { container } = render(
        <AllocationTransition before={mockBefore} after={mockAfter} size="sm" />
      );

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      // ThreePartAllocationBar uses h-3 for sm size (target), h-6 for md (starting)
      // Allocation bars have bg-gray-800 class
      const smBars = container.querySelectorAll('.h-3.bg-gray-800');
      const mdBars = container.querySelectorAll('.h-6.bg-gray-800');
      expect(smBars.length).toBe(1); // Target allocation with sm
      expect(mdBars.length).toBe(1); // Starting allocation always md
    });

    it('should apply "md" size when specified', () => {
      const { container } = render(
        <AllocationTransition before={mockBefore} after={mockAfter} size="md" />
      );

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      // Both use h-6 for md size (allocation bars have bg-gray-800)
      const mdBars = container.querySelectorAll('.h-6.bg-gray-800');
      expect(mdBars.length).toBe(2); // Both starting and target use md
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

      // Expand to show all content
      fireEvent.click(screen.getByText('Show Transition'));

      // LP labels should not appear when value is 0
      expect(screen.queryByText('LP:')).not.toBeInTheDocument();
    });
  });
});
