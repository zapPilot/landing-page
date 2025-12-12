'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { AllocationPanelProps } from './types';
import { DirectionBadge } from './DirectionBadge';
import { AllocationComparison, MaintainingAllocation } from '@/components/ui/allocation';

export function AllocationPanel({
  activeRegimeData,
  panelPosition,
  isMobile: _isMobile,
  animationDirection,
  activeStrategy,
  directionLabel,
  isAutoPlaying = false,
}: AllocationPanelProps) {
  const panelPos = panelPosition;

  return (
    <foreignObject x={panelPos.x} y={panelPos.y} width={panelPos.width} height={panelPos.height}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegimeData.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 h-full overflow-y-auto"
        >
          {/* Direction Badge */}
          {directionLabel && (
            <div className="mb-4">
              <DirectionBadge
                direction={animationDirection}
                label={directionLabel}
                regimeColor={activeRegimeData.fillColor}
                isAutoPlaying={isAutoPlaying}
              />
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: activeRegimeData.fillColor }}
            />
            <h3 className="text-2xl font-bold text-white">{activeRegimeData.label}</h3>
          </div>

          {/* Philosophy */}
          <div className="mb-6">
            <p className="text-lg italic" style={{ color: activeRegimeData.fillColor }}>
              {activeRegimeData.philosophy}
            </p>
            <p className="text-sm text-gray-400 mt-1">— {activeRegimeData.author}</p>
          </div>

          {/* Strategy Action */}
          <div>
            {activeStrategy.useCase &&
            JSON.stringify(activeStrategy.useCase.allocationBefore) !==
              JSON.stringify(activeStrategy.useCase.allocationAfter) ? (
              <AllocationComparison
                before={activeStrategy.useCase.allocationBefore}
                after={activeStrategy.useCase.allocationAfter}
                timeframe="Over 5-10 days"
                gradient="from-purple-400 to-blue-400"
              />
            ) : (
              <MaintainingAllocation />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </foreignObject>
  );
}
