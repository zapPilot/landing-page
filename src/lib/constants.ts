export const ANIMATIONS = {
  // Common button animations
  buttonHover: { scale: 1.05, y: -2 },
  buttonTap: { scale: 0.95 },

  // Common card animations
  cardHover: { scale: 1.03, y: -5 },
  cardHoverSubtle: { scale: 1.02, y: -2 },

  // Fade animations
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },

  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },

  // Common transitions
  spring: { duration: 0.8 },
  stagger: { staggerChildren: 0.2, delayChildren: 0.3 },
} as const;

export const GRADIENTS = {
  // Background gradients
  primary: 'from-purple-600 to-blue-600',
  secondary: 'from-blue-500 to-cyan-600',
  accent: 'from-green-500 to-emerald-600',
  warning: 'from-orange-500 to-red-600',

  // Text gradients
  text: 'from-purple-400 to-blue-400',
  textVibrant: 'from-purple-400 via-pink-400 to-blue-400',

  // Feature card gradients
  feature1: 'from-purple-500 to-violet-600',
  feature2: 'from-blue-500 to-cyan-600',
  feature3: 'from-green-500 to-emerald-600',
  feature4: 'from-orange-500 to-red-600',
} as const;

export const STYLES = {
  // Glass morphism effects
  glass: 'bg-gray-900/50 backdrop-blur-lg border border-gray-800',
  glassHover: 'hover:border-gray-700 transition-all duration-300',

  // Card styles
  card: 'rounded-3xl p-8 relative overflow-hidden',
  cardSmall: 'rounded-2xl p-6 relative overflow-hidden',

  // Text styles
  heading: 'text-4xl sm:text-5xl font-bold mb-6',
  subheading: 'text-xl text-gray-300 max-w-3xl mx-auto',

  // Button base styles
  buttonBase: 'px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300',
  buttonPrimary: 'text-white hover:shadow-purple-500/25',
  buttonSecondary: 'border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white',
} as const;

export const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: ANIMATIONS.stagger,
  },
} as const;

export const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
} as const;

// Allocation visualization constants
export const ALLOCATION_COLORS = {
  spot: {
    from: 'from-orange-600',
    to: 'to-orange-500',
    text: 'text-orange-400',
    bg: 'bg-orange-500',
  },
  lp: {
    from: 'from-purple-600',
    to: 'to-purple-500',
    text: 'text-purple-400',
    bg: 'bg-purple-500',
  },
  stable: {
    from: 'from-blue-600',
    to: 'to-blue-500',
    text: 'text-blue-400',
    bg: 'bg-blue-500',
  },
} as const;

export const ALLOCATION_ANIMATIONS = {
  barFill: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
  stagger: { staggerChildren: 0.1, delayChildren: 0.2 },
} as const;
