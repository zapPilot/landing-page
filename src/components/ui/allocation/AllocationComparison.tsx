'use client';

import { ThreePartAllocationBar } from './ThreePartAllocationBar';
import type { AllocationComparisonProps } from './types';

export function AllocationComparison({
  before,
  after,
  timeframe = 'Over 5-10 days',
  gradient: _gradient,
}: AllocationComparisonProps) {
  return (
    <div className="space-y-6">
      {/* Before State */}
      <div>
        <div className="text-sm text-gray-400 mb-2">Before</div>
        <ThreePartAllocationBar allocation={before} animated={false} size="lg" />
      </div>

      {/* Arrow with timeframe */}
      <div className="text-center">
        <div className="text-2xl text-gray-500">↓</div>
        <div className="text-xs text-gray-400">{timeframe}</div>
      </div>

      {/* After State */}
      <div>
        <div className="text-sm text-gray-400 mb-2">After</div>
        <ThreePartAllocationBar allocation={after} animated={true} size="lg" />
      </div>

      {/* Execution Details */}
      <div className="pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-400">Daily Limit</div>
            <div className="text-sm text-white font-semibold">1-3%</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Duration</div>
            <div className="text-sm text-white font-semibold">{timeframe}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
