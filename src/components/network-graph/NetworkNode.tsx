'use client';

import { motion } from 'framer-motion';
import type { Node } from '@/data/networkNodes';

interface NetworkNodeProps {
  node: Node;
  isActive: boolean;
  isFocused: boolean;
  hasActiveConnection: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onClick: (id: string) => void;
  onFocus: () => void;
  index: number;
}

export function NetworkNode({
  node,
  isActive,
  isFocused,
  hasActiveConnection,
  onHoverStart,
  onHoverEnd,
  onClick,
  onFocus,
  index,
}: NetworkNodeProps) {
  return (
    <motion.div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${
        isFocused ? 'ring-2 ring-purple-400 ring-opacity-75' : ''
      }`}
      style={{ left: node.x, top: node.y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.15, zIndex: 50 }}
      onHoverStart={() => onHoverStart(node.id)}
      onHoverEnd={onHoverEnd}
      role="button"
      aria-label={`${node.label} - ${node.type} ${node.apy ? `with ${node.apy} APY` : ''}`}
      tabIndex={isFocused ? 0 : -1}
      onClick={() => onClick(node.id)}
      onFocus={onFocus}
    >
      {/* Node Circle */}
      <motion.div
        className="relative rounded-full border-2 flex items-center justify-center text-white font-bold backdrop-blur-lg shadow-2xl"
        style={{
          width: node.size,
          height: node.size,
          backgroundColor: `${node.color}60`,
          borderColor: node.color,
          boxShadow: `0 0 30px ${node.color}40`,
        }}
        animate={
          isActive
            ? {
                boxShadow: [
                  `0 0 30px ${node.color}40`,
                  `0 0 60px ${node.color}80`,
                  `0 0 30px ${node.color}40`,
                ],
                borderWidth: [2, 4, 2],
              }
            : {}
        }
        transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
      >
        <span className="text-sm relative z-10">{node.icon}</span>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: node.color }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        />

        {/* Active Status Indicator */}
        {hasActiveConnection && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      {isActive && (
        <motion.div
          className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-xl p-4 min-w-[200px] z-50 shadow-2xl"
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
        >
          <div className="text-center">
            <div className="text-white font-bold text-sm mb-1">{node.label}</div>
            {node.apy && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">APY:</span>
                  <span className="text-green-400 font-semibold">{node.apy}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">TVL:</span>
                  <span className="text-blue-400 font-semibold">{node.tvl}</span>
                </div>
              </div>
            )}
            {node.status && (
              <div
                className={`text-xs mt-2 px-2 py-1 rounded-full ${
                  node.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : node.status === 'mainnet'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-purple-500/20 text-purple-400'
                }`}
              >
                {node.status.toUpperCase()}
              </div>
            )}
          </div>
          {/* Arrow */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-700" />
        </motion.div>
      )}
    </motion.div>
  );
}
