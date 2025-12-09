'use client';

import { ThreePartAllocationBar } from './ThreePartAllocationBar';
import type { AllocationBreakdown } from './types';

interface AllocationTransitionProps {
  before: AllocationBreakdown;
  after: AllocationBreakdown;
  timeframe?: string;
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
}

export function AllocationTransition({
  before,
  after,
  timeframe = 'Over 5-10 days',
  size = 'lg',
  showArrow = true,
}: AllocationTransitionProps) {
  return (
    <div className="space-y-4">
      {/* Before State */}
      <ThreePartAllocationBar allocation={before} animated={false} size={size} />

      {/* Arrow with timeframe */}
      {showArrow && (
        <div className="text-center">
          <div className="text-2xl text-gray-500">↓</div>
          <div className="text-xs text-gray-400">{timeframe}</div>
        </div>
      )}

      {/* After State */}
      <ThreePartAllocationBar allocation={after} animated={true} size={size} />
    </div>
  );
}
