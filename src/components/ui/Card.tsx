'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ANIMATIONS, STYLES } from '@/lib/constants';

interface CardProps {
  variant?: 'default' | 'glass' | 'feature';
  padding?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}

export function Card({
  variant = 'glass',
  padding = 'md',
  children,
  className = '',
  hover = true,
  delay = 0,
  style,
}: CardProps) {
  const variantClasses = {
    default: 'bg-gray-800 border border-gray-700',
    glass: `${STYLES.glass} ${STYLES.glassHover}`,
    feature: `${STYLES.glass} ${STYLES.glassHover} group`,
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const combinedClasses = `
    ${STYLES.card}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${className}
  `.trim();

  return (
    <motion.div
      className={combinedClasses}
      initial={ANIMATIONS.fadeInUp.initial}
      whileInView={ANIMATIONS.fadeInUp.animate}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={hover ? ANIMATIONS.cardHover : undefined}
      style={style}
    >
      {children}
    </motion.div>
  );
}
