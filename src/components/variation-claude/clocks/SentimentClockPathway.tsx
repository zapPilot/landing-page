'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type RegimeId, regimes, regimeOrder, getRegimeById, isAdjacentRegime } from '../shared/regimeData';
import { getRegimePath, animatePathPreview, getPathDescription } from '../shared/pathPreview';
import { useState } from 'react';
import { Lock, LockOpen } from 'lucide-react';

interface SentimentClockPathwayProps {
  activeRegime: RegimeId;
  onRegimeChange: (regime: RegimeId) => void;
  isPaused: boolean;
}

export default function SentimentClockPathway({
  activeRegime,
  onRegimeChange,
  isPaused,
}: SentimentClockPathwayProps) {
  const [previewPath, setPreviewPath] = useState<RegimeId[]>([]);
  const [isAnimatingPath, setIsAnimatingPath] = useState(false);
  const [hoveredRegime, setHoveredRegime] = useState<RegimeId | null>(null);

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

    // Show "unlock sequence" for non-adjacent
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

  // Calculate positions in gentle 180° arc
  const calculatePosition = (index: number) => {
    const cx = 400;
    const cy = 300;
    const radius = 200;
    const startAngle = 180; // Left side
    const angleStep = 180 / (regimes.length - 1);
    const angle = (startAngle - index * angleStep) * (Math.PI / 180);

    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // Particle flow animation
  const ParticleFlow = ({ from, to, color }: { from: { x: number; y: number }; to: { x: number; y: number }; color: string }) => {
    return (
      <motion.circle
        r="4"
        fill={color}
        initial={{ cx: from.x, cy: from.y, opacity: 0 }}
        animate={{
          cx: [from.x, to.x],
          cy: [from.y, to.y],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg viewBox="0 0 800 600" className="w-full h-auto">
        <defs>
          {/* Glow filter */}
          <filter id="pathwayGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#4b5563" />
          </marker>

          <marker
            id="arrowheadActive"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Pathways between nodes */}
        {regimes.map((regime, index) => {
          if (index === regimes.length - 1) return null;

          const from = calculatePosition(index);
          const to = calculatePosition(index + 1);
          const isActivePath =
            (regime.id === activeRegime && regimes[index + 1].id === activeRegime) ||
            (regime.id === activeRegime || regimes[index + 1].id === activeRegime);
          const isInPreviewPath = previewPath.includes(regime.id) && previewPath.includes(regimes[index + 1].id);

          return (
            <g key={`path-${regime.id}-${regimes[index + 1].id}`}>
              {/* Path line */}
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isInPreviewPath ? '#3b82f6' : '#4b5563'}
                strokeWidth={isActivePath || isInPreviewPath ? 4 : 2}
                markerEnd={isInPreviewPath ? 'url(#arrowheadActive)' : 'url(#arrowhead)'}
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: isInPreviewPath ? [0.5, 1, 0.5] : isActivePath ? 0.6 : 0.3,
                }}
                transition={{
                  opacity: { duration: 1, repeat: isInPreviewPath ? Infinity : 0 },
                }}
              />

              {/* Particle flow on active paths */}
              {(isActivePath || isInPreviewPath) && !isPaused && (
                <ParticleFlow
                  from={from}
                  to={to}
                  color={isInPreviewPath ? '#3b82f6' : regime.fillColor}
                />
              )}
            </g>
          );
        })}

        {/* Lock icons for non-adjacent connections */}
        {regimes.map((fromRegime, fromIdx) => {
          return regimes.map((toRegime, toIdx) => {
            if (fromIdx >= toIdx) return null;
            if (isAdjacentRegime(fromRegime.id, toRegime.id)) return null;

            const from = calculatePosition(fromIdx);
            const to = calculatePosition(toIdx);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            const showLock = hoveredRegime === toRegime.id && activeRegime === fromRegime.id;

            return (
              <g key={`lock-${fromRegime.id}-${toRegime.id}`}>
                {/* Dashed line showing blocked path */}
                {showLock && (
                  <motion.line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                  />
                )}

                {/* Lock icon */}
                {showLock && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <circle cx={midX} cy={midY} r="20" fill="#1f2937" stroke="#ef4444" strokeWidth="2" />
                    <foreignObject x={midX - 12} y={midY - 12} width="24" height="24">
                      <Lock className="text-red-500" size={24} />
                    </foreignObject>
                  </motion.g>
                )}
              </g>
            );
          });
        })}

        {/* Regime nodes */}
        {regimes.map((regime, index) => {
          const pos = calculatePosition(index);
          const isActive = regime.id === activeRegime;
          const isInPath = previewPath.includes(regime.id);
          const isHovered = hoveredRegime === regime.id;
          const canDirectTransition = isActive || isAdjacentRegime(activeRegime, regime.id);

          return (
            <g
              key={regime.id}
              onMouseEnter={() => setHoveredRegime(regime.id)}
              onMouseLeave={() => setHoveredRegime(null)}
            >
              {/* Node glow background */}
              {(isActive || isInPath) && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 50 : 40}
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
                r={isActive ? 40 : isHovered ? 35 : 30}
                fill={regime.fillColor}
                stroke="white"
                strokeWidth={isActive ? 4 : 3}
                className="cursor-pointer"
                onClick={() => handleRegimeClick(regime.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isInPath ? [1, 1.15, 1] : 1,
                }}
                transition={{
                  scale: { duration: 0.5, repeat: isInPath ? Infinity : 0 },
                }}
                filter={isActive ? 'url(#pathwayGlow)' : undefined}
              />

              {/* Lock/Unlock indicator on node */}
              {isHovered && !isActive && (
                <motion.g
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <circle cx={pos.x + 25} cy={pos.y - 25} r="12" fill="#1f2937" stroke="white" strokeWidth="2" />
                  <foreignObject x={pos.x + 25 - 8} y={pos.y - 25 - 8} width="16" height="16">
                    {canDirectTransition ? (
                      <LockOpen className="text-green-400" size={16} />
                    ) : (
                      <Lock className="text-red-400" size={16} />
                    )}
                  </foreignObject>
                </motion.g>
              )}

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

        {/* Unlock sequence indicator */}
        <AnimatePresence>
          {previewPath.length > 0 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <rect x="250" y="500" width="300" height="60" rx="10" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
              <text
                x="400"
                y="520"
                textAnchor="middle"
                style={{ fill: '#3b82f6', fontSize: '12px', fontWeight: 600 }}
              >
                UNLOCK SEQUENCE
              </text>
              <text
                x="400"
                y="545"
                textAnchor="middle"
                style={{ fill: '#9ca3af', fontSize: '11px' }}
              >
                {getPathDescription(previewPath[0], previewPath[previewPath.length - 1])}
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Description text */}
        <text
          x="400"
          y="580"
          textAnchor="middle"
          className="select-none"
          style={{ fill: '#6b7280', fontSize: '11px', fontStyle: 'italic' }}
        >
          {previewPath.length === 0 && 'Hover to see locks • Click distant regimes to unlock sequence'}
        </text>
      </svg>
    </div>
  );
}
