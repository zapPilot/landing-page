'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type RegimeId, regimes, regimeOrder, getRegimeById } from '../shared/regimeData';
import { getRegimePath, animatePathPreview, getPathDescription } from '../shared/pathPreview';
import { useState } from 'react';

interface SentimentClockRibbonProps {
  activeRegime: RegimeId;
  onRegimeChange: (regime: RegimeId) => void;
  isPaused: boolean;
}

export default function SentimentClockRibbon({
  activeRegime,
  onRegimeChange,
  isPaused,
}: SentimentClockRibbonProps) {
  const [previewPath, setPreviewPath] = useState<RegimeId[]>([]);
  const [isAnimatingPath, setIsAnimatingPath] = useState(false);

  const activeIndex = regimeOrder.indexOf(activeRegime);
  const indicatorX = (activeIndex / (regimeOrder.length - 1)) * 100;

  const handleRegimeClick = async (regime: RegimeId) => {
    if (isAnimatingPath) return;

    const fromIdx = regimeOrder.indexOf(activeRegime);
    const toIdx = regimeOrder.indexOf(regime);

    // Direct transition if adjacent or same
    if (Math.abs(toIdx - fromIdx) <= 1) {
      onRegimeChange(regime);
      setPreviewPath([]);
      return;
    }

    // Show path preview for non-adjacent
    const path = getRegimePath(activeRegime, regime);
    setPreviewPath(path);
    setIsAnimatingPath(true);

    await animatePathPreview(path, (stepRegime, index) => {
      if (index < path.length - 1) {
        // Intermediate steps - just highlight
        return;
      }
      // Final step - actually change regime
      onRegimeChange(stepRegime);
    });

    setIsAnimatingPath(false);
    setPreviewPath([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg viewBox="0 0 800 300" className="w-full h-auto">
        <defs>
          {/* Gradient for ribbon */}
          <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="25%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Shimmer effect */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            <animate
              attributeName="x1"
              values="-100%;100%"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="0%;200%"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background ribbon */}
        <rect
          x="50"
          y="120"
          width="700"
          height="60"
          rx="30"
          fill="url(#sentimentGradient)"
          opacity="0.3"
        />

        {/* Shimmer overlay when not paused */}
        {!isPaused && (
          <rect
            x="50"
            y="120"
            width="700"
            height="60"
            rx="30"
            fill="url(#shimmer)"
            opacity="0.5"
          />
        )}

        {/* Active ribbon segment */}
        <motion.rect
          x="50"
          y="120"
          width="700"
          height="60"
          rx="30"
          fill="url(#sentimentGradient)"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isPaused ? 0.6 : [0.6, 0.8, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Regime stations */}
        {regimes.map((regime, index) => {
          const x = 50 + (index / (regimes.length - 1)) * 700;
          const isActive = regime.id === activeRegime;
          const isInPath = previewPath.includes(regime.id);

          return (
            <g key={regime.id}>
              {/* Station marker */}
              <motion.circle
                cx={x}
                cy={150}
                r={isActive ? 16 : 12}
                fill={regime.fillColor}
                stroke="white"
                strokeWidth={isActive ? 3 : 2}
                className="cursor-pointer"
                onClick={() => handleRegimeClick(regime.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: isInPath ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  scale: { duration: 0.5, repeat: isInPath ? Infinity : 0 },
                }}
                filter={isActive ? 'url(#glow)' : undefined}
              />

              {/* Label above */}
              <text
                x={x}
                y={95}
                textAnchor="middle"
                className="pointer-events-none select-none"
                style={{
                  fill: isActive ? regime.fillColor : '#9ca3af',
                  fontSize: isActive ? '16px' : '14px',
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {regime.label}
              </text>

              {/* Range below */}
              <text
                x={x}
                y={210}
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

        {/* Vertical indicator line */}
        <motion.line
          x1={50 + (indicatorX / 100) * 700}
          y1={100}
          x2={50 + (indicatorX / 100) * 700}
          y2={200}
          stroke={getRegimeById(activeRegime).fillColor}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          filter="url(#glow)"
        />

        {/* Path preview connections */}
        <AnimatePresence>
          {previewPath.length > 1 && (
            <>
              {previewPath.slice(0, -1).map((fromRegime, idx) => {
                const toRegime = previewPath[idx + 1];
                const fromIdx = regimeOrder.indexOf(fromRegime);
                const toIdx = regimeOrder.indexOf(toRegime);
                const x1 = 50 + (fromIdx / (regimes.length - 1)) * 700;
                const x2 = 50 + (toIdx / (regimes.length - 1)) * 700;

                return (
                  <motion.line
                    key={`${fromRegime}-${toRegime}`}
                    x1={x1}
                    y1={150}
                    x2={x2}
                    y2={150}
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeDasharray="5 5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.8, pathLength: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.3 }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Curved endpoints to show no wrap-around */}
        <path
          d="M 50 150 Q 30 150 30 130 L 30 170 Q 30 150 50 150"
          fill="#374151"
          opacity="0.5"
        />
        <path
          d="M 750 150 Q 770 150 770 130 L 770 170 Q 770 150 750 150"
          fill="#374151"
          opacity="0.5"
        />

        {/* "No wrap" indicator */}
        <text
          x="400"
          y="260"
          textAnchor="middle"
          className="select-none"
          style={{ fill: '#6b7280', fontSize: '11px', fontStyle: 'italic' }}
        >
          {previewPath.length > 0
            ? `Path: ${getPathDescription(previewPath[0], previewPath[previewPath.length - 1])}`
            : 'Sequential flow only • No shortcuts'}
        </text>
      </svg>
    </div>
  );
}
