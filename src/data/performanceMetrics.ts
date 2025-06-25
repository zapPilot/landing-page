import { LucideIcon, TrendingUp, Shield, Zap, DollarSign } from 'lucide-react';

export interface PerformanceMetric {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

// Performance metrics data for the network graph
export const performanceMetrics: PerformanceMetric[] = [
  {
    icon: TrendingUp,
    label: 'Avg APY',
    value: '11.8%',
    color: 'text-green-400'
  },
  {
    icon: Shield,
    label: 'Success Rate',
    value: '99.7%',
    color: 'text-blue-400'
  },
  {
    icon: Zap,
    label: 'Avg Speed',
    value: '1.4s',
    color: 'text-yellow-400'
  },
  {
    icon: DollarSign,
    label: 'Gas Saved',
    value: '73%',
    color: 'text-purple-400'
  }
];

/**
 * Get performance metrics data
 * @returns Performance metrics array
 */
export function getPerformanceMetrics(): PerformanceMetric[] {
  return performanceMetrics;
}

/**
 * Get metric by label
 * @param label - The label to search for
 * @returns The performance metric or undefined if not found
 */
export function getMetricByLabel(label: string): PerformanceMetric | undefined {
  return performanceMetrics.find(metric => metric.label === label);
}