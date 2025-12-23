'use client';

import { motion } from 'framer-motion';
import type { AllocationBarProps } from './types';
import { TokenIcon, TokenPair } from '@/components/ui/TokenIcon';
import type { ReactNode } from 'react';

interface SegmentConfig {
  key: 'spot' | 'lp' | 'stable';
  value: number;
  gradient: string;
  color: string;
  tokenIcon: ReactNode;
  label: string;
  delay: number;
  tooltip?: string;
}

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

  // Use solid background colors instead of gradients for iOS Safari foreignObject compatibility
  const segments: SegmentConfig[] = [
    {
      key: 'spot',
      value: allocation.spot,
      gradient: 'bg-orange-500', // Solid color for iOS Safari compatibility
      color: 'orange',
      tokenIcon: <TokenPair tokens={['btc', 'eth']} size={heights[size].icon} overlap />,
      label: 'Spot',
      delay: 0,
    },
    {
      key: 'lp',
      value: allocation.lp,
      gradient: 'bg-purple-500', // Solid color for iOS Safari compatibility
      color: 'purple',
      tokenIcon: <TokenPair tokens={['btc', 'usdc']} size={heights[size].icon} overlap />,
      label: 'LP',
      delay: 0.1,
      tooltip: '(50% crypto + 50% stable)',
    },
    {
      key: 'stable',
      value: allocation.stable,
      gradient: 'bg-blue-500', // Solid color for iOS Safari compatibility
      color: 'blue',
      tokenIcon: <TokenIcon token="usdc" size={heights[size].icon} />,
      label: 'Stable',
      delay: 0.2,
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Horizontal 3-part bar */}
      <div className={`${sizeClasses[size]} bg-gray-800 rounded-lg overflow-hidden flex`}>
        {segments.map(segment => {
          // Skip LP if value is 0
          if (segment.key === 'lp' && segment.value === 0) return null;

          return (
            <Bar
              key={segment.key}
              className={`${segment.gradient} flex items-center justify-center text-white text-sm font-semibold relative group`}
              style={{ width: `${segment.value}%` }}
              {...(animated && {
                initial: { width: 0 },
                animate: { width: `${segment.value}%` },
                transition: { ...animationConfig, delay: segment.delay },
              })}
            >
              {showLabels && segment.value > 15 && (
                <span className="text-xs">{segment.value}%</span>
              )}
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                {segment.label}: {segment.value}%{segment.tooltip ? ` ${segment.tooltip}` : ''}
              </div>
            </Bar>
          );
        })}
      </div>

      {/* Legend with icons - compact layout for mobile */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs flex-wrap">
        {segments.map(segment => {
          if (segment.value === 0) return null;

          return (
            <div key={segment.key} className="flex items-center gap-1">
              {segment.tokenIcon}
              <span className="text-gray-400 hidden sm:inline">{segment.label}:</span>
              <span className={`text-${segment.color}-400 font-bold`}>{segment.value}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
