/**
 * Visualization configuration constants for RegimeVisualizer component
 * Centralizes layout dimensions, arc geometry, and animation settings
 */

/**
 * Layout configuration for mobile and desktop viewports
 */
export const LAYOUT_CONFIG = {
  MOBILE: {
    viewBoxWidth: 900,
    viewBoxHeight: 1000,
    centerX: 450, // viewBoxWidth / 2
    arcCenterY: 280,
    panelX: 50,
    panelY: 620,
    panelWidth: 800,
    panelHeight: 560,
  },
  DESKTOP: {
    viewBoxWidth: 1600,
    viewBoxHeight: 600,
    centerX: 420,
    arcCenterY: 180, // PANEL_Y (60) + NODE_RADIUS (80) + PADDING (40)
    panelX: 900,
    panelY: 60,
    panelWidth: 600,
    panelHeight: 560,
  },
} as const;

/**
 * Arc geometry configuration
 * Creates a gentle 180° semi-circular arc with nodes positioned at 45° intervals
 */
export const ARC_CONFIG = {
  /** Radius of the arc in pixels */
  RADIUS: 240,
  /** Starting angle in degrees (180 = left side) */
  START_ANGLE: 180,
  /** Angular step between nodes in degrees (5 regimes = 4 steps = 45° each) */
  ANGLE_STEP: 45,
  /** Total number of regimes displayed on the arc */
  REGIME_COUNT: 5,
} as const;

/**
 * Node visual styling configuration
 */
export const NODE_CONFIG = {
  /** Node radius when active/selected */
  RADIUS_ACTIVE: 65,
  /** Node radius when inactive */
  RADIUS_INACTIVE: 45,
  /** Stroke width when active */
  STROKE_WIDTH_ACTIVE: 6,
  /** Stroke width when inactive */
  STROKE_WIDTH_INACTIVE: 4,
  /** Hover hitbox radius for interaction */
  HITBOX_RADIUS: 70,
  /** Glow effect background radius */
  GLOW_RADIUS: 80,
  /** Glow opacity value */
  GLOW_OPACITY: 0.2,
  /** Vertical offset for node label text */
  TEXT_Y_OFFSET: -80,
} as const;

/**
 * Path/pathway styling between nodes
 */
export const PATH_CONFIG = {
  /** Stroke width when path is active */
  STROKE_WIDTH_ACTIVE: 6,
  /** Stroke width when path is inactive */
  STROKE_WIDTH_INACTIVE: 3,
  /** Opacity when path is active */
  OPACITY_ACTIVE: 0.6,
  /** Opacity when path is inactive */
  OPACITY_INACTIVE: 0.3,
  /** Path color (gray) */
  COLOR: '#4b5563',
} as const;

/**
 * Animation timing and duration configuration
 */
export const ANIMATION_CONFIG = {
  /** Auto-play interval in milliseconds (5 seconds) */
  AUTOPLAY_INTERVAL: 5000,
  /** Loading skeleton display duration in milliseconds */
  LOADING_DURATION: 300,
  /** Direction arrow animation duration in seconds */
  ARROW_ANIMATION_DURATION: 2,
  /** Arrow triangle dimensions */
  ARROW_TRIANGLE: {
    width: 12,
    height: 6,
  },
} as const;

/**
 * Network graph animation timing configuration
 * Used by useNetworkGraph hook for intent execution animations
 */
export const NETWORK_GRAPH_ANIMATION = {
  /** Main animation loop interval in milliseconds */
  EXECUTION_INTERVAL: 4000,
  /** Delay before starting flow animation in milliseconds */
  FLOW_START_DELAY: 500,
  /** Delay before moving to next flow in milliseconds */
  NEXT_FLOW_DELAY: 1000,
  /** Progress update interval in milliseconds */
  PROGRESS_INTERVAL: 40,
  /** Progress increment per update (percentage points) */
  PROGRESS_STEP: 2,
  /** Maximum progress value */
  PROGRESS_MAX: 100,
  /** Resize throttle delay in milliseconds */
  RESIZE_THROTTLE: 150,
} as const;

/**
 * Utility function to calculate arc node positions
 * @param index - Node index (0-4 for 5 regimes)
 * @param centerX - Arc center X coordinate
 * @param centerY - Arc center Y coordinate
 * @param radius - Arc radius
 * @returns Object with x and y coordinates
 */
export function calculateArcPosition(
  index: number,
  centerX: number,
  centerY: number,
  radius: number = ARC_CONFIG.RADIUS
): { x: number; y: number } {
  const startAngle = ARC_CONFIG.START_ANGLE;
  const angleStep = ARC_CONFIG.ANGLE_STEP;
  const angle = (startAngle - index * angleStep) * (Math.PI / 180);

  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

/**
 * Get layout configuration based on viewport
 * @param isMobile - Whether the viewport is mobile-sized
 * @returns Layout configuration object
 */
export function getLayoutConfig(isMobile: boolean) {
  return isMobile ? LAYOUT_CONFIG.MOBILE : LAYOUT_CONFIG.DESKTOP;
}
