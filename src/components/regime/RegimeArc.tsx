'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { regimes } from '../variation-claude/shared/regimeData';
import type { RegimeArcProps } from './types';

export function RegimeArc({
  activeRegime,
  calculatePosition,
  isMobile,
}: RegimeArcProps) {
  return (
    <g transform="translate(0, -50)">
      {/* Pathways between nodes */}
      {regimes.map((regime, index) => {
        if (index === regimes.length - 1) return null;

        const from = calculatePosition(index);
        const to = calculatePosition(index + 1);
        const isActivePath =
          regime.id === activeRegime || regimes[index + 1].id === activeRegime;

        return (
          <g key={`path-${regime.id}-${regimes[index + 1].id}`}>
            {/* Path line */}
            <motion.line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#4b5563"
              strokeWidth={isActivePath ? 6 : 3}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: isActivePath ? 0.6 : 0.3,
              }}
            />
          </g>
        );
      })}

      {/* Regime nodes */}
      {regimes.map((regime, index) => {
        const pos = calculatePosition(index);
        const isActive = regime.id === activeRegime;

        return (
          <g key={regime.id}>
            {/* Node glow background */}
            {isActive && (
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={80}
                fill={regime.fillColor}
                opacity={0.2}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}

            {/* Node circle */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={isActive ? 65 : 45}
              fill={regime.fillColor}
              stroke="white"
              strokeWidth={isActive ? 6 : 4}
              animate={{
                scale: isActive ? 1 : 1,
              }}
              transition={{
                duration: 0.5,
              }}
              filter={isActive ? 'url(#pathwayGlow)' : undefined}
            />

            {/* Label */}
            <text
              x={pos.x}
              y={pos.y - 80}
              textAnchor="middle"
              className="pointer-events-none select-none"
              style={{
                fill: isActive ? regime.fillColor : '#d1d5db',
                fontSize: isActive ? '18px' : '16px',
                fontWeight: isActive ? 700 : 600,
              }}
            >
              {regime.label}
            </text>
          </g>
        );
      })}

      {/* Allocation bars below each node */}
      {regimes.map((regime, index) => {
        const pos = calculatePosition(index);
        
        return (
          <g key={`allocation-${regime.id}`}>
            {/* Allocation bar background */}
            <rect x={pos.x - 30} y={pos.y + 75} width="60" height="10" rx="5" fill="#1e293b" stroke="#374151" strokeWidth="1" />
            
            {/* Crypto fill (left side - orange) */}
            <motion.rect
              x={pos.x - 29}
              y={pos.y + 76}
              height="8"
              rx="4"
              fill="url(#cryptoGradient)"
              animate={{ width: (regime.allocation.crypto / 100) * 58 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Stable fill (right side - blue) */}
            <motion.rect
              y={pos.y + 76}
              height="8"
              rx="4"
              fill="url(#stableGradient)"
              animate={{ 
                x: pos.x - 29 + (regime.allocation.crypto / 100) * 58,
                width: (regime.allocation.stable / 100) * 58 
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Token icons */}
            <foreignObject x={pos.x - 30} y={pos.y + 105} width="60" height="20">
              <div className="flex justify-center gap-0.5">
                <Image src="/btc.webp" alt="BTC" width={12} height={12} className="rounded-full opacity-60" />
                <Image src="/eth.webp" alt="ETH" width={12} height={12} className="rounded-full opacity-60" />
                <span className="text-[8px] text-slate-500 mx-1">/</span>
                <Image src="/usdc.webp" alt="USDC" width={12} height={12} className="rounded-full opacity-60" />
              </div>
            </foreignObject>
          </g>
        );
      })}
    </g>
  );
}
