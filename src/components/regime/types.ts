import type { RegimeId, Regime } from '@/lib/regimeData';

export interface RegimeVisualizerProps {
  autoPlayInterval?: number;
  startRegime?: RegimeId;
  showInteractivity?: boolean;
  className?: string;
}

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
}

export interface PanelPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}
