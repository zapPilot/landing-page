require('@testing-library/jest-dom');

// Mock window.matchMedia for responsive hooks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.gtag for analytics
Object.defineProperty(window, 'gtag', {
  writable: true,
  value: jest.fn(),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }) => {
    const React = require('react');
    return React.createElement('img', { alt: alt ?? '', ...props });
  },
}));

// Mock framer-motion globally
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: ({ children, ...props }) => React.createElement('div', props, children),
      span: ({ children, ...props }) => React.createElement('span', props, children),
      path: ({ children, ...props }) => React.createElement('path', props, children),
      circle: ({ children, ...props }) => React.createElement('circle', props, children),
      svg: ({ children, ...props }) => React.createElement('svg', props, children),
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
    }),
    useInView: () => true,
    useMotionValue: initial => ({
      get: () => initial,
      set: jest.fn(),
      onChange: jest.fn(),
    }),
    useTransform: (value, _input, _output) => value,
  };
});
