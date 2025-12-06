'use client';

import { CheckCircle } from 'lucide-react';
import { ThreePartAllocationBar } from './ThreePartAllocationBar';
import type { NoChangeIndicatorProps } from './types';

export function NoChangeIndicator({
  allocation,
  message = 'Maintaining current allocation',
  gradient = 'from-purple-400 to-blue-400',
}: NoChangeIndicatorProps) {
  return (
    <div className="space-y-6">
      {/* Status Indicator */}
      <div
        className={`flex items-center justify-center gap-2 p-4 bg-gradient-to-r ${gradient} bg-opacity-10 border border-gray-700 rounded-lg`}
      >
        <CheckCircle className="w-5 h-5 text-green-400" />
        <span className="text-white font-semibold">{message}</span>
      </div>

      {/* Current Allocation */}
      <div>
        <div className="text-sm text-gray-400 mb-2 text-center">Current Allocation</div>
        <ThreePartAllocationBar allocation={allocation} animated={true} size="lg" />
      </div>

      {/* Info */}
      <div className="pt-4 border-t border-gray-700">
        <div className="text-center">
          <div className="text-xs text-gray-400">Strategy</div>
          <div className="text-sm text-white font-semibold">Holiday Mode — Zero Rebalancing</div>
        </div>
      </div>
    </div>
  );
}
