import type { RegimeId, Regime } from '../variation-claude/shared/regimeData';

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
