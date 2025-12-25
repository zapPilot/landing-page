/**
 * Configuration for Use Case section
 * Separate from regimeVisualizerConfig to maintain domain separation
 */
export const USE_CASE_CONFIG = {
  animation: {
    /** Delay multiplier for staggered card animations (index * stagger) */
    cardStagger: 0.2,
    /** Delay for bottom message reveal animation */
    bottomMessageDelay: 0.6,
    /** Card slide-in duration (inherits from regime config by default) */
    slideDuration: 0.8,
  },
  layout: {
    /** Gap between use case cards */
    cardGap: {
      mobile: '2rem', // space-y-8
      desktop: '3rem', // lg:space-y-12
    },
  },
} as const;
