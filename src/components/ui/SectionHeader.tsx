'use client';

import { motion } from 'framer-motion';
import { ANIMATIONS, GRADIENTS, STYLES } from '@/lib/constants';

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, highlight, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={ANIMATIONS.fadeInUp.initial}
      whileInView={ANIMATIONS.fadeInUp.animate}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`text-center mb-20 ${className}`}
    >
      <h2 className={STYLES.heading}>
        {title}
        {highlight && (
          <span className={`bg-gradient-to-r ${GRADIENTS.text} bg-clip-text text-transparent ml-3`}>
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && <p className={STYLES.subheading}>{subtitle}</p>}
    </motion.div>
  );
}
