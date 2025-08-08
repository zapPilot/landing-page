'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Simple animated visualization that shows a token moving through
 * the execution pipeline: Wallet → Bridge → Optimizer → Yield Pool.
 */
export function ExecutionFlow() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const points = [
    { label: 'Wallet', x: 10, y: 50 },
    { label: 'Bridge', x: 35, y: 50 },
    { label: 'Optimizer', x: 60, y: 50 },
    { label: 'Yield Pool', x: 85, y: 50 },
  ];

  const path =
    `M${points[0].x} ${points[0].y} ` +
    points
      .slice(1)
      .map(p => `L${p.x} ${p.y}`)
      .join(' ');

  return (
    <motion.div
      className={`relative w-full ${isMobile ? 'h-[400px]' : 'h-[600px]'}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      role="img"
      aria-label="Animated execution flow of a token from wallet to yield pool"
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="absolute inset-0">
        {/* Connection Path */}
        <path d={path} fill="none" stroke="#8B5CF6" strokeWidth={2} />

        {/* Nodes and labels */}
        {points.map(p => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r={3} fill="#fff" />
            <text
              x={p.x}
              y={p.y + 8}
              textAnchor="middle"
              className="fill-gray-300 text-[3px] md:text-[4px]"
            >
              {p.label}
            </text>
          </g>
        ))}

        {/* Moving token */}
        <motion.circle
          r={3}
          fill="#FBBF24"
          animate={{
            cx: points.map(p => p.x),
            cy: points.map(p => p.y),
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
      </svg>
    </motion.div>
  );
}
