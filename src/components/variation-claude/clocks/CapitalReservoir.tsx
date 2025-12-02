'use client';

import { motion } from 'framer-motion';
import { type RegimeId, getRegimeById } from '../shared/regimeData';
import Image from 'next/image';

interface CapitalReservoirProps {
  activeRegime: RegimeId;
  isPaused: boolean;
}

export default function CapitalReservoir({
  activeRegime,
  isPaused,
}: CapitalReservoirProps) {
  const regime = getRegimeById(activeRegime);
  
  // Determine flow direction
  const isBuying = ['ef', 'f'].includes(activeRegime); // Stable → Crypto
  const isSelling = ['g', 'eg'].includes(activeRegime); // Crypto → Stable
  const isYielding = activeRegime === 'n'; // Token → LP
  
  // Calculate LP allocation (simplified: more in neutral, less otherwise)
  const lpAllocation = isYielding ? 30 : 10;
  const spotAllocation = regime.allocation.crypto - lpAllocation;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <svg viewBox="0 0 1000 400" className="w-full h-auto">
        <defs>
          {/* Gradients for liquid fills */}
          <linearGradient id="stableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="cryptoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="lpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9333EA" stopOpacity="0.9" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="1000" height="400" fill="#111827" rx="16" />

        {/* Connecting Pipes */}
        <g opacity="0.6">
          {/* Stable to Spot pipe */}
          <path
            d="M 800 200 Q 650 180 500 200"
            stroke="#4B5563"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Spot to LP pipe */}
          <path
            d="M 500 200 Q 350 220 200 200"
            stroke="#4B5563"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Animated Flow Particles */}
        {!isPaused && isBuying && (
          <motion.circle
            r="6"
            fill="#3B82F6"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              offsetDistance: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              offsetPath: "path('M 800 200 Q 650 180 500 200')",
            }}
          />
        )}
        
        {!isPaused && isSelling && (
          <motion.circle
            r="6"
            fill="#F97316"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              offsetDistance: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              offsetPath: "path('M 500 200 Q 650 180 800 200')",
            }}
          />
        )}
        
        {!isPaused && isYielding && (
          <motion.circle
            r="6"
            fill="#A855F7"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              offsetDistance: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              offsetPath: "path('M 500 200 Q 350 220 200 200')",
            }}
          />
        )}

        {/* LP Reservoir (Left) */}
        <g>
          {/* Container */}
          <rect
            x="120"
            y="120"
            width="160"
            height="240"
            rx="12"
            fill="#1F2937"
            stroke="#374151"
            strokeWidth="2"
          />
          
          {/* Liquid fill */}
          <motion.rect
            x="125"
            y="125"
            width="150"
            height="230"
            rx="8"
            fill="url(#lpGradient)"
            initial={{ scaleY: 0.1 }}
            animate={{ 
              scaleY: lpAllocation / 100,
            }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
          />
          
          {/* Icons */}
          <foreignObject x="170" y="280" width="60" height="30">
            <div className="flex -space-x-3 justify-center">
              <Image src="/btc.webp" alt="BTC" width={24} height={24} className="rounded-full" />
              <Image src="/eth.webp" alt="ETH" width={24} height={24} className="rounded-full" />
            </div>
          </foreignObject>
          
          {/* Label */}
          <text
            x="200"
            y="100"
            textAnchor="middle"
            style={{ fill: '#A855F7', fontSize: '16px', fontWeight: 700 }}
          >
            LP Positions
          </text>
          
          {/* Percentage */}
          <text
            x="200"
            y="340"
            textAnchor="middle"
            style={{ fill: '#A855F7', fontSize: '24px', fontWeight: 700 }}
          >
            {lpAllocation}%
          </text>
        </g>

        {/* Spot Token Reservoir (Center) */}
        <g>
          {/* Container */}
          <rect
            x="420"
            y="120"
            width="160"
            height="240"
            rx="12"
            fill="#1F2937"
            stroke="#374151"
            strokeWidth="2"
          />
          
          {/* Liquid fill */}
          <motion.rect
            x="425"
            y="125"
            width="150"
            height="230"
            rx="8"
            fill="url(#cryptoGradient)"
            initial={{ scaleY: 0.5 }}
            animate={{ 
              scaleY: spotAllocation / 100,
            }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
          />
          
          {/* Icons */}
          <foreignObject x="470" y="280" width="60" height="30">
            <div className="flex -space-x-3 justify-center">
              <Image src="/btc.webp" alt="BTC" width={24} height={24} className="rounded-full" />
              <Image src="/eth.webp" alt="ETH" width={24} height={24} className="rounded-full" />
            </div>
          </foreignObject>
          
          {/* Label */}
          <text
            x="500"
            y="100"
            textAnchor="middle"
            style={{ fill: '#F97316', fontSize: '16px', fontWeight: 700 }}
          >
            Spot Tokens
          </text>
          
          {/* Percentage */}
          <text
            x="500"
            y="340"
            textAnchor="middle"
            style={{ fill: '#F97316', fontSize: '24px', fontWeight: 700 }}
          >
            {spotAllocation}%
          </text>
        </g>

        {/* Stable Reservoir (Right) */}
        <g>
          {/* Container */}
          <rect
            x="720"
            y="120"
            width="160"
            height="240"
            rx="12"
            fill="#1F2937"
            stroke="#374151"
            strokeWidth="2"
          />
          
          {/* Liquid fill */}
          <motion.rect
            x="725"
            y="125"
            width="150"
            height="230"
            rx="8"
            fill="url(#stableGradient)"
            initial={{ scaleY: 0.5 }}
            animate={{ 
              scaleY: regime.allocation.stable / 100,
            }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
          />
          
          {/* Icon */}
          <foreignObject x="780" y="280" width="40" height="40">
            <Image src="/usdc.webp" alt="USDC" width={40} height={40} className="rounded-full" />
          </foreignObject>
          
          {/* Label */}
          <text
            x="800"
            y="100"
            textAnchor="middle"
            style={{ fill: '#3B82F6', fontSize: '16px', fontWeight: 700 }}
          >
            Stablecoins
          </text>
          
          {/* Percentage */}
          <text
            x="800"
            y="340"
            textAnchor="middle"
            style={{ fill: '#3B82F6', fontSize: '24px', fontWeight: 700 }}
          >
            {regime.allocation.stable}%
          </text>
        </g>

        {/* Central Regime Indicator */}
        <g>
          <motion.circle
            cx="500"
            cy="200"
            r="50"
            fill="#1F2937"
            stroke={regime.fillColor}
            strokeWidth="3"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <text
            x="500"
            y="205"
            textAnchor="middle"
            style={{ fill: regime.fillColor, fontSize: '14px', fontWeight: 700 }}
          >
            {regime.label}
          </text>
        </g>
      </svg>
    </div>
  );
}


