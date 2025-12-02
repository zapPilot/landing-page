'use client';

import { motion } from 'framer-motion';
import { type RegimeId, regimeOrder, getRegimeById } from '../variation-claude/shared/regimeData';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { RegimeArc } from './RegimeArc';
import { AllocationPanel } from './AllocationPanel';

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
    const cy = 280; // Top portion of viewBox (lowered from 250)
    const radius = 240; // Increased from 180 for larger nodes
    const startAngle = 180; // Left side
    const angleStep = 180 / (getRegimeById('ef').id === 'ef' ? 4 : 4); // 5 regimes -> 4 steps
    const angle = (startAngle - index * angleStep) * (Math.PI / 180);

    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // Get viewBox - always vertical for centered display
  const getViewBox = () => {
    return '0 0 900 1200'; // Increased from 1000 to 1200
  };

  // Get panel position - below arc for vertical layout
  const getPanelPosition = () => {
    return isMobile
      ? { x: 50, y: 620, width: 800, height: 480 }
      : { x: 50, y: 620, width: 900, height: 520 };
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

        <RegimeArc
          activeRegime={activeRegime}
          calculatePosition={calculatePosition}
          isMobile={isMobile}
        />

        <AllocationPanel
          activeRegimeData={activeRegimeData}
          panelPosition={panelPos}
          lpAllocation={lpAllocation}
          spotAllocation={spotAllocation}
          isMobile={isMobile}
        />
      </svg>
    </div>
  );
}
