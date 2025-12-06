'use client';

import { motion } from 'framer-motion';
import type { AllocationBarProps } from './types';
import { TokenIcon, TokenPair } from '@/components/ui/TokenIcon';

export function ThreePartAllocationBar({
  allocation,
  animated = true,
  size = 'md',
  showLabels = false,
  className = '',
}: AllocationBarProps) {
  const sizeClasses = {
    sm: 'h-3',
    md: 'h-6',
    lg: 'h-8',
  };

  const animationConfig = {
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  const heights = {
    sm: { bar: 12, icon: 16 },
    md: { bar: 24, icon: 20 },
    lg: { bar: 32, icon: 24 },
  };

  const Bar = animated ? motion.div : 'div';

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Horizontal 3-part bar */}
      <div className={`${sizeClasses[size]} bg-gray-800 rounded-lg overflow-hidden flex`}>
        {/* Spot Crypto */}
        <Bar
          className="bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center text-white text-sm font-semibold relative group"
          style={{ width: `${allocation.spot}%` }}
          {...(animated && {
            initial: { width: 0 },
            animate: { width: `${allocation.spot}%` },
            transition: { ...animationConfig, delay: 0 },
          })}
        >
          {showLabels && allocation.spot > 15 && (
            <span className="text-xs">{allocation.spot}%</span>
          )}
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap z-10">
            Spot: {allocation.spot}%
          </div>
        </Bar>

        {/* LP Position */}
        {allocation.lp > 0 && (
          <Bar
            className="bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center text-white text-sm font-semibold relative group"
            style={{ width: `${allocation.lp}%` }}
            {...(animated && {
              initial: { width: 0 },
              animate: { width: `${allocation.lp}%` },
              transition: { ...animationConfig, delay: 0.1 },
            })}
          >
            {showLabels && allocation.lp > 15 && <span className="text-xs">{allocation.lp}%</span>}
            {/* Tooltip with 50/50 hint */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap z-10">
              LP: {allocation.lp}% (50% crypto + 50% stable)
            </div>
          </Bar>
        )}

        {/* Stable */}
        <Bar
          className="bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white text-sm font-semibold relative group"
          style={{ width: `${allocation.stable}%` }}
          {...(animated && {
            initial: { width: 0 },
            animate: { width: `${allocation.stable}%` },
            transition: { ...animationConfig, delay: 0.2 },
          })}
        >
          {showLabels && allocation.stable > 15 && (
            <span className="text-xs">{allocation.stable}%</span>
          )}
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap z-10">
            Stable: {allocation.stable}%
          </div>
        </Bar>
      </div>

      {/* Legend with icons */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <TokenPair tokens={['btc', 'eth']} size={heights[size].icon} />
          <span className="text-gray-400">Spot:</span>
          <span className="text-orange-400 font-bold">{allocation.spot}%</span>
        </div>

        {allocation.lp > 0 && (
          <div className="flex items-center gap-1.5">
            <TokenPair tokens={['btc', 'usdc']} size={heights[size].icon} />
            <span className="text-gray-400">LP:</span>
            <span className="text-purple-400 font-bold">{allocation.lp}%</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <TokenIcon token="usdc" size={heights[size].icon} />
          <span className="text-gray-400">Stable:</span>
          <span className="text-blue-400 font-bold">{allocation.stable}%</span>
        </div>
      </div>
    </div>
  );
}
