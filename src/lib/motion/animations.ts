/**
 * Reusable Framer Motion animation presets
 * Eliminates duplication of motion props across components
 */

// Standard button hover effects
export const scaleOnHover = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.95 },
} as const;

/**
 * Creates a staggered fade-in animation
 * @param delay - Base delay in seconds
 * @returns Animation props with staggered timing
 */
export function fadeInUpStaggered(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true },
  } as const;
}

/**
 * Generic reveal preset that can be reused to avoid duplicated motion blocks.
 */
export function revealOnView({
  delay = 0,
  duration = 0.8,
  offsetY = 30,
}: {
  delay?: number;
  duration?: number;
  offsetY?: number;
} = {}) {
  return {
    initial: { opacity: 0, y: offsetY },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration, delay },
    viewport: { once: true },
  } as const;
}
