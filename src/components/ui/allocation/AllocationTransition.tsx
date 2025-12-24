import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ThreePartAllocationBar } from './ThreePartAllocationBar';
import type { AllocationBreakdown, ProtocolInfo } from './types';

interface AllocationTransitionProps {
  before: AllocationBreakdown;
  after: AllocationBreakdown;
  protocols?: ProtocolInfo;
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
}

export function AllocationTransition({
  before,
  after,
  protocols,
  size = 'lg',
  showArrow = true,
}: AllocationTransitionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-xs text-purple-400 hover:text-purple-300 transition-colors"
        >
          {isExpanded ? 'Hide Transition' : 'Show Transition'}
          {isExpanded ? (
            <ChevronUp className="w-3 h-3 ml-1" />
          ) : (
            <ChevronDown className="w-3 h-3 ml-1" />
          )}
        </button>
      </div>

      {/* Transition View (when expanded) */}
      {isExpanded ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Starting Allocation (top) */}
          <div>
            <div className="text-xs text-gray-500 mb-2">Starting Allocation</div>
            <ThreePartAllocationBar
              allocation={before}
              protocols={protocols}
              animated={false}
              size="md"
            />
          </div>

          {/* Arrow and timeframe */}
          {showArrow && (
            <div className="text-center">
              <div className="text-xl text-gray-600">↓</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                Transitioning to
              </div>
            </div>
          )}

          {/* Target Allocation (bottom) */}
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">Target Allocation</div>
            <ThreePartAllocationBar
              allocation={after}
              protocols={protocols}
              animated={true}
              size={size}
            />
          </div>

          <div className="text-center text-xs text-gray-500 pt-2">Execution: Over 5-10 days</div>
        </div>
      ) : (
        /* Collapsed View - Only Target Allocation */
        <div>
          <div className="text-sm font-medium text-gray-300 mb-2">Target Allocation</div>
          <ThreePartAllocationBar
            allocation={after}
            protocols={protocols}
            animated={true}
            size={size}
          />
        </div>
      )}
    </div>
  );
}
