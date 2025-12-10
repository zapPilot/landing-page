/**
 * Next.js router mock for testing components that use navigation.
 * Compatible with Next.js 13+ App Router.
 */

/**
 * Mock router object with common properties and methods
 */
export const mockRouter = {
  // App Router properties
  push: jest.fn().mockResolvedValue(true),
  replace: jest.fn().mockResolvedValue(true),
  prefetch: jest.fn().mockResolvedValue(undefined),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),

  // Current route state
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  basePath: '',
  locale: undefined,
  locales: undefined,
  defaultLocale: undefined,
  isReady: true,
  isPreview: false,
  isFallback: false,

  // Events (Pages Router compatibility)
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },

  // Legacy methods
  beforePopState: jest.fn(),
};

/**
 * Mock useRouter hook
 */
export function useRouter() {
  return mockRouter;
}

/**
 * Mock usePathname hook (App Router)
 */
export function usePathname() {
  return mockRouter.pathname;
}

/**
 * Mock useSearchParams hook (App Router)
 */
export function useSearchParams() {
  return new URLSearchParams();
}

/**
 * Mock useParams hook (App Router)
 */
export function useParams() {
  return {};
}

/**
 * Mock useSelectedLayoutSegment hook (App Router)
 */
export function useSelectedLayoutSegment() {
  return null;
}

/**
 * Mock useSelectedLayoutSegments hook (App Router)
 */
export function useSelectedLayoutSegments() {
  return [];
}

/**
 * Reset all router mocks - call in beforeEach or afterEach
 */
export function resetRouterMocks() {
  mockRouter.push.mockClear();
  mockRouter.replace.mockClear();
  mockRouter.prefetch.mockClear();
  mockRouter.back.mockClear();
  mockRouter.forward.mockClear();
  mockRouter.refresh.mockClear();
  mockRouter.events.on.mockClear();
  mockRouter.events.off.mockClear();
  mockRouter.events.emit.mockClear();
  mockRouter.beforePopState.mockClear();
}

/**
 * Create mock for next/navigation module
 * Use with jest.mock('next/navigation', () => nextNavigationMock)
 */
export const nextNavigationMock = {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
  redirect: jest.fn(),
  notFound: jest.fn(),
};

/**
 * Create mock for next/router module (Pages Router compatibility)
 * Use with jest.mock('next/router', () => nextRouterMock)
 */
export const nextRouterMock = {
  useRouter,
  withRouter: (Component: React.ComponentType) => Component,
  Router: {
    ...mockRouter,
    router: mockRouter,
  },
};

export default {
  mockRouter,
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
  resetRouterMocks,
  nextNavigationMock,
  nextRouterMock,
};
