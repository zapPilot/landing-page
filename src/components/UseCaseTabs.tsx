'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { AllocationComparison, NoChangeIndicator } from '@/components/ui/allocation';

export interface UseCaseVariant {
  direction: 'from-left' | 'from-right';
  tabLabel: string;
  title: string;
  scenario: string;
  userIntent: string;
  zapAction: string;
  allocationStart: number; // DEPRECATED - calculate from breakdown
  allocationEnd: number; // DEPRECATED - calculate from breakdown
  allocationStartBreakdown: { spot: number; lp: number; stable: number };
  allocationEndBreakdown: { spot: number; lp: number; stable: number };
  showLP: boolean; // DEPRECATED - inferred from LP > 0
  lpDirection?: 'building' | 'unwinding';
}

interface TabbedUseCaseProps {
  number: string;
  regime: string;
  regimeBadge: string;
  gradient: string;
  variants: UseCaseVariant[];
  icon: LucideIcon;
}

export function TabbedUseCase({
  number,
  regime,
  regimeBadge,
  gradient,
  variants,
  icon: Icon,
}: TabbedUseCaseProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeVariant = variants[activeTab];

  return (
    <div className="group relative">
      <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 lg:p-12 hover:border-gray-700 transition-all duration-500 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
          initial={false}
          whileHover={{ opacity: 0.05 }}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
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

            {/* Tabs */}
            {variants.length > 1 && (
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                  {activeVariant.title}
                </h3>

                {/* Scenario */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm font-semibold mb-1">Scenario:</p>
                  <p className="text-gray-300 text-lg">{activeVariant.scenario}</p>
                </div>

                {/* User Intent */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm font-semibold mb-1">Your Goal:</p>
                  <p className="text-gray-300 text-lg italic">
                    &ldquo;{activeVariant.userIntent}&rdquo;
                  </p>
                </div>

                {/* Zap Action */}
                <div className="mb-8">
                  <p className="text-gray-400 text-sm font-semibold mb-1">Zap Pilot Action:</p>
                  <p className="text-white text-lg font-medium">{activeVariant.zapAction}</p>
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual - Allocation Chart */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                {/* Allocation Visualization */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Portfolio Allocation</div>
                  </div>

                  {JSON.stringify(activeVariant.allocationStartBreakdown) ===
                  JSON.stringify(activeVariant.allocationEndBreakdown) ? (
                    <NoChangeIndicator
                      allocation={activeVariant.allocationStartBreakdown}
                      message="Maintaining current allocation — zero rebalancing"
                      gradient={gradient}
                    />
                  ) : (
                    <AllocationComparison
                      before={activeVariant.allocationStartBreakdown}
                      after={activeVariant.allocationEndBreakdown}
                      timeframe="Over 5-10 days"
                      gradient={gradient}
                    />
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
              className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r ${gradient} rounded-full blur-3xl opacity-20`}
            />
            <div
              className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-l ${gradient} rounded-full blur-2xl opacity-30`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
