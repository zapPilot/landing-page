/**
 * Test utilities barrel export
 * Import from '@/test-utils' for all testing helpers
 */

// Custom render with providers
export * from './render';

// Mocks - import individually as needed
export * from './mocks/next-router';

// Re-export common testing utilities
export { waitFor, within, screen } from '@testing-library/react';
