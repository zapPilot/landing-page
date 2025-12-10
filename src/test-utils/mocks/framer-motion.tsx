/**
 * Shared framer-motion mock for component tests.
 * Import this in test files that need additional motion components beyond the global mock.
 *
 * Note: A global mock is already set up in jest.setup.js.
 * Use this file for test-specific overrides or additional components.
 */

import React, { ReactNode } from 'react';

type MotionProps = {
  children?: ReactNode;
  [key: string]: unknown;
};

/**
 * Creates a mock motion component that renders the underlying HTML element
 */
function createMotionComponent(element: string) {
  return function MotionComponent({ children, ...props }: MotionProps) {
    // Filter out framer-motion specific props
    const {
      initial,
      animate,
      exit,
      variants,
      transition,
      whileHover,
      whileTap,
      whileInView,
      whileFocus,
      whileDrag,
      viewport,
      layout,
      layoutId,
      drag,
      dragConstraints,
      dragElastic,
      onAnimationStart,
      onAnimationComplete,
      onDragStart,
      onDragEnd,
      onHoverStart,
      onHoverEnd,
      ...htmlProps
    } = props;

    return React.createElement(element, htmlProps, children);
  };
}

/**
 * Mock motion object with common HTML elements
 */
export const motion = {
  div: createMotionComponent('div'),
  span: createMotionComponent('span'),
  p: createMotionComponent('p'),
  a: createMotionComponent('a'),
  button: createMotionComponent('button'),
  ul: createMotionComponent('ul'),
  li: createMotionComponent('li'),
  nav: createMotionComponent('nav'),
  header: createMotionComponent('header'),
  footer: createMotionComponent('footer'),
  section: createMotionComponent('section'),
  article: createMotionComponent('article'),
  aside: createMotionComponent('aside'),
  main: createMotionComponent('main'),
  form: createMotionComponent('form'),
  input: createMotionComponent('input'),
  img: createMotionComponent('img'),
  svg: createMotionComponent('svg'),
  path: createMotionComponent('path'),
  circle: createMotionComponent('circle'),
  rect: createMotionComponent('rect'),
  line: createMotionComponent('line'),
  g: createMotionComponent('g'),
  text: createMotionComponent('text'),
};

/**
 * Mock AnimatePresence - just renders children
 */
export function AnimatePresence({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

/**
 * Mock useAnimation hook
 */
export function useAnimation() {
  return {
    start: jest.fn().mockResolvedValue(undefined),
    stop: jest.fn(),
    set: jest.fn(),
  };
}

/**
 * Mock useInView hook - always returns true in tests
 */
export function useInView() {
  return true;
}

/**
 * Mock useMotionValue hook
 */
export function useMotionValue<T>(initial: T) {
  return {
    get: () => initial,
    set: jest.fn(),
    onChange: jest.fn(() => () => {}),
    on: jest.fn(() => () => {}),
    destroy: jest.fn(),
  };
}

/**
 * Mock useTransform hook
 */
export function useTransform<T>(
  value: { get: () => T },
  _inputRange?: number[],
  _outputRange?: unknown[]
) {
  return value;
}

/**
 * Mock useSpring hook
 */
export function useSpring<T>(initial: T) {
  return useMotionValue(initial);
}

/**
 * Mock useScroll hook
 */
export function useScroll() {
  return {
    scrollX: useMotionValue(0),
    scrollY: useMotionValue(0),
    scrollXProgress: useMotionValue(0),
    scrollYProgress: useMotionValue(0),
  };
}

/**
 * Mock useReducedMotion hook
 */
export function useReducedMotion() {
  return false;
}

/**
 * Mock stagger function
 */
export function stagger(_duration?: number, _options?: unknown) {
  return 0;
}

/**
 * Full mock export for jest.mock()
 */
export const framerMotionMock = {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useReducedMotion,
  stagger,
};

export default framerMotionMock;
