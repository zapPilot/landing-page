/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
        },
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(framer-motion|lucide-react)/)'],

  // Coverage configuration
  collectCoverage: false, // Enable via --coverage flag
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/app/**', // Next.js app router files (mostly routing)
    '!src/types/**', // Type definitions
    '!src/**/index.ts', // Barrel exports
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 55,
      functions: 60,
      lines: 60,
    },
    // Critical business logic - higher thresholds
    './src/lib/regimeUtils.ts': {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90,
    },
    './src/lib/regimeTransformers.ts': {
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85,
    },
    './src/types/regime.types.ts': {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90,
    },
  },
};

module.exports = config;
