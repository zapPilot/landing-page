import type { AllocationBreakdown } from '@/components/ui/allocation/types';

/**
 * Determines if two allocation breakdowns represent a change in portfolio composition.
 * Uses field-level comparison for better performance than JSON.stringify.
 *
 * @param before - Starting allocation breakdown
 * @param after - Ending allocation breakdown
 * @returns true if allocations differ, false if identical or either is undefined
 */
export function hasAllocationChange(
  before: AllocationBreakdown | undefined,
  after: AllocationBreakdown | undefined
): boolean {
  if (!before || !after) return false;

  return before.stable !== after.stable || before.spot !== after.spot || before.lp !== after.lp;
}
