// Re-export AllocationBreakdown from its canonical location
export type { AllocationBreakdown } from '@/components/ui/allocation/types';

// Re-export existing regime types from regimeData.ts
export type { RegimeId, RegimeStrategy, Regime } from '@/lib/regimeData';

/**
 * LP transformation direction indicator
 * - building: Increasing LP position (spot → LP)
 * - unwinding: Decreasing LP position (LP → spot)
 */
export type LpDirection = 'building' | 'unwinding';

/**
 * Utility functions for computed properties
 */

/** Calculate LP direction from before/after allocations */
export function calculateLpDirection(
  before: { spot: number; lp: number; stable: number },
  after: { spot: number; lp: number; stable: number }
): LpDirection | undefined {
  if (before.lp === after.lp) return undefined;
  return after.lp > before.lp ? 'building' : 'unwinding';
}

/** Get regime number for display (01-05) */
export function getRegimeNumber(id: string): string {
  const map: Record<string, string> = {
    ef: '01',
    f: '02',
    n: '03',
    g: '04',
    eg: '05',
  };
  return map[id] || '00';
}
