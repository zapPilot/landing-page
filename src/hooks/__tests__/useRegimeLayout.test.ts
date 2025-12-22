import { renderHook } from '@testing-library/react';
import { useRegimeLayout } from '../useRegimeLayout';
import { REGIME_VISUALIZER_CONFIG } from '@/config/regimeVisualizerConfig';

describe('useRegimeLayout', () => {
  const { layout } = REGIME_VISUALIZER_CONFIG;

  it('should return desktop layout when not mobile', () => {
    const { result } = renderHook(() => useRegimeLayout(false, false));

    expect(result.current.viewBox).toBe(
      `0 0 ${layout.desktop.viewBoxWidth} ${layout.desktop.viewBoxHeight}`
    );
    expect(result.current.viewBoxWidth).toBe(layout.desktop.viewBoxWidth);
    expect(result.current.viewBoxHeight).toBe(layout.desktop.viewBoxHeight);
    expect(result.current.panelPosition).toEqual({
      x: layout.desktop.panelX,
      y: layout.desktop.panelY,
      width: layout.desktop.panelWidth,
      height: layout.desktop.panelHeight,
    });
    expect(result.current.arcGeometry).toEqual({
      centerX: layout.desktop.centerX,
      centerY: layout.desktop.arcCenterY,
      radius: layout.desktop.arcRadius,
    });
  });

  it('should return mobile layout when isMobile is true', () => {
    const { result } = renderHook(() => useRegimeLayout(true, false));

    expect(result.current.viewBox).toBe(
      `0 0 ${layout.mobile.viewBoxWidth} ${layout.mobile.viewBoxHeight}`
    );
    expect(result.current.viewBoxWidth).toBe(layout.mobile.viewBoxWidth);
    expect(result.current.viewBoxHeight).toBe(layout.mobile.viewBoxHeight);
    expect(result.current.panelPosition).toEqual({
      x: layout.mobile.panelX,
      y: layout.mobile.panelY,
      width: layout.mobile.panelWidth,
      height: layout.mobile.panelHeight,
    });
    expect(result.current.arcGeometry).toEqual({
      centerX: layout.mobile.centerX,
      centerY: layout.mobile.arcCenterY,
      radius: layout.mobile.arcRadius,
    });
  });

  it('should return smallMobile layout when isSmallMobile is true', () => {
    const { result } = renderHook(() => useRegimeLayout(true, true));

    expect(result.current.viewBox).toBe(
      `0 0 ${layout.smallMobile.viewBoxWidth} ${layout.smallMobile.viewBoxHeight}`
    );
    expect(result.current.viewBoxWidth).toBe(layout.smallMobile.viewBoxWidth);
    expect(result.current.viewBoxHeight).toBe(layout.smallMobile.viewBoxHeight);
    expect(result.current.panelPosition).toEqual({
      x: layout.smallMobile.panelX,
      y: layout.smallMobile.panelY,
      width: layout.smallMobile.panelWidth,
      height: layout.smallMobile.panelHeight,
    });
    expect(result.current.arcGeometry).toEqual({
      centerX: layout.smallMobile.centerX,
      centerY: layout.smallMobile.arcCenterY,
      radius: layout.smallMobile.arcRadius,
    });
  });

  it('should prioritize smallMobile over mobile', () => {
    // When both isMobile and isSmallMobile are true, smallMobile should take precedence
    const { result } = renderHook(() => useRegimeLayout(true, true));

    expect(result.current.viewBoxWidth).toBe(layout.smallMobile.viewBoxWidth);
    expect(result.current.viewBoxWidth).not.toBe(layout.mobile.viewBoxWidth);
  });

  it('should memoize layout based on dependencies', () => {
    const { result, rerender } = renderHook(
      ({ isMobile, isSmallMobile }) => useRegimeLayout(isMobile, isSmallMobile),
      { initialProps: { isMobile: false, isSmallMobile: false } }
    );

    const firstLayout = result.current;

    // Rerender with same props - should return same object reference
    rerender({ isMobile: false, isSmallMobile: false });
    expect(result.current).toBe(firstLayout);

    // Rerender with different props - should return new object
    rerender({ isMobile: true, isSmallMobile: false });
    expect(result.current).not.toBe(firstLayout);
    expect(result.current.viewBoxWidth).toBe(layout.mobile.viewBoxWidth);
  });

  it('should default isSmallMobile to false', () => {
    const { result } = renderHook(() => useRegimeLayout(true));

    // Should use mobile layout, not smallMobile
    expect(result.current.viewBoxWidth).toBe(layout.mobile.viewBoxWidth);
  });
});
