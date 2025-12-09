/**
 * Custom hook for calculating regime visualizer layout
 * Memoizes layout calculations based on viewport size
 */

import { useMemo } from 'react';
import { REGIME_VISUALIZER_CONFIG } from '@/config/regimeVisualizerConfig';

export interface RegimeLayout {
  /** SVG viewBox string */
  viewBox: string;
  /** ViewBox width */
  viewBoxWidth: number;
  /** ViewBox height */
  viewBoxHeight: number;
  /** Panel position and dimensions */
  panelPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** Arc geometry for regime nodes */
  arcGeometry: {
    centerX: number;
    centerY: number;
    radius: number;
  };
}

/**
 * Calculate layout values for regime visualizer based on viewport size
 * @param isMobile - Whether the viewport is mobile-sized
 * @returns Memoized layout configuration
 */
export function useRegimeLayout(isMobile: boolean): RegimeLayout {
  return useMemo(() => {
    const layout = isMobile
      ? REGIME_VISUALIZER_CONFIG.layout.mobile
      : REGIME_VISUALIZER_CONFIG.layout.desktop;

    return {
      viewBox: `0 0 ${layout.viewBoxWidth} ${layout.viewBoxHeight}`,
      viewBoxWidth: layout.viewBoxWidth,
      viewBoxHeight: layout.viewBoxHeight,
      panelPosition: {
        x: layout.panelX,
        y: layout.panelY,
        width: layout.panelWidth,
        height: layout.panelHeight,
      },
      arcGeometry: {
        centerX: layout.centerX,
        centerY: layout.arcCenterY,
        radius: layout.arcRadius,
      },
    };
  }, [isMobile]);
}
