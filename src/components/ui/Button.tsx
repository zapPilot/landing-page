'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ANIMATIONS, GRADIENTS, STYLES } from '@/lib/constants';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className = '',
  disabled = false,
  href,
  target,
}: ButtonProps) {
  const baseClasses = STYLES.buttonBase;

  const variantClasses = {
    primary: `bg-gradient-to-r ${GRADIENTS.primary} ${STYLES.buttonPrimary}`,
    secondary: STYLES.buttonSecondary,
    ghost: 'text-gray-300 hover:text-white transition-colors duration-300',
  };

  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-lg',
    lg: 'px-10 py-5 text-xl',
  };

  const combinedClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${size !== 'md' ? sizeClasses[size] : ''} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  const motionProps = {
    className: combinedClasses,
    whileHover: disabled ? {} : ANIMATIONS.buttonHover,
    whileTap: disabled ? {} : ANIMATIONS.buttonTap,
    onClick: disabled ? undefined : onClick,
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} disabled={disabled}>
      {children}
    </motion.button>
  );
}
