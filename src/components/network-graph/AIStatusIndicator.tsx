'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface AIStatusIndicatorProps {
  isMobile: boolean;
  isExecuting: boolean;
}

export function AIStatusIndicator({ isMobile, isExecuting }: AIStatusIndicatorProps) {
  return (
    <motion.div
      className={`absolute ${isMobile ? 'top-3 right-3 px-3 py-1' : 'top-6 right-6 px-4 py-2'} bg-gray-900/90 backdrop-blur-lg border border-green-500/30 rounded-full flex items-center space-x-2 shadow-lg`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        animate={{
          rotate: isExecuting ? 360 : 0,
          scale: isExecuting ? [1, 1.2, 1] : 1,
        }}
        transition={{
          rotate: { duration: 2, repeat: isExecuting ? Infinity : 0, ease: 'linear' },
          scale: { duration: 1, repeat: isExecuting ? Infinity : 0 },
        }}
      >
        <Brain className="w-4 h-4 text-green-400" />
      </motion.div>
      <span className="text-green-400 text-sm font-medium">Autopilot Triggered</span>
    </motion.div>
  );
}
