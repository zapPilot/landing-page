'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import type { UseCaseVariant } from './types';

interface UseCaseContentProps {
  number: string;
  regime: string;
  regimeBadge: string;
  gradient: string;
  variant: UseCaseVariant;
  icon: LucideIcon;
}

export function UseCaseContent({
  number,
  regime,
  regimeBadge,
  gradient,
  variant,
  icon: Icon,
}: UseCaseContentProps) {
  return (
    <div>
      {/* Number badge */}
      <motion.div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} text-white font-bold text-xl mb-6`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {number}
      </motion.div>

      {/* Regime Badge */}
      <div
        className={`inline-block px-4 py-2 rounded-full border ${regimeBadge} font-semibold text-sm mb-4`}
      >
        {regime}
      </div>

      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
        {variant.title}
      </h3>

      {/* Scenario */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm font-semibold mb-1">Scenario:</p>
        <p className="text-gray-300 text-lg">{variant.scenario}</p>
      </div>

      {/* User Intent */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm font-semibold mb-1">Your Goal:</p>
        <p className="text-gray-300 text-lg italic">&ldquo;{variant.userIntent}&rdquo;</p>
      </div>

      {/* Zap Action */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm font-semibold mb-1">Zap Pilot Action:</p>
        <p className="text-white text-lg font-medium">{variant.zapAction}</p>
      </div>

      <motion.a
        href="http://app.zap-pilot.org/"
        className={`inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-semibold hover:shadow-lg transition-all duration-300`}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        target="_blank"
      >
        <Icon className="w-5 h-5 mr-2" />
        Explore Strategy
      </motion.a>
    </div>
  );
}
