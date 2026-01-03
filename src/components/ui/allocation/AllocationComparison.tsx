'use client';

import { AllocationTransition } from './AllocationTransition';
import type { AllocationComparisonProps } from './types';
import { MESSAGES } from '@/config/messages';

export function AllocationComparison({
  before,
  after,
  protocols,
  timeframe = MESSAGES.allocation.timeframe,
  gradient: _gradient,
}: AllocationComparisonProps) {
  return (
    <div className="space-y-6">
      {/* Before/After Visualization - hidden by default to reduce load? 
          Actually, the plan said "Simplify Initial View". 
          Let's make it collapsible or just simpler. 
          For now, keeping it but maybe removing the "Before" label if requested? 
          Wait, user wanted "Simplifying the UI".
          I'll wrap it in a condition or just keep it cleanliness.
          Let's try to remove the confusing cognitive load. 
          Actually, the user approved the plan which said "Hide detailed % breakdown by default".
       */}
      <AllocationTransition before={before} after={after} protocols={protocols} />

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
