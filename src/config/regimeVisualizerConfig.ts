/**
 * Configuration for RegimeVisualizer component
 * Centralizes layout dimensions, animation timings, and behavior settings
 */

export const REGIME_VISUALIZER_CONFIG = {
  layout: {
    smallMobile: {
      viewBoxWidth: 700,
      viewBoxHeight: 900,
      panelY: 500,
      panelHeight: 480,
      arcCenterY: 220,
      centerX: 350, // viewBoxWidth / 2
      arcRadius: 180,
      panelX: 30,
      panelWidth: 640,
    },
    mobile: {
      viewBoxWidth: 900,
      viewBoxHeight: 1000,
      panelY: 620,
      panelHeight: 560,
      /**
       * Arc center Y position for mobile layout
       * TODO: Reconcile with documented formula (PANEL_Y + NODE_RADIUS + PADDING = 620 + 80 + 40 = 740)
       * Current value (280) appears to be empirically determined for visual alignment
       */
      arcCenterY: 280,
      centerX: 450, // viewBoxWidth / 2
      arcRadius: 240,
      panelX: 50,
      panelWidth: 800,
    },
    desktop: {
      viewBoxWidth: 1600,
      viewBoxHeight: 600,
      panelY: 60,
      panelHeight: 560,
      /**
       * Arc center Y position calculated as: PANEL_Y + NODE_RADIUS + PADDING
       * Formula: 60 + 80 + 40 = 180
       */
      arcCenterY: 180,
      centerX: 420,
      arcRadius: 240,
      panelX: 900,
      panelWidth: 600,
    },
    constants: {
      /** Radius of regime nodes including glow effect */
      nodeRadius: 80,
      /** Padding between node and panel */
      nodePadding: 40,
      /** Starting angle for arc in degrees (left side) */
      arcAngleStart: 180,
      /** Total arc angle range in degrees */
      arcAngleRange: 180,
    },
  },
  animation: {
    /** Delay before showing visualizer content (for smooth initial render) */
    loadingDelay: 300,
    /** Interval between auto-play regime transitions in milliseconds */
    autoPlayInterval: 5000,
    fadeIn: {
      duration: 0.6,
      delay: 0,
    },
    slideIn: {
      duration: 0.8,
      delay: 0,
    },
    /** Configuration for the interaction hint tooltip */
    interactionHint: {
      /** Total animation duration in seconds */
      duration: 6,
      /** Keyframe times for opacity/position animation */
      times: [0, 0.1, 0.9, 1] as const,
      /** Number of times to repeat the hint animation */
      repeat: 2,
    },
  },
  autoPlay: {
    /**
     * Regime IDs where ping-pong animation reverses direction
     * - forward: 'g' (Greed) - reached extreme greed, reverse to backward
     * - backward: 'f' (Fear) - reached extreme fear, reverse to forward
     */
    reversalPoints: {
      forward: 'g' as const,
      backward: 'f' as const,
    },
  },
} as const;
