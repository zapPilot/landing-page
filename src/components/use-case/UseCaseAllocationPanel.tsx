'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AllocationComparison, MaintainingAllocation } from '@/components/ui/allocation';
import type { UseCaseVariant } from './types';

interface UseCaseAllocationPanelProps {
  variants: UseCaseVariant[];
  activeTab: number;
  onTabChange: (index: number) => void;
  gradient: string;
}

export function UseCaseAllocationPanel({
  variants,
  activeTab,
  onTabChange,
  gradient,
}: UseCaseAllocationPanelProps) {
  const activeVariant = variants[activeTab];
  const hasAllocationChange =
    JSON.stringify(activeVariant.allocationStartBreakdown) !==
    JSON.stringify(activeVariant.allocationEndBreakdown);

  return (
    <div className="relative">
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
          className="relative bg-gray-800/50 rounded-2xl p-6 lg:p-8 border border-gray-700"
          whileHover={{ scale: 1.02 }}
        >
          {/* Allocation Visualization */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Portfolio Allocation</div>
            </div>

            {hasAllocationChange ? (
              <AllocationComparison
                before={activeVariant.allocationStartBreakdown}
                after={activeVariant.allocationEndBreakdown}
                timeframe="Over 5-10 days"
                gradient={gradient}
              />
            ) : (
              <MaintainingAllocation />
            )}
          </div>

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
