'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SharedAllocationPanel } from '@/components/regime/SharedAllocationPanel';
import { hasAllocationChange } from '@/lib/allocationUtils';
import type { UseCaseVariant } from './types';

interface UseCaseAllocationPanelProps {
  variants: UseCaseVariant[];
  activeTab: number;
  onTabChange: (index: number) => void;
  gradient: string;
  philosophy: string;
  author: string;
  fillColor: string;
  regimeLabel: string;
}

export function UseCaseAllocationPanel({
  variants,
  activeTab,
  onTabChange,
  gradient,
  philosophy,
  author,
  fillColor,
  regimeLabel,
}: UseCaseAllocationPanelProps) {
  const activeVariant = variants[activeTab];
  const hasChange = hasAllocationChange(
    activeVariant.allocationStartBreakdown,
    activeVariant.allocationEndBreakdown
  );

  return (
    <div className="relative h-full">
      {/* Tabs - Only show if multiple variants */}
      {variants.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {variants.map((variant, index) => (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === index
                  ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              }`}
            >
              {variant.tabLabel}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative h-full"
          whileHover={{ scale: 1.02 }}
        >
          <SharedAllocationPanel
            regimeLabel={regimeLabel}
            regimeColor={fillColor}
            philosophy={philosophy}
            author={author}
            strategyTitle={activeVariant.title}
            strategySubtitle={activeVariant.subtitle}
            allocationBefore={activeVariant.allocationStartBreakdown}
            allocationAfter={activeVariant.allocationEndBreakdown}
            protocols={activeVariant.protocols}
            isMaintaining={!hasChange}
            comparisonGradient={gradient}
          />

          {/* Floating elements */}
          <motion.div
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${gradient}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative gradient orbs */}
      <div
        className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r ${gradient} rounded-full blur-3xl opacity-20 pointer-events-none`}
      />
      <div
        className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-l ${gradient} rounded-full blur-2xl opacity-30 pointer-events-none`}
      />
    </div>
  );
}
