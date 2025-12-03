'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { AllocationPanelProps } from './types';

export function AllocationPanel({
  activeRegimeData,
  panelPosition,
  lpAllocation,
  spotAllocation,
  isMobile: _isMobile,
}: AllocationPanelProps) {
  const panelPos = panelPosition;

  return (
    <foreignObject
      x={panelPos.x}
      y={panelPos.y}
      width={panelPos.width}
      height={panelPos.height}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegimeData.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 h-full flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: activeRegimeData.fillColor }}
            />
            <h3 className="text-2xl font-bold text-white">{activeRegimeData.label}</h3>
          </div>

          {/* Big Numbers */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span
                className="text-4xl font-bold"
                style={{ color: activeRegimeData.fillColor }}
              >
                {activeRegimeData.allocation.crypto}%
              </span>
              <span className="text-gray-400">crypto</span>
              <span className="text-gray-600 mx-2">/</span>
              <span
                className="text-4xl font-bold"
                style={{ color: activeRegimeData.fillColor }}
              >
                {activeRegimeData.allocation.stable}%
              </span>
              <span className="text-gray-400">stable</span>
            </div>
            <p className="text-sm text-gray-500 italic">{activeRegimeData.author}</p>
          </div>

          {/* Philosophy */}
          <div className="mb-6 flex-grow">
            <p
              className="text-lg italic"
              style={{ color: activeRegimeData.fillColor }}
            >
              {activeRegimeData.philosophy}
            </p>
          </div>

          {/* Bars (replacing Actions) */}
          <div className="space-y-6 mt-auto">
            {/* USDC Bar */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image src="/usdc.webp" alt="USDC" width={24} height={24} className="rounded-full" />
                <span className="text-gray-200 font-semibold text-sm">USDC</span>
                <span className="ml-auto text-blue-400 font-bold">{activeRegimeData.allocation.stable}%</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${activeRegimeData.allocation.stable}%` }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>

            {/* LP Bar */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-1">
                  <Image src="/btc.webp" alt="BTC" width={20} height={20} className="rounded-full" />
                  <Image src="/eth.webp" alt="ETH" width={20} height={20} className="rounded-full" />
                </div>
                <span className="text-gray-200 font-semibold text-sm">LP Positions</span>
                <span className="ml-auto text-purple-400 font-bold">{lpAllocation}%</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${lpAllocation}%` }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>

            {/* Spot Bar */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-1">
                  <Image src="/btc.webp" alt="BTC" width={20} height={20} className="rounded-full" />
                  <Image src="/eth.webp" alt="ETH" width={20} height={20} className="rounded-full" />
                </div>
                <span className="text-gray-200 font-semibold text-sm">Spot BTC/ETH</span>
                <span className="ml-auto text-orange-400 font-bold">{spotAllocation}%</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-600 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${spotAllocation}%` }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </foreignObject>
  );
}
