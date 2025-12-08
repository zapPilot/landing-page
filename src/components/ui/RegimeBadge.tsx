'use client';

import type { RegimeId } from '@/lib/regimeData';
import { getRegimeById } from '@/lib/regimeData';

interface RegimeBadgeProps {
  regimeId: RegimeId;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

/**
 * Reusable badge component for displaying regime information
 * Automatically pulls colors, icon, and label from regime configuration
 */
export function RegimeBadge({
  regimeId,
  size = 'md',
  showIcon = true,
  className = '',
}: RegimeBadgeProps) {
  const regime = getRegimeById(regimeId);
  const Icon = regime.visual.icon;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border font-semibold ${regime.visual.badge} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{regime.label}</span>
    </div>
  );
}
