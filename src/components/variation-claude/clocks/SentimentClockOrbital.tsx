'use client';

import { motion } from 'framer-motion';
import { type RegimeId, regimes, getRegimeById } from '../shared/regimeData';
import { useMemo } from 'react';

interface Props {
  activeRegime: RegimeId;
  onRegimeClick: (regimeId: RegimeId) => void;
  onInteraction: () => void;
}

// Station positions on outer circle (degrees)
const STATION_ANGLES = {
  ef: 315, // top left
  eg: 45,  // top right
  g: 135,  // right
  n: 270,  // bottom
  f: 225,  // left
};

// Ring positions (inner orbital path)
const RING_ANGLES = {
  ef: 330, // slightly offset from station
  eg: 30,
  g: 120,
  n: 270,
  f: 240,
};

const GAP_START = 350; // Gap starts here
const GAP_END = 10;    // Gap ends here
const CENTER = 300;
const OUTER_RADIUS = 240;
const RING_RADIUS = 180;

// Convert polar to cartesian
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// Create arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export default function SentimentClockOrbital({ activeRegime, onRegimeClick, onInteraction }: Props) {
  const activeRegimeData = getRegimeById(activeRegime);

  // Calculate marker position on ring
  const markerAngle = RING_ANGLES[activeRegime];
  const markerPos = polarToCartesian(CENTER, CENTER, RING_RADIUS, markerAngle);

  // Ring path (with gap at top)
  const ringPath = useMemo(() => {
    // Arc from gap end (10°) to gap start (350°) going clockwise
    return describeArc(CENTER, CENTER, RING_RADIUS, GAP_END, GAP_START);
  }, []);

  // Gap indicator positions
  const gapStartPos = polarToCartesian(CENTER, CENTER, RING_RADIUS, GAP_START);
  const gapEndPos = polarToCartesian(CENTER, CENTER, RING_RADIUS, GAP_END);

  const handleStationClick = (regimeId: RegimeId) => {
    onRegimeClick(regimeId);
    onInteraction();
  };

  return (
    <svg viewBox="0 0 600 600" className="w-full h-full">
      <defs>
        {/* Ring gradient */}
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="25%" stopColor="#f97316" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#eab308" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#84cc16" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.6" />
        </linearGradient>

        {/* Glow filters */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="strong-glow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx={CENTER} cy={CENTER} r={RING_RADIUS - 20} fill="none" stroke="#1f2937" strokeWidth="1" opacity="0.3" />

      {/* Main orbital ring with gap */}
      <motion.path
        d={ringPath}
        fill="none"
        stroke="url(#ring-gradient)"
        strokeWidth="3"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Gap indicator - dashed line */}
      <line
        x1={gapStartPos.x}
        y1={gapStartPos.y}
        x2={gapEndPos.x}
        y2={gapEndPos.y}
        stroke="#374151"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.4"
      />

      {/* Gap label */}
      <text
        x={CENTER}
        y={CENTER - RING_RADIUS - 20}
        textAnchor="middle"
        className="fill-gray-500 text-xs font-mono"
      >
        NO DIRECT PATH
      </text>

      {/* Gap end points */}
      <circle cx={gapStartPos.x} cy={gapStartPos.y} r="4" fill="#374151" opacity="0.6" />
      <circle cx={gapEndPos.x} cy={gapEndPos.y} r="4" fill="#374151" opacity="0.6" />

      {/* Current position marker on ring */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer pulse */}
        <motion.circle
          cx={markerPos.x}
          cy={markerPos.y}
          r="12"
          fill={activeRegimeData.fillColor}
          opacity="0.3"
          animate={{
            r: [12, 18, 12],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main marker */}
        <motion.circle
          cx={markerPos.x}
          cy={markerPos.y}
          r="8"
          fill={activeRegimeData.fillColor}
          filter="url(#strong-glow)"
          layoutId="marker"
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />

        {/* Inner core */}
        <circle cx={markerPos.x} cy={markerPos.y} r="4" fill="white" opacity="0.9" />
      </motion.g>

      {/* Regime stations (outer circle) */}
      {regimes.map((regime) => {
        const angle = STATION_ANGLES[regime.id];
        const pos = polarToCartesian(CENTER, CENTER, OUTER_RADIUS, angle);
        const isActive = regime.id === activeRegime;

        return (
          <g key={regime.id}>
            {/* Station glow */}
            {isActive && (
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="32"
                fill={regime.fillColor}
                opacity="0.2"
                animate={{
                  r: [32, 38, 32],
                  opacity: [0.2, 0.1, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Station circle */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r="24"
              fill={isActive ? regime.fillColor : 'none'}
              stroke={regime.fillColor}
              strokeWidth={isActive ? '3' : '2'}
              opacity={isActive ? 1 : 0.6}
              className="cursor-pointer"
              onClick={() => handleStationClick(regime.id)}
              whileHover={{ scale: 1.1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />

            {/* Label */}
            <text
              x={pos.x}
              y={pos.y + 50}
              textAnchor="middle"
              className={`text-xs font-bold pointer-events-none ${regime.color}`}
            >
              {regime.label}
            </text>

            {/* Range */}
            <text
              x={pos.x}
              y={pos.y + 65}
              textAnchor="middle"
              className="fill-gray-400 text-[10px] font-mono pointer-events-none"
            >
              {regime.range}
            </text>
          </g>
        );
      })}

      {/* Center info */}
      <text
        x={CENTER}
        y={CENTER - 10}
        textAnchor="middle"
        className="fill-white text-sm font-bold"
      >
        {activeRegimeData.label}
      </text>
      <text
        x={CENTER}
        y={CENTER + 10}
        textAnchor="middle"
        className="fill-gray-400 text-xs"
      >
        {activeRegimeData.label}
      </text>
      <text
        x={CENTER}
        y={CENTER + 30}
        textAnchor="middle"
        className="fill-gray-500 text-[10px] font-mono"
      >
        {activeRegimeData.allocation.crypto}% crypto / {activeRegimeData.allocation.stable}% stable
      </text>

      {/* Directional flow particles on ring */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r="2"
          fill={activeRegimeData.fillColor}
          opacity="0.6"
          filter="url(#glow)"
          animate={{
            offsetDistance: ['0%', '100%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 1.3,
          }}
        >
          <animateMotion dur="4s" repeatCount="indefinite" path={ringPath} />
        </motion.circle>
      ))}
    </svg>
  );
}
