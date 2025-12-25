'use client';

import { DirectionBadge } from './DirectionBadge';
import {
  AllocationComparison,
  MaintainingAllocation,
  type SubtitlePart,
} from '@/components/ui/allocation';
import type { AllocationBreakdown, ProtocolInfo } from '@/components/ui/allocation/types';

export interface SharedAllocationPanelProps {
  // Regime Identity
  regimeLabel: string;
  regimeColor: string;
  philosophy: string;
  author: string;

  // Strategy Details
  strategyTitle: string;
  strategySubtitle?: SubtitlePart[] | string;

  // Visual Context
  directionLabel?: string | null;
  animationDirection?: 'forward' | 'backward';
  isAutoPlaying?: boolean;

  // Allocation Data
  allocationBefore?: AllocationBreakdown;
  allocationAfter?: AllocationBreakdown;
  protocols: ProtocolInfo;

  // State
  isMaintaining: boolean;

  // Optional Overrides
  timeframe?: string;
  comparisonGradient?: string;
}

export function SharedAllocationPanel({
  regimeLabel,
  regimeColor,
  philosophy,
  author,
  strategyTitle,
  strategySubtitle,
  directionLabel,
  animationDirection = 'forward',
  isAutoPlaying = false,
  allocationBefore,
  allocationAfter,
  protocols,
  isMaintaining,
  timeframe,
  comparisonGradient,
}: SharedAllocationPanelProps) {
  return (
    <div className="bg-gray-900/95 border border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 overflow-y-auto h-full">
      {/* Direction Badge */}
      {directionLabel && (
        <div className="mb-4">
          <DirectionBadge
            direction={animationDirection}
            label={directionLabel}
            regimeColor={regimeColor}
            isAutoPlaying={isAutoPlaying}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: regimeColor }} />
        <h3 className="text-2xl font-bold text-white">{regimeLabel}</h3>
      </div>

      {/* Philosophy */}
      <div className="mb-6">
        <p className="text-lg italic" style={{ color: regimeColor }}>
          {philosophy}
        </p>
        <p className="text-sm text-gray-400 mt-1">— {author}</p>
      </div>

      {/* Strategy Action */}
      <div>
        {!isMaintaining && allocationBefore && allocationAfter ? (
          <AllocationComparison
            before={allocationBefore}
            after={allocationAfter}
            protocols={protocols}
            timeframe={timeframe ?? 'Over 5-10 days'}
            gradient={comparisonGradient ?? 'from-purple-400 to-blue-400'}
          />
        ) : (
          <MaintainingAllocation message={strategyTitle} subtitle={strategySubtitle} />
        )}
      </div>
    </div>
  );
}
