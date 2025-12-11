import { renderHook, act } from '@testing-library/react';
import { useResponsiveLayout } from '../useResponsiveLayout';

describe('useResponsiveLayout', () => {
  // Store original window.innerWidth
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // Reset window.innerWidth before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    // Restore original window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('should return false for desktop viewport by default', () => {
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe(false);
  });

  it('should return true for mobile viewport by default', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe(true);
  });

  it('should use custom breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 900,
    });

    const { result } = renderHook(() => useResponsiveLayout({ breakpoint: 1024 }));
    expect(result.current).toBe(true);
  });

  it('should update on window resize', async () => {
    const { result } = renderHook(() => useResponsiveLayout({ throttleDelay: 50 }));

    // Initially desktop
    expect(result.current).toBe(false);

    // Resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      window.dispatchEvent(new Event('resize'));
    });

    // Wait for throttle delay
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toBe(true);
  });

  it('should throttle resize events', async () => {
    const { result } = renderHook(() => useResponsiveLayout({ throttleDelay: 100 }));

    // Trigger multiple resize events rapidly
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
    });

    // Should still be desktop immediately after events
    expect(result.current).toBe(false);

    // Wait for throttle delay
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    // Should now be mobile
    expect(result.current).toBe(true);
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useResponsiveLayout());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
