'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type RegimeId, regimes, regimeOrder, getRegimeById } from '../shared/regimeData';
import { getRegimePath, animatePathPreview, getPathDescription } from '../shared/pathPreview';
import { useState } from 'react';

interface SentimentClockPendulumProps {
  activeRegime: RegimeId;
  onRegimeChange: (regime: RegimeId) => void;
  isPaused: boolean;
}

export default function SentimentClockPendulum({
  activeRegime,
  onRegimeChange,
  isPaused,
}: SentimentClockPendulumProps) {
  const [previewPath, setPreviewPath] = useState<RegimeId[]>([]);
  const [isAnimatingPath, setIsAnimatingPath] = useState(false);

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
        return;
      }
      onRegimeChange(stepRegime);
    });

    setIsAnimatingPath(false);
    setPreviewPath([]);
  };

  // Calculate pendulum angle based on regime (EF=-72°, F=-36°, N=0°, G=36°, EG=72°)
  const activeIndex = regimeOrder.indexOf(activeRegime);
  const pendulumAngle = (activeIndex - 2) * 36; // Center at N (index 2)

  // Regime positions on circular rim (2, 4, 6, 8, 10 o'clock, with 12 empty)
  const regimePositions = [
    { angle: 225, regime: regimes[0] }, // EF at 8 o'clock
    { angle: 270, regime: regimes[1] }, // F at 9 o'clock
    { angle: 315, regime: regimes[2] }, // N at 10 o'clock
    { angle: 45, regime: regimes[3] },  // G at 2 o'clock
    { angle: 90, regime: regimes[4] },  // EG at 3 o'clock
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 600 600" className="w-full h-auto">
        <defs>
          {/* Gradient for pendulum */}
          <linearGradient id="pendulumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="pendulumGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shadow filter */}
          <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rim circle */}
        <circle
          cx="300"
          cy="300"
          r="250"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
          strokeDasharray="5 5"
        />

        {/* Regime segments on rim */}
        {regimePositions.map(({ angle, regime }) => {
          const radians = (angle - 90) * (Math.PI / 180);
          const x = 300 + 250 * Math.cos(radians);
          const y = 300 + 250 * Math.sin(radians);
          const isActive = regime.id === activeRegime;
          const isInPath = previewPath.includes(regime.id);

          return (
            <g key={regime.id}>
              {/* Arc segment background */}
              <motion.path
                d={`M 300 300 L ${300 + 230 * Math.cos((angle - 36 - 90) * Math.PI / 180)} ${300 + 230 * Math.sin((angle - 36 - 90) * Math.PI / 180)} A 230 230 0 0 1 ${300 + 230 * Math.cos((angle + 36 - 90) * Math.PI / 180)} ${300 + 230 * Math.sin((angle + 36 - 90) * Math.PI / 180)} Z`}
                fill={regime.fillColor}
                opacity={isActive ? 0.3 : 0.1}
                className="cursor-pointer"
                onClick={() => handleRegimeClick(regime.id)}
                whileHover={{ opacity: 0.4 }}
              />

              {/* Station marker */}
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 20 : 16}
                fill={regime.fillColor}
                stroke="white"
                strokeWidth={isActive ? 3 : 2}
                className="cursor-pointer"
                onClick={() => handleRegimeClick(regime.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isInPath ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  scale: { duration: 0.5, repeat: isInPath ? Infinity : 0 },
                }}
                filter={isActive ? 'url(#pendulumGlow)' : undefined}
              />

              {/* Label */}
              <text
                x={300 + 280 * Math.cos(radians)}
                y={300 + 280 * Math.sin(radians)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                style={{
                  fill: isActive ? regime.fillColor : '#9ca3af',
                  fontSize: isActive ? '14px' : '12px',
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {regime.label}
              </text>
            </g>
          );
        })}

        {/* Empty 12 o'clock barrier */}
        <g>
          <path
            d="M 300 50 L 285 80 L 315 80 Z"
            fill="#ef4444"
            opacity="0.5"
          />
          <text
            x="300"
            y="35"
            textAnchor="middle"
            className="select-none"
            style={{ fill: '#ef4444', fontSize: '11px', fontStyle: 'italic', fontWeight: 600 }}
          >
            NO DIRECT PATH
          </text>
        </g>

        {/* Pendulum pivot point */}
        <circle cx="300" cy="300" r="8" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />

        {/* Pendulum rod */}
        <motion.line
          x1="300"
          y1="300"
          x2="300"
          y2="100"
          stroke="url(#pendulumGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ rotate: pendulumAngle }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          style={{ originX: '300px', originY: '300px' }}
          filter="url(#shadow)"
        />

        {/* Pendulum weight */}
        <motion.g
          animate={{ rotate: pendulumAngle }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          style={{ originX: '300px', originY: '300px' }}
        >
          <circle
            cx="300"
            cy="100"
            r="24"
            fill={getRegimeById(activeRegime).fillColor}
            stroke="white"
            strokeWidth="3"
            filter="url(#pendulumGlow)"
          />
          <circle
            cx="300"
            cy="100"
            r="16"
            fill="rgba(255,255,255,0.2)"
          />
        </motion.g>

        {/* Idle sway animation when not transitioning */}
        {!isAnimatingPath && (
          <motion.g
            animate={{
              rotate: [pendulumAngle - 2, pendulumAngle + 2, pendulumAngle - 2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ originX: '300px', originY: '300px' }}
          >
            <line
              x1="300"
              y1="300"
              x2="300"
              y2="100"
              stroke="transparent"
              strokeWidth="6"
            />
          </motion.g>
        )}

        {/* Path preview arcs */}
        <AnimatePresence>
          {previewPath.length > 1 && (
            <>
              {previewPath.slice(0, -1).map((fromRegime, idx) => {
                const toRegime = previewPath[idx + 1];
                const fromPos = regimePositions.find(p => p.regime.id === fromRegime);
                const toPos = regimePositions.find(p => p.regime.id === toRegime);

                if (!fromPos || !toPos) return null;

                const startAngle = (fromPos.angle - 90) * Math.PI / 180;
                const endAngle = (toPos.angle - 90) * Math.PI / 180;
                const largeArc = Math.abs(toPos.angle - fromPos.angle) > 180 ? 1 : 0;
                const sweep = toPos.angle > fromPos.angle ? 1 : 0;

                return (
                  <motion.path
                    key={`${fromRegime}-${toRegime}`}
                    d={`M ${300 + 220 * Math.cos(startAngle)} ${300 + 220 * Math.sin(startAngle)} A 220 220 0 ${largeArc} ${sweep} ${300 + 220 * Math.cos(endAngle)} ${300 + 220 * Math.sin(endAngle)}`}
                    stroke="#3b82f6"
                    strokeWidth="4"
                    fill="none"
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

        {/* Description text */}
        <text
          x="300"
          y="570"
          textAnchor="middle"
          className="select-none"
          style={{ fill: '#6b7280', fontSize: '11px', fontStyle: 'italic' }}
        >
          {previewPath.length > 0
            ? `Path: ${getPathDescription(previewPath[0], previewPath[previewPath.length - 1])}`
            : 'Pendulum swings through intermediate regimes'}
        </text>
      </svg>
    </div>
  );
}
