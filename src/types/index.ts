/**
 * Type definitions barrel export
 * Import from '@/types' for shared type definitions
 */

// Regime-related types
export * from './regime.types';

// Re-export commonly used types from other modules
export type { Stat, StatType } from '@/lib/statistics';
export type { RegimeId, Regime, RegimeStrategy } from '@/lib/regimeData';
export type { Feature, FeatureConfig } from '@/config/features';
