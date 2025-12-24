'use client';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { UseCaseAllocationPanel } from '../UseCaseAllocationPanel';
import type { UseCaseVariant } from '../types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      whileHover: _whileHover,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      whileHover?: object;
    }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('UseCaseAllocationPanel', () => {
  const mockOnTabChange = jest.fn();

  const variantWithChange: UseCaseVariant = {
    direction: 'from-left',
    tabLabel: 'Market Crash',
    title: 'Market Crash Scenario',
    scenario: 'During market downturn',
    userIntent: 'Protect capital',
    zapAction: 'Move to stables',
    allocationStartBreakdown: {
      stable: 30,
      spot: 50,
      lp: 20,
    },
    allocationEndBreakdown: {
      stable: 60,
      spot: 25,
      lp: 15,
    },
    protocols: {
      stable: ['Morpho'],
      lp: ['GMX (GM)'],
      strategyType: 'lending',
    },
  };

  const variantNoChange: UseCaseVariant = {
    direction: 'default',
    tabLabel: 'Stable Market',
    title: 'Stable Market Scenario',
    scenario: 'During stable conditions',
    userIntent: 'Maintain positions',
    zapAction: 'Hold current allocation',
    allocationStartBreakdown: {
      stable: 40,
      spot: 40,
      lp: 20,
    },
    allocationEndBreakdown: {
      stable: 40,
      spot: 40,
      lp: 20,
    },
    protocols: {
      stable: ['Aster ALP', 'Hyperliquid HLP'],
      lp: ['GMX (GM)'],
      strategyType: 'perps',
    },
  };

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('should render AllocationComparison when allocations differ', () => {
    render(
      <UseCaseAllocationPanel
        variants={[variantWithChange]}
        activeTab={0}
        onTabChange={mockOnTabChange}
        gradient="from-purple-500 to-blue-500"
      />
    );

    // Check that the component renders Portfolio Allocation
    expect(screen.getByText('Portfolio Allocation')).toBeInTheDocument();
  });

  it('should render MaintainingAllocation when allocations are the same', () => {
    render(
      <UseCaseAllocationPanel
        variants={[variantNoChange]}
        activeTab={0}
        onTabChange={mockOnTabChange}
        gradient="from-purple-500 to-blue-500"
      />
    );

    // MaintainingAllocation shows "Maintaining Current Allocation" text
    expect(screen.getByText(/maintaining|current/i)).toBeInTheDocument();
  });

  it('should not show tabs when only one variant', () => {
    render(
      <UseCaseAllocationPanel
        variants={[variantWithChange]}
        activeTab={0}
        onTabChange={mockOnTabChange}
        gradient="from-purple-500 to-blue-500"
      />
    );

    // Should not render tab buttons
    expect(
      screen.queryByRole('button', { name: variantWithChange.tabLabel })
    ).not.toBeInTheDocument();
  });

  it('should show tabs when multiple variants exist', () => {
    render(
      <UseCaseAllocationPanel
        variants={[variantWithChange, variantNoChange]}
        activeTab={0}
        onTabChange={mockOnTabChange}
        gradient="from-purple-500 to-blue-500"
      />
    );

    // Should render tab buttons
    expect(screen.getByRole('button', { name: variantWithChange.tabLabel })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: variantNoChange.tabLabel })).toBeInTheDocument();
  });

  it('should call onTabChange when tab is clicked', () => {
    render(
      <UseCaseAllocationPanel
        variants={[variantWithChange, variantNoChange]}
        activeTab={0}
        onTabChange={mockOnTabChange}
        gradient="from-purple-500 to-blue-500"
      />
    );

    const secondTab = screen.getByRole('button', { name: variantNoChange.tabLabel });
    fireEvent.click(secondTab);

    expect(mockOnTabChange).toHaveBeenCalledWith(1);
  });

  it('should apply active styles to selected tab', () => {
    render(
      <UseCaseAllocationPanel
        variants={[variantWithChange, variantNoChange]}
        activeTab={0}
        onTabChange={mockOnTabChange}
        gradient="from-purple-500 to-blue-500"
      />
    );

    const activeTab = screen.getByRole('button', { name: variantWithChange.tabLabel });
    expect(activeTab).toHaveClass('text-white');
  });
});
