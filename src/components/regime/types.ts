import type { RegimeId, Regime, RegimeStrategy } from '@/lib/regimeData';

export interface RegimeArcProps {
  activeRegime: RegimeId;
  calculatePosition: (index: number) => { x: number; y: number };
  isMobile: boolean;
  onRegimeClick: (regimeId: RegimeId) => void;
  isAutoPlaying: boolean;
  animationDirection: 'forward' | 'backward';
}

export interface AllocationPanelProps {
  activeRegimeData: Regime;
  panelPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  lpAllocation: number;
  spotAllocation: number;
  isMobile: boolean;
  animationDirection: 'forward' | 'backward';
  activeStrategy: RegimeStrategy;
  directionLabel: string | null;
  isAutoPlaying?: boolean;
}
