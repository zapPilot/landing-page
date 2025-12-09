'use client';

import { motion } from 'framer-motion';
import type { Connection } from '@/data/networkNodes';

interface NetworkConnectionProps {
  connection: Connection;
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}

export function NetworkConnection({ connection, fromPos, toPos }: NetworkConnectionProps) {
  return (
    <g>
      {/* Base line */}
      <line
        x1={fromPos.x}
        y1={fromPos.y}
        x2={toPos.x}
        y2={toPos.y}
        stroke="#374151"
        strokeWidth={1 + connection.strength}
        opacity="0.4"
      />

      {/* Animated flow line */}
      {connection.animated && (
        <motion.line
          x1={fromPos.x}
          y1={fromPos.y}
          x2={toPos.x}
          y2={toPos.y}
          stroke={connection.color}
          strokeWidth={3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}

      {/* Data packet animation */}
      {connection.animated && (
        <>
          <motion.circle
            r="6"
            fill={connection.color}
            initial={{ cx: fromPos.x, cy: fromPos.y }}
            animate={{ cx: toPos.x, cy: toPos.y }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
          />
          <motion.circle
            r="12"
            fill="none"
            stroke={connection.color}
            strokeWidth="2"
            opacity="0.5"
            initial={{ cx: fromPos.x, cy: fromPos.y }}
            animate={{
              cx: toPos.x,
              cy: toPos.y,
              scale: [0, 1, 0],
            }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
          />
        </>
      )}
    </g>
  );
}
