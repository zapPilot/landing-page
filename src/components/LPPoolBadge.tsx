'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LPPoolBadgeProps {
  token1: string; // e.g., 'BTC'
  token2: string; // e.g., 'USDC'
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function LPPoolBadge({
  token1,
  token2,
  size = 'md',
  showLabel = true,
  className = ''
}: LPPoolBadgeProps) {
  const sizeMap = {
    sm: { icon: 24, overlap: -8, gap: 'gap-1' },
    md: { icon: 32, overlap: -12, gap: 'gap-2' },
    lg: { icon: 48, overlap: -16, gap: 'gap-3' },
  };

  const config = sizeMap[size];

  // Map token names to icon paths
  const getTokenIcon = (token: string) => {
    const iconMap: Record<string, string> = {
      'BTC': '/btc.webp',
      'ETH': '/eth.webp',
      'USDC': '/usdc.webp',
      'USD': '/usdc.webp', // Fallback to USDC icon for USD
    };
    return iconMap[token.toUpperCase()] || '/usdc.webp';
  };

  const tokens = [
    { token: token1, zIndex: 'z-10', style: undefined },
    { token: token2, zIndex: 'z-0', style: { marginLeft: config.overlap } },
  ];

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Overlapping Token Icons */}
      <div className="relative flex items-center" style={{ marginRight: config.overlap }}>
        {tokens.map(({ token, zIndex, style }) => (
          <motion.div
            key={token}
            className={`relative ${zIndex} rounded-full bg-gray-800 p-1 border-2 border-gray-700`}
            style={style}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Image
              src={getTokenIcon(token)}
              alt={token}
              width={config.icon}
              height={config.icon}
              className="rounded-full"
            />
          </motion.div>
        ))}
      </div>

      {/* Label */}
      {showLabel && (
        <div className={`text-gray-400 text-xs font-medium mt-2 ${config.gap}`}>
          {token1}-{token2} LP
        </div>
      )}
    </div>
  );
}
