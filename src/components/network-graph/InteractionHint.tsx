'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface InteractionHintProps {
  isMobile: boolean;
}

export function InteractionHint({ isMobile }: InteractionHintProps) {
  if (isMobile) return null;

  return (
    <motion.div
      className="absolute top-6 left-6 text-gray-300 text-xs flex items-center space-x-2"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <span>Hover nodes • Watch real-time execution • Use arrow keys to navigate</span>
      <Activity className="w-3 h-3" />
    </motion.div>
  );
}
