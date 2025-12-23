'use client';

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThreePartAllocationBar } from './ThreePartAllocationBar';
import type { AllocationBreakdown } from './types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock TokenIcon components with overlap prop support
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

describe('ThreePartAllocationBar', () => {
  const mockAllocation: AllocationBreakdown = {
    spot: 50,
    lp: 30,
    stable: 20,
  };

  describe('iOS Safari compatibility - solid background colors', () => {
    it('should use solid bg-orange-500 class for spot segment instead of gradient', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const spotBar = container.querySelector('.bg-orange-500');
      expect(spotBar).toBeInTheDocument();
      // Should NOT use gradient classes
      expect(container.querySelector('.from-orange-600')).not.toBeInTheDocument();
    });

    it('should use solid bg-purple-500 class for LP segment instead of gradient', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const lpBar = container.querySelector('.bg-purple-500');
      expect(lpBar).toBeInTheDocument();
      // Should NOT use gradient classes
      expect(container.querySelector('.from-purple-600')).not.toBeInTheDocument();
    });

    it('should use solid bg-blue-500 class for stable segment instead of gradient', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const stableBar = container.querySelector('.bg-blue-500');
      expect(stableBar).toBeInTheDocument();
      // Should NOT use gradient classes
      expect(container.querySelector('.from-blue-600')).not.toBeInTheDocument();
    });

    it('should NOT use bg-gradient-to-r class for bars', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      // The bg-gradient-to-r class was removed for iOS Safari compatibility
      expect(container.querySelector('.bg-gradient-to-r')).not.toBeInTheDocument();
    });
  });

  describe('mobile legend compactness', () => {
    it('should use gap-2 for mobile instead of gap-4', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const legend = container.querySelector('.gap-2');
      expect(legend).toBeInTheDocument();
    });

    it('should use sm:gap-4 for larger screens', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const legend = container.querySelector('.sm\\:gap-4');
      expect(legend).toBeInTheDocument();
    });

    it('should hide labels on mobile with hidden sm:inline classes', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      // Labels should have responsive hiding classes
      const labels = container.querySelectorAll('.hidden.sm\\:inline');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should use flex-wrap for very narrow screens', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const legend = container.querySelector('.flex-wrap');
      expect(legend).toBeInTheDocument();
    });

    it('should use gap-1 instead of gap-1.5 for legend items', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      // Legend items should use gap-1 for tighter spacing
      const legendItems = container.querySelectorAll('.gap-1');
      expect(legendItems.length).toBeGreaterThan(0);
    });
  });

  describe('overlapping token icons', () => {
    it('should pass overlap prop to TokenPair for spot segment', () => {
      render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const spotTokenPair = screen.getByTestId('token-pair-btc-eth');
      expect(spotTokenPair).toHaveAttribute('data-overlap', 'true');
    });

    it('should pass overlap prop to TokenPair for LP segment', () => {
      render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const lpTokenPair = screen.getByTestId('token-pair-btc-usdc');
      expect(lpTokenPair).toHaveAttribute('data-overlap', 'true');
    });
  });

  describe('bar segment widths', () => {
    it('should set correct width percentages for each segment', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      const spotBar = container.querySelector('.bg-orange-500') as HTMLElement;
      const lpBar = container.querySelector('.bg-purple-500') as HTMLElement;
      const stableBar = container.querySelector('.bg-blue-500') as HTMLElement;

      expect(spotBar.style.width).toBe('50%');
      expect(lpBar.style.width).toBe('30%');
      expect(stableBar.style.width).toBe('20%');
    });
  });

  describe('LP segment visibility', () => {
    it('should hide LP segment when value is 0', () => {
      const allocationNoLP: AllocationBreakdown = {
        spot: 70,
        lp: 0,
        stable: 30,
      };

      const { container } = render(<ThreePartAllocationBar allocation={allocationNoLP} />);

      // LP bar should not be rendered
      expect(container.querySelector('.bg-purple-500')).not.toBeInTheDocument();

      // LP token pair should not be in legend
      expect(screen.queryByTestId('token-pair-btc-usdc')).not.toBeInTheDocument();
    });

    it('should show LP segment when value is greater than 0', () => {
      render(<ThreePartAllocationBar allocation={mockAllocation} />);

      expect(screen.getByTestId('token-pair-btc-usdc')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('should apply h-3 class for sm size', () => {
      const { container } = render(
        <ThreePartAllocationBar allocation={mockAllocation} size="sm" />
      );

      expect(container.querySelector('.h-3.bg-gray-800')).toBeInTheDocument();
    });

    it('should apply h-6 class for md size', () => {
      const { container } = render(
        <ThreePartAllocationBar allocation={mockAllocation} size="md" />
      );

      expect(container.querySelector('.h-6.bg-gray-800')).toBeInTheDocument();
    });

    it('should apply h-8 class for lg size (default)', () => {
      const { container } = render(<ThreePartAllocationBar allocation={mockAllocation} />);

      expect(container.querySelector('.h-8')).not.toBeInTheDocument(); // lg is not default
    });
  });

  describe('percentage labels', () => {
    it('should render percentage values in legend', () => {
      render(<ThreePartAllocationBar allocation={mockAllocation} />);

      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('30%')).toBeInTheDocument();
      expect(screen.getByText('20%')).toBeInTheDocument();
    });
  });
});
