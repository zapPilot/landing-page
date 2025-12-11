import { motion } from 'framer-motion';

interface FloatingOrbProps {
  /**
   * Size of the orb (width and height)
   */
  size?: number;
  /**
   * Position class (e.g., 'top-20 left-20')
   */
  position: string;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Vertical movement range in pixels
   */
  yRange?: number;
  /**
   * Scale variation
   */
  scaleRange?: [number, number];
  /**
   * Opacity of the orb
   */
  opacity?: number;
}

/**
 * Floating orb animation component for decorative backgrounds
 */
export function FloatingOrb({
  size = 128,
  position,
  duration = 6,
  delay = 0,
  yRange = 20,
  scaleRange = [1, 1.1],
  opacity = 0.1,
}: FloatingOrbProps) {
  return (
    <motion.div
      className={`absolute ${position} rounded-full blur-xl bg-white pointer-events-none`}
      style={{
        width: size,
        height: size,
        opacity,
      }}
      animate={{
        y: [0, -yRange, 0],
        scale: [scaleRange[0], scaleRange[1], scaleRange[0]],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}
