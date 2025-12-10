/**
 * Visualization configuration constants
 * Network graph animation timing used by useNetworkGraph hook
 */

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
