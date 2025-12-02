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
  const viewBoxWidth = isMobile ? 900 : 1600;
  const viewBoxHeight = isMobile ? 1200 : 600;
  const centerX = isMobile ? viewBoxWidth / 2 : 420;
  const centerY = isMobile ? 280 : 280;
  const arcRadius = isMobile ? 240 : 240;

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
    const startAngle = 180; // Left side
    const angleStep = 180 / (getRegimeById('ef').id === 'ef' ? 4 : 4); // 5 regimes -> 4 steps
    const angle = (startAngle - index * angleStep) * (Math.PI / 180);

    return {
      x: centerX + arcRadius * Math.cos(angle),
      y: centerY + arcRadius * Math.sin(angle),
    };
  };

  const getViewBox = () => `0 0 ${viewBoxWidth} ${viewBoxHeight}`;

  const getPanelPosition = () => {
    return isMobile
      ? { x: 50, y: 620, width: 800, height: 480 }
      : { x: 900, y: 60, width: 600, height: 480 };
  };

  const panelPos = getPanelPosition();

  return (
    <section className={`relative py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full">
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
        </motion.div>
      </div>
    </section>
  );
}
