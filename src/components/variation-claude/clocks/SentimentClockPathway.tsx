'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type RegimeId, regimes, regimeOrder, getRegimeById, isAdjacentRegime } from '../shared/regimeData';
import { getRegimePath, animatePathPreview, getPathDescription } from '../shared/pathPreview';
import { useState } from 'react';
import { Lock, LockOpen } from 'lucide-react';
import Image from 'next/image';

export type LayoutVariant = 'center-tanks' | 'below-nodes' | 'side-panel';

interface SentimentClockPathwayProps {
  activeRegime: RegimeId;
  onRegimeChange: (regime: RegimeId) => void;
  isPaused: boolean;
  layoutVariant?: LayoutVariant;
}

export default function SentimentClockPathway({
  activeRegime,
  onRegimeChange,
  isPaused,
  layoutVariant = 'center-tanks',
}: SentimentClockPathwayProps) {
  const [previewPath, setPreviewPath] = useState<RegimeId[]>([]);
  const [isAnimatingPath, setIsAnimatingPath] = useState(false);
  const [hoveredRegime, setHoveredRegime] = useState<RegimeId | null>(null);
  
  const activeRegimeData = getRegimeById(activeRegime);
  
  // Determine asset flow direction based on regime
  const isBuying = ['ef', 'f'].includes(activeRegime); // Stable → Token
  const isSelling = ['g', 'eg'].includes(activeRegime); // Token → Stable
  const isYielding = activeRegime === 'n'; // Token → LP
  
  // Calculate LP allocation
  const lpAllocation = isYielding ? 30 : 10;
  const spotAllocation = activeRegimeData.allocation.crypto - lpAllocation;

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

  // Tank positions for center layout
  const tankPositions = {
    stable: { x: 250, y: 450 },
    lp: { x: 400, y: 450 },
    token: { x: 550, y: 450 },
  };

  // SVG viewBox dimensions based on layout
  const getViewBox = () => {
    if (layoutVariant === 'side-panel') return '0 0 1100 600';
    if (layoutVariant === 'center-tanks') return '0 0 800 580';
    return '0 0 800 600';
  };

  return (
    <div className={`w-full mx-auto ${layoutVariant === 'side-panel' ? 'max-w-6xl' : 'max-w-4xl'}`}>
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

        {/* ============================================ */}
        {/* VARIATION A: Center Tanks Layout */}
        {/* ============================================ */}
        {layoutVariant === 'center-tanks' && (
          <g>
            {/* Connecting pipes */}
            <path
              d="M 300 430 Q 400 400 500 430"
              stroke="#4B5563"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* Flow particles */}
            {!isPaused && isBuying && (
              <motion.circle
                r="5"
                fill="#3B82F6"
                initial={{ opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ offsetPath: "path('M 250 450 Q 400 420 550 450')" }}
              />
            )}
            {!isPaused && isSelling && (
              <motion.circle
                r="5"
                fill="#F97316"
                initial={{ opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ offsetPath: "path('M 550 450 Q 400 420 250 450')" }}
              />
            )}
            {!isPaused && isYielding && (
              <motion.circle
                r="5"
                fill="#A855F7"
                initial={{ opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ offsetPath: "path('M 550 450 Q 400 420 400 450')" }}
              />
            )}

            {/* Stable Tank (USDC) */}
            <g>
              <rect x={tankPositions.stable.x - 50} y={tankPositions.stable.y - 60} width="100" height="80" rx="8" fill="#1e293b" stroke="#374151" strokeWidth="2" />
              <motion.rect
                x={tankPositions.stable.x - 45}
                y={tankPositions.stable.y - 55}
                width="90"
                height="70"
                rx="4"
                fill="url(#stableGradient)"
                animate={{ scaleY: activeRegimeData.allocation.stable / 100 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
              />
              <foreignObject x={tankPositions.stable.x - 15} y={tankPositions.stable.y - 40} width="30" height="30">
                <Image src="/usdc.webp" alt="USDC" width={30} height={30} className="rounded-full" />
              </foreignObject>
              <text x={tankPositions.stable.x} y={tankPositions.stable.y + 35} textAnchor="middle" style={{ fill: '#3B82F6', fontSize: '12px', fontWeight: 700 }}>
                STABLE {activeRegimeData.allocation.stable}%
              </text>
            </g>

            {/* LP Tank */}
            <g>
              <rect x={tankPositions.lp.x - 50} y={tankPositions.lp.y - 60} width="100" height="80" rx="8" fill="#1e293b" stroke="#374151" strokeWidth="2" />
              <motion.rect
                x={tankPositions.lp.x - 45}
                y={tankPositions.lp.y - 55}
                width="90"
                height="70"
                rx="4"
                fill="url(#lpGradient)"
                animate={{ scaleY: lpAllocation / 100 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
              />
              <foreignObject x={tankPositions.lp.x - 20} y={tankPositions.lp.y - 40} width="40" height="30">
                <div className="flex -space-x-2">
                  <Image src="/btc.webp" alt="BTC" width={20} height={20} className="rounded-full" />
                  <Image src="/eth.webp" alt="ETH" width={20} height={20} className="rounded-full" />
                </div>
              </foreignObject>
              <text x={tankPositions.lp.x} y={tankPositions.lp.y + 35} textAnchor="middle" style={{ fill: '#A855F7', fontSize: '12px', fontWeight: 700 }}>
                LP {lpAllocation}%
              </text>
            </g>

            {/* Token Tank (BTC/ETH) */}
            <g>
              <rect x={tankPositions.token.x - 50} y={tankPositions.token.y - 60} width="100" height="80" rx="8" fill="#1e293b" stroke="#374151" strokeWidth="2" />
              <motion.rect
                x={tankPositions.token.x - 45}
                y={tankPositions.token.y - 55}
                width="90"
                height="70"
                rx="4"
                fill="url(#cryptoGradient)"
                animate={{ scaleY: spotAllocation / 100 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
              />
              <foreignObject x={tankPositions.token.x - 20} y={tankPositions.token.y - 40} width="40" height="30">
                <div className="flex -space-x-2">
                  <Image src="/btc.webp" alt="BTC" width={20} height={20} className="rounded-full" />
                  <Image src="/eth.webp" alt="ETH" width={20} height={20} className="rounded-full" />
                </div>
              </foreignObject>
              <text x={tankPositions.token.x} y={tankPositions.token.y + 35} textAnchor="middle" style={{ fill: '#F97316', fontSize: '12px', fontWeight: 700 }}>
                TOKEN {spotAllocation}%
              </text>
            </g>
          </g>
        )}

        {/* ============================================ */}
        {/* VARIATION B: Below Each Node Layout */}
        {/* ============================================ */}
        {layoutVariant === 'below-nodes' && regimes.map((regime, index) => {
          const pos = calculatePosition(index);
          const isActive = regime.id === activeRegime;
          
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
              
              {/* Allocation text */}
              <text
                x={pos.x}
                y={pos.y + 100}
                textAnchor="middle"
                style={{
                  fill: isActive ? regime.fillColor : '#6b7280',
                  fontSize: '11px',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {regime.allocation.crypto}% / {regime.allocation.stable}%
              </text>
              
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

        {/* ============================================ */}
        {/* VARIATION C: Side Panel Layout */}
        {/* ============================================ */}
        {layoutVariant === 'side-panel' && (
          <g>
            {/* Side panel background */}
            <rect x="820" y="50" width="260" height="500" rx="12" fill="#1e293b" stroke={activeRegimeData.fillColor} strokeWidth="2" />
            
            {/* Regime label */}
            <text x="950" y="90" textAnchor="middle" style={{ fill: activeRegimeData.fillColor, fontSize: '18px', fontWeight: 700 }}>
              {activeRegimeData.label}
            </text>
            <text x="950" y="110" textAnchor="middle" style={{ fill: '#94a3b8', fontSize: '12px' }}>
              {activeRegimeData.emotionalState}
            </text>

            {/* USDC Bar */}
            <g>
              <foreignObject x="840" y="130" width="30" height="30">
                <Image src="/usdc.webp" alt="USDC" width={30} height={30} className="rounded-full" />
              </foreignObject>
              <text x="880" y="150" style={{ fill: '#e2e8f0', fontSize: '14px', fontWeight: 600 }}>USDC</text>
              <rect x="840" y="160" width="200" height="12" rx="6" fill="#1f2937" />
              <motion.rect
                x="840"
                y="160"
                height="12"
                rx="6"
                fill="url(#stableGradient)"
                animate={{ width: activeRegimeData.allocation.stable * 2 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              />
              <text x="1050" y="172" textAnchor="end" style={{ fill: '#3B82F6', fontSize: '14px', fontWeight: 700 }}>
                {activeRegimeData.allocation.stable}%
              </text>
            </g>

            {/* LP Bar */}
            <g>
              <foreignObject x="840" y="200" width="40" height="30">
                <div className="flex -space-x-2">
                  <Image src="/btc.webp" alt="BTC" width={18} height={18} className="rounded-full" />
                  <Image src="/eth.webp" alt="ETH" width={18} height={18} className="rounded-full" />
                </div>
              </foreignObject>
              <text x="890" y="220" style={{ fill: '#e2e8f0', fontSize: '14px', fontWeight: 600 }}>LP Positions</text>
              <rect x="840" y="230" width="200" height="12" rx="6" fill="#1f2937" />
              <motion.rect
                x="840"
                y="230"
                height="12"
                rx="6"
                fill="url(#lpGradient)"
                animate={{ width: lpAllocation * 2 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              />
              <text x="1050" y="242" textAnchor="end" style={{ fill: '#A855F7', fontSize: '14px', fontWeight: 700 }}>
                {lpAllocation}%
              </text>
            </g>

            {/* Token Bar */}
            <g>
              <foreignObject x="840" y="270" width="40" height="30">
                <div className="flex -space-x-2">
                  <Image src="/btc.webp" alt="BTC" width={18} height={18} className="rounded-full" />
                  <Image src="/eth.webp" alt="ETH" width={18} height={18} className="rounded-full" />
                </div>
              </foreignObject>
              <text x="890" y="290" style={{ fill: '#e2e8f0', fontSize: '14px', fontWeight: 600 }}>Spot BTC/ETH</text>
              <rect x="840" y="300" width="200" height="12" rx="6" fill="#1f2937" />
              <motion.rect
                x="840"
                y="300"
                height="12"
                rx="6"
                fill="url(#cryptoGradient)"
                animate={{ width: spotAllocation * 2 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              />
              <text x="1050" y="312" textAnchor="end" style={{ fill: '#F97316', fontSize: '14px', fontWeight: 700 }}>
                {spotAllocation}%
              </text>
            </g>

            {/* Actions section */}
            <text x="950" y="360" textAnchor="middle" style={{ fill: '#64748b', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>
              ACTIONS
            </text>
            <rect x="840" y="370" width="200" height="80" rx="6" fill="#0f172a" />
            {activeRegimeData.actions.slice(0, 2).map((action, idx) => (
              <text key={idx} x="850" y={390 + idx * 20} style={{ fill: '#94a3b8', fontSize: '10px' }}>
                • {action.slice(0, 35)}{action.length > 35 ? '...' : ''}
              </text>
            ))}

            {/* Philosophy */}
            <text x="950" y="480" textAnchor="middle" style={{ fill: activeRegimeData.fillColor, fontSize: '11px', fontStyle: 'italic' }}>
              {activeRegimeData.philosophy}
            </text>

            {/* Total allocation */}
            <text x="950" y="520" textAnchor="middle" style={{ fill: '#e2e8f0', fontSize: '20px', fontWeight: 700 }}>
              {activeRegimeData.allocation.crypto}% / {activeRegimeData.allocation.stable}%
            </text>
            <text x="950" y="540" textAnchor="middle" style={{ fill: '#64748b', fontSize: '10px' }}>
              Crypto / Stable
            </text>
          </g>
        )}

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
          y={layoutVariant === 'center-tanks' ? '560' : '580'}
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
