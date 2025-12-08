'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import type { AllocationPanelProps } from './types';
import { DirectionBadge } from './DirectionBadge';
import { ThreePartAllocationBar, AllocationTransition } from '@/components/ui/allocation';


export function AllocationPanel({
  activeRegimeData,
  panelPosition,
  lpAllocation,
  spotAllocation,
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
          className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 h-full flex flex-col"
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

          {/* Big Numbers */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold" style={{ color: activeRegimeData.fillColor }}>
                {activeRegimeData.allocation.crypto}%
              </span>
              <span className="text-gray-300">crypto</span>
              <span className="text-gray-600 mx-2">/</span>
              <span className="text-4xl font-bold" style={{ color: activeRegimeData.fillColor }}>
                {activeRegimeData.allocation.stable}%
              </span>
              <span className="text-gray-300">stable</span>
            </div>
            <p className="text-sm text-gray-500 italic">{activeRegimeData.author}</p>
          </div>

          {/* Philosophy */}
          <div className="mb-6">
            <p className="text-lg italic" style={{ color: activeRegimeData.fillColor }}>
              {activeRegimeData.philosophy}
            </p>
          </div>

          {/* Portfolio Breakdown */}
          <div className="space-y-4 mt-auto">
            <div className="text-sm text-gray-400 font-semibold">Current Allocation</div>
            <ThreePartAllocationBar
              allocation={{
                spot: spotAllocation,
                lp: lpAllocation,
                stable: activeRegimeData.allocation.stable,
              }}
              animated={true}
              size="md"
              showLabels={false}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </foreignObject>
  );
}
