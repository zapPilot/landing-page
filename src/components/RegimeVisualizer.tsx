'use client';

import { motion } from 'framer-motion';
import { type RegimeId, regimes, regimeOrder, getRegimeById } from './variation-claude/shared/regimeData';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';

interface RegimeVisualizerProps {
  autoPlayInterval?: number;
  startRegime?: RegimeId;
  showInteractivity?: boolean;
  className?: string;
}

export function RegimeVisualizer({
  autoPlayInterval = 5000,
  startRegime = 'n',
  showInteractivity = false,
  className = '',
}: RegimeVisualizerProps) {
  const [activeRegime, setActiveRegime] = useState<RegimeId>(startRegime);
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const activeRegimeData = getRegimeById(activeRegime);

  // Calculate LP allocation
  const isYielding = activeRegime === 'n';
  const lpAllocation = isYielding ? 30 : 10;
  const spotAllocation = activeRegimeData.allocation.crypto - lpAllocation;

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRegime(current => {
        const currentIdx = regimeOrder.indexOf(current);
        const nextIdx = (currentIdx + 1) % regimeOrder.length;
        return regimeOrder[nextIdx];
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval]);

  // Calculate positions in gentle 180° arc (centered for vertical layout)
  const calculatePosition = (index: number) => {
    const cx = 450; // Centered in 900px width
    const cy = 250; // Top portion of viewBox
    const radius = 180;
    const startAngle = 180; // Left side
    const angleStep = 180 / (regimes.length - 1);
    const angle = (startAngle - index * angleStep) * (Math.PI / 180);

    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // Get viewBox - always vertical for centered display
  const getViewBox = () => {
    return '0 0 900 1000';
  };

  // Get panel position - below arc for vertical layout
  const getPanelPosition = () => {
    return isMobile
      ? { x: 100, y: 540, width: 700, height: 360 }
      : { x: 150, y: 540, width: 600, height: 380 };
  };

  const panelPos = getPanelPosition();

  return (
    <div className={`w-full mx-auto max-w-7xl ${className}`}>
      <svg viewBox={getViewBox()} className="w-full h-auto">
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
          <filter id="pathwayGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

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
                strokeWidth={isActivePath ? 4 : 2}
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
                  r={50}
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
                r={isActive ? 40 : 30}
                fill={regime.fillColor}
                stroke="white"
                strokeWidth={isActive ? 4 : 3}
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
                y={pos.y - 60}
                textAnchor="middle"
                className="pointer-events-none select-none"
                style={{
                  fill: isActive ? regime.fillColor : '#d1d5db',
                  fontSize: isActive ? '16px' : '14px',
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {regime.label}
              </text>

              {/* Range */}
              <text
                x={pos.x}
                y={pos.y + 60}
                textAnchor="middle"
                className="pointer-events-none select-none"
                style={{
                  fill: '#6b7280',
                  fontSize: '12px',
                }}
              >
                {regime.range}
              </text>
            </g>
          );
        })}

        {/* Side Panel Layout */}
        <g>
          {/* Side panel background */}
          <rect
            x={panelPos.x}
            y={panelPos.y}
            width={panelPos.width}
            height={panelPos.height}
            rx="12"
            fill="#1e293b"
            stroke={activeRegimeData.fillColor}
            strokeWidth="2"
          />

          {/* Regime label */}
          <text
            x={panelPos.x + panelPos.width / 2}
            y={panelPos.y + 40}
            textAnchor="middle"
            style={{ fill: activeRegimeData.fillColor, fontSize: isMobile ? '16px' : '18px', fontWeight: 700 }}
          >
            {activeRegimeData.label}
          </text>
          <text
            x={panelPos.x + panelPos.width / 2}
            y={panelPos.y + 60}
            textAnchor="middle"
            style={{ fill: '#94a3b8', fontSize: isMobile ? '11px' : '12px' }}
          >
            {activeRegimeData.emotionalState}
          </text>

          {/* USDC Bar */}
          <g>
            <foreignObject
              x={panelPos.x + 20}
              y={panelPos.y + 80}
              width="30"
              height="30"
            >
              <Image src="/usdc.webp" alt="USDC" width={30} height={30} className="rounded-full" />
            </foreignObject>
            <text
              x={panelPos.x + 60}
              y={panelPos.y + 100}
              style={{ fill: '#e2e8f0', fontSize: isMobile ? '13px' : '14px', fontWeight: 600 }}
            >
              USDC
            </text>
            <rect
              x={panelPos.x + 20}
              y={panelPos.y + 110}
              width={panelPos.width - 40}
              height="12"
              rx="6"
              fill="#1f2937"
            />
            <motion.rect
              x={panelPos.x + 20}
              y={panelPos.y + 110}
              height="12"
              rx="6"
              fill="url(#stableGradient)"
              animate={{ width: (activeRegimeData.allocation.stable / 100) * (panelPos.width - 40) }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
            <text
              x={panelPos.x + panelPos.width - 20}
              y={panelPos.y + 122}
              textAnchor="end"
              style={{ fill: '#3B82F6', fontSize: isMobile ? '13px' : '14px', fontWeight: 700 }}
            >
              {activeRegimeData.allocation.stable}%
            </text>
          </g>

          {/* LP Bar */}
          <g>
            <foreignObject
              x={panelPos.x + 20}
              y={panelPos.y + 150}
              width="40"
              height="30"
            >
              <div className="flex -space-x-2">
                <Image src="/btc.webp" alt="BTC" width={18} height={18} className="rounded-full" />
                <Image src="/eth.webp" alt="ETH" width={18} height={18} className="rounded-full" />
              </div>
            </foreignObject>
            <text
              x={panelPos.x + 70}
              y={panelPos.y + 170}
              style={{ fill: '#e2e8f0', fontSize: isMobile ? '13px' : '14px', fontWeight: 600 }}
            >
              LP Positions
            </text>
            <rect
              x={panelPos.x + 20}
              y={panelPos.y + 180}
              width={panelPos.width - 40}
              height="12"
              rx="6"
              fill="#1f2937"
            />
            <motion.rect
              x={panelPos.x + 20}
              y={panelPos.y + 180}
              height="12"
              rx="6"
              fill="url(#lpGradient)"
              animate={{ width: (lpAllocation / 100) * (panelPos.width - 40) }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
            <text
              x={panelPos.x + panelPos.width - 20}
              y={panelPos.y + 192}
              textAnchor="end"
              style={{ fill: '#A855F7', fontSize: isMobile ? '13px' : '14px', fontWeight: 700 }}
            >
              {lpAllocation}%
            </text>
          </g>

          {/* Token Bar */}
          <g>
            <foreignObject
              x={panelPos.x + 20}
              y={panelPos.y + 220}
              width="40"
              height="30"
            >
              <div className="flex -space-x-2">
                <Image src="/btc.webp" alt="BTC" width={18} height={18} className="rounded-full" />
                <Image src="/eth.webp" alt="ETH" width={18} height={18} className="rounded-full" />
              </div>
            </foreignObject>
            <text
              x={panelPos.x + 70}
              y={panelPos.y + 240}
              style={{ fill: '#e2e8f0', fontSize: isMobile ? '13px' : '14px', fontWeight: 600 }}
            >
              Spot BTC/ETH
            </text>
            <rect
              x={panelPos.x + 20}
              y={panelPos.y + 250}
              width={panelPos.width - 40}
              height="12"
              rx="6"
              fill="#1f2937"
            />
            <motion.rect
              x={panelPos.x + 20}
              y={panelPos.y + 250}
              height="12"
              rx="6"
              fill="url(#cryptoGradient)"
              animate={{ width: (spotAllocation / 100) * (panelPos.width - 40) }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
            <text
              x={panelPos.x + panelPos.width - 20}
              y={panelPos.y + 262}
              textAnchor="end"
              style={{ fill: '#F97316', fontSize: isMobile ? '13px' : '14px', fontWeight: 700 }}
            >
              {spotAllocation}%
            </text>
          </g>

          {/* Actions section */}
          <text
            x={panelPos.x + panelPos.width / 2}
            y={panelPos.y + 310}
            textAnchor="middle"
            style={{ fill: '#64748b', fontSize: isMobile ? '10px' : '11px', fontWeight: 600, letterSpacing: '0.05em' }}
          >
            ACTIONS
          </text>
          <rect
            x={panelPos.x + 20}
            y={panelPos.y + 320}
            width={panelPos.width - 40}
            height="80"
            rx="6"
            fill="#0f172a"
          />
          {activeRegimeData.actions.slice(0, 2).map((action, idx) => (
            <text
              key={idx}
              x={panelPos.x + 30}
              y={panelPos.y + 340 + idx * 20}
              style={{ fill: '#94a3b8', fontSize: isMobile ? '9px' : '10px' }}
            >
              • {action.slice(0, isMobile ? 30 : 35)}{action.length > (isMobile ? 30 : 35) ? '...' : ''}
            </text>
          ))}

          {/* Philosophy */}
          <text
            x={panelPos.x + panelPos.width / 2}
            y={panelPos.y + (isMobile ? 430 : 430)}
            textAnchor="middle"
            style={{ fill: activeRegimeData.fillColor, fontSize: isMobile ? '10px' : '11px', fontStyle: 'italic' }}
          >
            {activeRegimeData.philosophy}
          </text>

          {/* Total allocation */}
          <text
            x={panelPos.x + panelPos.width / 2}
            y={panelPos.y + (isMobile ? 470 : 470)}
            textAnchor="middle"
            style={{ fill: '#e2e8f0', fontSize: isMobile ? '18px' : '20px', fontWeight: 700 }}
          >
            {activeRegimeData.allocation.crypto}% / {activeRegimeData.allocation.stable}%
          </text>
          <text
            x={panelPos.x + panelPos.width / 2}
            y={panelPos.y + (isMobile ? 490 : 490)}
            textAnchor="middle"
            style={{ fill: '#64748b', fontSize: isMobile ? '9px' : '10px' }}
          >
            Crypto / Stable
          </text>
        </g>
      </svg>
    </div>
  );
}
