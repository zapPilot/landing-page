'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface PerformanceMetricsProps {
  isMobile: boolean;
  metrics: Metric[];
}

export function PerformanceMetrics({ isMobile, metrics }: PerformanceMetricsProps) {
  return (
    <motion.div
      className={`absolute ${isMobile ? 'top-12 right-3 space-y-2' : 'top-16 right-6 space-y-3'}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          className={`bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-lg ${isMobile ? 'p-2 min-w-[90px]' : 'p-3 min-w-[120px]'} shadow-lg`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 + index * 0.1 }}
          whileHover={{ scale: 1.05, borderColor: '#8B5CF6' }}
        >
          <div className="flex items-center justify-between mb-1">
            <metric.icon className={`w-4 h-4 ${metric.color}`} />
            <span className={`font-bold ${metric.color}`}>{metric.value}</span>
          </div>
          <div className="text-gray-300 text-xs">{metric.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
