'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Coins } from 'lucide-react';
import type { AssetFlow } from '@/lib/regimeData';

interface LPFlowProps {
  assetFlow: AssetFlow;
  transformation?: {
    from: 'spot' | 'lp';
    to: 'spot' | 'lp';
    percentage: number;
    duration: string;
  };
  variant: 'sankey' | 'bars' | 'icons';
  size?: 'sm' | 'md' | 'lg';
  regimeColor?: string;
}

export function LPFlowVisualization({
  assetFlow,
  transformation,
  variant,
  size = 'md',
  regimeColor = '#8b5cf6',
}: LPFlowProps) {
  // Only show visualization for LP transformations
  if (!transformation || (assetFlow !== 'lp-to-spot' && assetFlow !== 'spot-to-lp')) {
    return null;
  }

  const isUnwinding = assetFlow === 'lp-to-spot';

  if (variant === 'sankey') {
    return (
      <SankeyFlow
        transformation={transformation}
        isUnwinding={isUnwinding}
        size={size}
        regimeColor={regimeColor}
      />
    );
  }

  if (variant === 'bars') {
    return (
      <BeforeAfterBars
        transformation={transformation}
        isUnwinding={isUnwinding}
        size={size}
        regimeColor={regimeColor}
      />
    );
  }

  return (
    <StepByStepIcons
      transformation={transformation}
      isUnwinding={isUnwinding}
      size={size}
      regimeColor={regimeColor}
    />
  );
}

// Variant 1: Sankey Flow Diagram
function SankeyFlow({
  transformation,
  isUnwinding,
  size,
  regimeColor,
}: {
  transformation: LPFlowProps['transformation'];
  isUnwinding: boolean;
  size: string;
  regimeColor: string;
}) {
  const height = size === 'sm' ? 120 : size === 'lg' ? 200 : 160;
  const width = size === 'sm' ? 300 : size === 'lg' ? 500 : 400;

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <svg width={width} height={height} className="mx-auto">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isUnwinding ? '#a855f7' : '#f97316'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isUnwinding ? '#f97316' : '#a855f7'} stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Source box */}
        <g>
          <rect
            x="20"
            y={height / 2 - 30}
            width="80"
            height="60"
            rx="8"
            fill="#1f2937"
            stroke="#374151"
            strokeWidth="2"
          />
          <text
            x="60"
            y={height / 2 - 5}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="12"
            fontWeight="600"
          >
            {isUnwinding ? 'LP' : 'Spot'}
          </text>
          <text
            x="60"
            y={height / 2 + 10}
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="14"
            fontWeight="700"
          >
            {transformation?.percentage}%
          </text>
        </g>

        {/* Flow path */}
        <motion.path
          d={`M 100 ${height / 2} Q ${width / 2} ${height / 2 - 20}, ${width - 100} ${height / 2}`}
          stroke="url(#flowGradient)"
          strokeWidth="40"
          fill="none"
          opacity="0.3"
          filter="url(#glow)"
        />

        {/* Animated particles */}
        {[0, 0.33, 0.66].map((offset, i) => (
          <motion.circle
            key={i}
            r="6"
            fill={regimeColor}
            filter="url(#glow)"
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: offset * 3,
            }}
            style={{
              offsetPath: `path("M 100 ${height / 2} Q ${width / 2} ${height / 2 - 20}, ${width - 100} ${height / 2}")`,
            }}
          />
        ))}

        {/* Destination box */}
        <g>
          <rect
            x={width - 100}
            y={height / 2 - 30}
            width="80"
            height="60"
            rx="8"
            fill="#1f2937"
            stroke="#374151"
            strokeWidth="2"
          />
          <text
            x={width - 60}
            y={height / 2 - 5}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="12"
            fontWeight="600"
          >
            {isUnwinding ? 'Spot' : 'LP'}
          </text>
          <text
            x={width - 60}
            y={height / 2 + 10}
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="14"
            fontWeight="700"
          >
            {transformation?.percentage}%
          </text>
        </g>

        {/* Duration label */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fill="#6b7280" fontSize="11">
          Over {transformation?.duration}
        </text>
      </svg>
    </div>
  );
}

