'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20" />
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl gpu-accelerate"
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 0.8, 1],
              }
        }
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 60, -60, 0],
                y: [0, -40, 40, 0],
                rotate: [0, 180, 360],
              }
        }
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
      />
    </div>
  );
}
