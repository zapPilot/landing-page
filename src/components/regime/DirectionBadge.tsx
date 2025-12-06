'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DirectionBadgeProps {
  direction: 'forward' | 'backward';
  label: string;
  regimeColor: string;
  isAutoPlaying?: boolean;
}

export function DirectionBadge({
  direction,
  label,
  regimeColor,
  isAutoPlaying = false,
}: DirectionBadgeProps) {
  // Determine gradient and arrow based on direction
  const isRecovery = direction === 'forward';
  const gradient = isRecovery
    ? 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
    : 'from-red-500/20 to-orange-500/20 border-red-500/30';

  const Arrow = isRecovery ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-gradient-to-r ${gradient} backdrop-blur-sm`}
    >
      <motion.div
        animate={{
          x: isAutoPlaying ? (isRecovery ? [-2, 0, -2] : [2, 0, 2]) : 0,
        }}
        transition={{
          duration: 2,
          repeat: isAutoPlaying ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <Arrow className="w-3.5 h-3.5" style={{ color: regimeColor }} />
      </motion.div>
      <span className="text-xs font-semibold text-gray-200">{label}</span>
    </motion.div>
  );
}
