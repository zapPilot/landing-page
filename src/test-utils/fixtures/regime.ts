/**
 * Test fixtures and factories for regime-related components
 * Provides reusable mock data to reduce boilerplate in test files
 *
 * @example
 * import { createMockStrategy, createRegimeArcProps } from '@/test-utils';
 *
 * const strategy = createMockStrategy({
 *   title: 'Custom Strategy',
 *   useCase: { allocationAfter: { spot: 80, lp: 0, stable: 20 } }
 * });
 */

import { regimes, type Regime, type RegimeId, type RegimeStrategy } from '@/lib/regimeData';
import type { AllocationBreakdown } from '@/components/ui/allocation/types';

/**
 * Factory for creating mock regime strategies with allocation changes
 * @param overrides Partial strategy to override defaults
 * @returns Complete RegimeStrategy object suitable for testing
 *
 * @example
 * const strategy = createMockStrategy({
 *   title: 'Custom Accumulation',
 *   useCase: {
 *     allocationAfter: { spot: 80, lp: 0, stable: 20 }
 *   }
 * });
 */
export const createMockStrategy = (overrides?: Partial<RegimeStrategy>): RegimeStrategy => ({
  title: 'Mock Strategy',
  useCase: {
    scenario: 'Bitcoin drops 33% from recent highs.',
    userIntent: 'I want to DCA into BTC/ETH.',
    zapAction: 'Aggressively accumulates Bitcoin.',
    allocationBefore: { spot: 10, lp: 20, stable: 70 },
    allocationAfter: { spot: 70, lp: 0, stable: 30 },
    ...overrides?.useCase,
  },
  ...overrides,
});

/**
 * Factory for strategies without allocation changes (maintaining current position)
 * Useful for testing "Holiday Mode" or no-rebalancing scenarios
 *
 * @returns RegimeStrategy with identical before/after allocations
 *
 * @example
 * const maintaining = createMaintainingStrategy();
 * expect(maintaining.useCase?.allocationBefore).toEqual(maintaining.useCase?.allocationAfter);
 */
export const createMaintainingStrategy = (): RegimeStrategy => ({
  title: 'Holiday Mode',
  useCase: {
    scenario: 'FGI hovers between 46-54 for weeks.',
    userIntent: "I don't want to overtrade.",
    zapAction: 'Zero rebalancing.',
    allocationBefore: { spot: 50, lp: 20, stable: 30 },
    allocationAfter: { spot: 50, lp: 20, stable: 30 },
  },
});

/**
 * Get regime by ID with type safety
 * @param id The regime identifier
 * @returns The regime data
 * @throws Error if regime not found
 *
 * @example
 * const regime = getRegimeById('ef');
 * expect(regime.label).toBe('Extreme Fear');
 */
export const getRegimeById = (id: RegimeId): Regime => {
  const regime = regimes.find(r => r.id === id);
  if (!regime) throw new Error(`Regime ${id} not found`);
  return regime;
};

/**
 * Panel position type for AllocationPanel component
 */
export interface PanelPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Common test props for RegimeArc component
 * Reduces 10-20 lines of setup to 1 line in test files
 *
 * @param overrides Properties to override defaults
 * @returns Complete props object for RegimeArc
 *
 * @example
 * const props = createRegimeArcProps({ activeRegime: 'ef', isMobile: true });
 * render(<svg><RegimeArc {...props} /></svg>);
 */
export const createRegimeArcProps = (overrides: Partial<RegimeArcProps> = {}): RegimeArcProps => ({
  activeRegime: 'n' as RegimeId,
  calculatePosition: jest.fn((index: number) => ({
    x: 100 + index * 100,
    y: 200,
  })),
  isMobile: false,
  onRegimeClick: jest.fn(),
  isAutoPlaying: false,
  animationDirection: 'forward' as const,
  ...overrides,
});

/**
 * Props type for RegimeArc component (for type safety)
 */
export interface RegimeArcProps {
  activeRegime: RegimeId;
  calculatePosition: jest.Mock<{ x: number; y: number }, [number]>;
  isMobile: boolean;
  onRegimeClick: jest.Mock;
  isAutoPlaying: boolean;
  animationDirection: 'forward' | 'backward';
}

/**
 * Common test props for AllocationPanel component
 * Reduces 40+ lines of setup to 2-4 lines in test files
 *
 * @param overrides Properties to override defaults
 * @returns Complete props object for AllocationPanel
 *
 * @example
 * const props = createAllocationPanelProps({
 *   activeStrategy: createMaintainingStrategy(),
 *   isMobile: true
 * });
 * render(<svg><AllocationPanel {...props} /></svg>);
 */
export const createAllocationPanelProps = (
  overrides: Partial<AllocationPanelProps> = {}
): AllocationPanelProps => ({
  activeRegimeData: getRegimeById('ef'),
  panelPosition: { x: 100, y: 50, width: 400, height: 500 },
  isMobile: false,
  animationDirection: 'forward' as const,
  activeStrategy: createMockStrategy(),
  directionLabel: null,
  isAutoPlaying: false,
  ...overrides,
});

/**
 * Props type for AllocationPanel component (for type safety)
 */

/**
 * Props type for AllocationPanel component (for type safety)
 */
export interface AllocationPanelProps {
  activeRegimeData: Regime;
  panelPosition: PanelPosition;
  isMobile: boolean;
  animationDirection: 'forward' | 'backward';
  activeStrategy: RegimeStrategy;
  directionLabel: string | null;
  isAutoPlaying: boolean;
}
