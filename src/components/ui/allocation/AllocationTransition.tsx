import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Target State (Always Visible) */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">Target Allocation</span>
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
        <ThreePartAllocationBar allocation={after} animated={true} size={size} />
      </div>

      {/* Transition Details (Collapsible) */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-800/50 animate-in fade-in slide-in-from-top-2 duration-300">
          {showArrow && (
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Transitioning from
              </div>
              <div className="text-xl text-gray-600">↑</div>
            </div>
          )}

          <div>
            <div className="text-xs text-gray-500 mb-2">Starting Allocation</div>
            <ThreePartAllocationBar allocation={before} animated={false} size="md" />
          </div>

          <div className="text-center text-xs text-gray-500 pt-2">Execution: {timeframe}</div>
        </div>
      )}
    </div>
  );
}
