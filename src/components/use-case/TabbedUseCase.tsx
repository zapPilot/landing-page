'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { UseCaseContent } from './UseCaseContent';
import { UseCaseAllocationPanel } from './UseCaseAllocationPanel';
import type { UseCaseVariant } from './types';

interface TabbedUseCaseProps {
  number: string;
  regime: string;
  regimeBadge: string;
  gradient: string;
  variants: UseCaseVariant[];
  icon: LucideIcon;
}

export function TabbedUseCase({ number, regime, gradient, variants }: TabbedUseCaseProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeVariant = variants[activeTab];

  return (
    <div className="group relative">
      <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-6 sm:p-8 lg:p-12 hover:border-gray-700 transition-all duration-500 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
          initial={false}
          whileHover={{ opacity: 0.05 }}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Content */}
          <UseCaseContent
            number={number}
            regime={regime}
            gradient={gradient}
            variant={activeVariant}
          />

          {/* Right: Allocation Panel with Tabs */}
          <UseCaseAllocationPanel
            variants={variants}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            gradient={gradient}
          />
        </div>
      </div>
    </div>
  );
}
