'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import type { AllocationPanelProps } from './types';
import { DirectionBadge } from './DirectionBadge';
import { LPFlowVisualization } from './LPFlowVisualization';
import { ThreePartAllocationBar } from '@/components/ui/allocation';

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

          {/* Strategy Section */}
          <div className="mb-6 pb-6 border-b border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-sm font-semibold text-gray-400">Strategy:</h4>
              <span className="text-white font-bold">{activeStrategy.title}</span>
              {directionLabel && (
                <div className="group relative">
                  <Info className="w-4 h-4 text-gray-500 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 z-10">
                    Strategies change based on market direction. This shows the active approach.
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-4">{activeStrategy.description}</p>

            {/* LP Flow Visualization - Show all 3 variants for review */}
            {activeStrategy.lpTransformation && (
              <div className="space-y-6 mb-4">
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-semibold">Variant 1: Sankey Flow</p>
                  <LPFlowVisualization
                    assetFlow={activeStrategy.assetFlow}
                    transformation={activeStrategy.lpTransformation}
                    variant="sankey"
                    size="sm"
                    regimeColor={activeRegimeData.fillColor}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-semibold">
                    Variant 2: Before/After Bars
                  </p>
                  <LPFlowVisualization
                    assetFlow={activeStrategy.assetFlow}
                    transformation={activeStrategy.lpTransformation}
                    variant="bars"
                    size="sm"
                    regimeColor={activeRegimeData.fillColor}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-semibold">
                    Variant 3: Step-by-Step Icons
                  </p>
                  <LPFlowVisualization
                    assetFlow={activeStrategy.assetFlow}
                    transformation={activeStrategy.lpTransformation}
                    variant="icons"
                    size="sm"
                    regimeColor={activeRegimeData.fillColor}
                  />
                </div>
              </div>
            )}

            {/* Leverage Action */}
            {activeStrategy.leverageAction && (
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <Info className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-200">{activeStrategy.leverageAction}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 space-y-2">
              {activeStrategy.actions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span className="text-sm text-gray-300">{action}</span>
                </div>
              ))}
            </div>
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