// Variant 2: Before/After Bars
function BeforeAfterBars({
  transformation,
  isUnwinding,
  size,
  regimeColor,
}: {
  transformation: LPFlowProps['transformation'];
  isUnwinding: boolean;
  size: string;
  regimeColor: string;
}) {
  const spotColorStart = isUnwinding ? 40 : 45;
  const lpColorStart = isUnwinding ? 10 : 15;
  const spotColorEnd = isUnwinding ? 45 : 40;
  const lpColorEnd = isUnwinding ? 5 : 10;

  return (
    <div className={`space-y-4 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      {/* Before */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-gray-400 font-semibold">Before</span>
          <span className="text-gray-500 text-xs">{transformation?.duration}</span>
        </div>
        <div className="h-10 bg-gray-800 rounded-lg overflow-hidden flex">
          {/* Spot segment */}
          <motion.div
            className="bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center text-white font-semibold"
            style={{ width: `${spotColorStart}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${spotColorStart}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-xs">Spot {spotColorStart}%</span>
          </motion.div>
          {/* LP segment */}
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center text-white font-semibold border-l-2 border-gray-900"
            style={{ width: `${lpColorStart}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${lpColorStart}%` }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-xs">LP {lpColorStart}%</span>
          </motion.div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight className="w-5 h-5 rotate-90" style={{ color: regimeColor }} />
        </motion.div>
      </div>

      {/* After */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-gray-400 font-semibold">After</span>
          <span className="text-gray-500 text-xs">{transformation?.percentage}% shifted</span>
        </div>
        <div className="h-10 bg-gray-800 rounded-lg overflow-hidden flex">
          {/* Spot segment */}
          <motion.div
            className="bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center text-white font-semibold"
            style={{ width: `${spotColorEnd}%` }}
            initial={{ width: `${spotColorStart}%` }}
            animate={{ width: `${spotColorEnd}%` }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <span className="text-xs">Spot {spotColorEnd}%</span>
          </motion.div>
          {/* LP segment */}
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center text-white font-semibold border-l-2 border-gray-900"
            style={{ width: `${lpColorEnd}%` }}
            initial={{ width: `${lpColorStart}%` }}
            animate={{ width: `${lpColorEnd}%` }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <span className="text-xs">LP {lpColorEnd}%</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Variant 3: Step-by-Step Icons
function StepByStepIcons({
  transformation,
  isUnwinding,
  size,
  regimeColor,
}: {
  transformation: LPFlowProps['transformation'];
  isUnwinding: boolean;
  size: string;
  regimeColor: string;
}) {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;

  const steps = isUnwinding
    ? [
        { icon: 'lp', label: 'LP Tokens' },
        { icon: 'arrow', label: 'Unwind' },
        { icon: 'btc', label: 'BTC' },
        { icon: 'plus', label: '+' },
        { icon: 'eth', label: 'ETH' },
      ]
    : [
        { icon: 'btc', label: 'Spot BTC' },
        { icon: 'arrow', label: 'Sell some' },
        { icon: 'usdc', label: 'USDC' },
        { icon: 'arrow', label: 'Pair' },
        { icon: 'lp', label: 'LP Tokens' },
      ];

  return (
    <div className="py-4">
      <div className="flex items-center justify-center gap-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="flex flex-col items-center gap-1"
          >
            {step.icon === 'arrow' ? (
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.15,
                }}
              >
                <ArrowRight className="w-6 h-6" style={{ color: regimeColor }} />
              </motion.div>
            ) : step.icon === 'plus' ? (
              <div className="text-2xl font-bold text-gray-500">+</div>
            ) : step.icon === 'lp' ? (
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                  <Coins className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            ) : (
              <Image
                src={`/${step.icon}.webp`}
                alt={step.label}
                width={iconSize}
                height={iconSize}
                className="rounded-full"
              />
            )}
            <span
              className={`text-gray-400 font-medium ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}
            >
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-gray-500 text-xs mt-3">
        {transformation?.percentage}% over {transformation?.duration}
      </p>
    </div>
  );
}
