'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { regimes } from '../variation-claude/shared/regimeData';
import type { RegimeArcProps } from './types';

interface DirectionArrowProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  direction: 'forward' | 'backward';
  isActive: boolean;
  pathColor: string;
  isMobile: boolean;
}

function DirectionArrow({
  from,
  to,
  direction,
  isActive,
  pathColor,
  isMobile
}: DirectionArrowProps) {
  // Calculate midpoint
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  // Calculate angle for proper arrow rotation
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

  // Flip arrow 180° if going backward
  const finalAngle = direction === 'backward' ? angle + 180 : angle;

  // Responsive scaling
  const arrowScale = isMobile ? 0.7 : 1.0;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{
        opacity: isActive ? [0.4, 0.8, 0.4] : 0,
        x: isActive ? [0, 5, 0] : 0,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Triangle arrow */}
      <path
        d="M 0,-6 L 12,0 L 0,6 Z"
        fill={pathColor}
        transform={`translate(${midX}, ${midY}) rotate(${finalAngle}) scale(${arrowScale})`}
        filter="url(#pathwayGlow)"
      />
    </motion.g>
  );
}

export function RegimeArc({
  activeRegime,
  calculatePosition,
  isMobile,
  onRegimeClick,
  isAutoPlaying,
  animationDirection,
}: RegimeArcProps) {
  return (
    <g>
      {/* Pathways with direction arrows */}
      {regimes.map((regime, index) => {
        if (index === regimes.length - 1) return null;

        const from = calculatePosition(index);
        const to = calculatePosition(index + 1);
        const nextRegime = regimes[index + 1];

        // Check if this pathway is active in current direction
        const isActivePathForward =
          animationDirection === 'forward' &&
          (regime.id === activeRegime || nextRegime.id === activeRegime);

        const isActivePathBackward =
          animationDirection === 'backward' &&
          (regime.id === activeRegime || nextRegime.id === activeRegime);

        const isActivePath = isActivePathForward || isActivePathBackward;

        return (
          <g key={`path-${regime.id}-${nextRegime.id}`}>
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

            {/* Direction Arrow - only show when autoplaying */}
            <DirectionArrow
              from={from}
              to={to}
              direction={animationDirection}
              isActive={isActivePath && isAutoPlaying}
              pathColor={isActivePath ? regime.fillColor : '#4b5563'}
              isMobile={isMobile}
            />
          </g>
        );
      })}

      {/* Regime nodes */}
      {regimes.map((regime, index) => {
        const pos = calculatePosition(index);
        const isActive = regime.id === activeRegime;

        return (
          <g
            key={regime.id}
            onClick={() => onRegimeClick(regime.id)}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-label={`${regime.label} regime: ${regime.allocation.crypto}% crypto, ${regime.allocation.stable}% stable. ${isActive ? 'Currently selected' : 'Click to select'}`}
            tabIndex={0}
          >
            {/* Node glow background */}
            {isActive && (
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={80}
                fill={regime.fillColor}
                opacity={0.2}
                animate={{
                  scale: isAutoPlaying ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: isAutoPlaying ? Infinity : 0,
                }}
              />
            )}

            {/* Hover hitbox (invisible, larger for easier clicking) */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={70}
              fill="transparent"
              className="cursor-pointer"
            />

            {/* Node circle */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={isActive ? 65 : 45}
              fill={regime.fillColor}
              stroke="white"
              strokeWidth={isActive ? 6 : 4}
              className="cursor-pointer"
              initial={false}
              whileHover={{
                scale: isActive ? 1.05 : 1.15,
                strokeWidth: 6,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 0.2,
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
            {/* Allocation bar background - larger */}
            <rect x={pos.x - 40} y={pos.y + 80} width="80" height="14" rx="7" fill="#1e293b" stroke="#374151" strokeWidth="1" />

            {/* Crypto fill (left side - orange) */}
            <motion.rect
              x={pos.x - 39}
              y={pos.y + 81}
              height="12"
              rx="6"
              fill="url(#cryptoGradient)"
              animate={{ width: (regime.allocation.crypto / 100) * 78 }}
              transition={{ duration: 0.5 }}
            />

            {/* Stable fill (right side - blue) */}
            <motion.rect
              y={pos.y + 81}
              height="12"
              rx="6"
              fill="url(#stableGradient)"
              animate={{
                x: pos.x - 39 + (regime.allocation.crypto / 100) * 78,
                width: (regime.allocation.stable / 100) * 78
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Add percentage labels */}
            <text
              x={pos.x}
              y={pos.y + 110}
              textAnchor="middle"
              className="pointer-events-none select-none text-[10px] fill-slate-400"
            >
              {regime.allocation.crypto}% / {regime.allocation.stable}%
            </text>

            {/* Token icons */}
            <foreignObject x={pos.x - 40} y={pos.y + 115} width="80" height="20">
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
