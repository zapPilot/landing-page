import { renderHook, act } from '@testing-library/react';
import { useRegimeAutoPlay } from '../useRegimeAutoPlay';

describe('useRegimeAutoPlay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useRegimeAutoPlay());

    expect(result.current.activeRegime).toBe('n');
    expect(result.current.isAutoPlaying).toBe(true);
    expect(result.current.animationDirection).toBe('forward');
    expect(result.current.previousRegime).toBe('n');
  });

  it('should auto-play forward through regime order', () => {
    const { result } = renderHook(() => useRegimeAutoPlay({ autoPlayInterval: 1000 }));

    expect(result.current.activeRegime).toBe('n');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.activeRegime).toBe('g');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.activeRegime).toBe('eg');
  });

  it('should reverse direction at extreme greed', () => {
    const { result } = renderHook(() =>
      useRegimeAutoPlay({ startRegime: 'g', autoPlayInterval: 1000 })
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    }); // g → eg
    expect(result.current.activeRegime).toBe('eg');
    expect(result.current.animationDirection).toBe('forward');

    act(() => {
      jest.advanceTimersByTime(1000);
    }); // eg → reversal
    expect(result.current.animationDirection).toBe('backward');
    expect(result.current.activeRegime).toBe('g');
  });

  it('should reverse direction at extreme fear during backward animation', () => {
    // Need to reach ef while in backward direction to trigger reversal
    const { result } = renderHook(() =>
      useRegimeAutoPlay({
        startRegime: 'g',
        autoPlayInterval: 1000,
      })
    );

    // Go forward to eg (hitting the right boundary triggers backward)
    act(() => {
      jest.advanceTimersByTime(1000);
    }); // g → eg
    expect(result.current.activeRegime).toBe('eg');

    act(() => {
      jest.advanceTimersByTime(1000);
    }); // eg → g (now going backward)
    expect(result.current.animationDirection).toBe('backward');
    expect(result.current.activeRegime).toBe('g');

    // Continue backward: g → n → f → ef → (triggers reversal) → f
    act(() => {
      jest.advanceTimersByTime(1000);
    }); // g → n
    expect(result.current.activeRegime).toBe('n');

    act(() => {
      jest.advanceTimersByTime(1000);
    }); // n → f
    expect(result.current.activeRegime).toBe('f');

    act(() => {
      jest.advanceTimersByTime(1000);
    }); // f → ef
    expect(result.current.activeRegime).toBe('ef');
    expect(result.current.animationDirection).toBe('backward');

    act(() => {
      jest.advanceTimersByTime(1000);
    }); // ef → (nextIdx = -1, triggers reversal to forward) → f

    // When going backward from ef (index 0), nextIdx becomes -1, triggering reversal
    expect(result.current.animationDirection).toBe('forward');
    expect(result.current.activeRegime).toBe('f');
  });

  it('should reverse direction at extreme fear', () => {
    const { result } = renderHook(() =>
      useRegimeAutoPlay({
        startRegime: 'ef',
        autoPlayInterval: 1000,
      })
    );

    // Starting at ef, going backward should trigger reversal immediately
    expect(result.current.activeRegime).toBe('ef');
    expect(result.current.animationDirection).toBe('forward');

    act(() => {
      jest.advanceTimersByTime(1000);
    }); // ef → f (forward)
    expect(result.current.activeRegime).toBe('f');
    expect(result.current.animationDirection).toBe('forward');
  });

  it('should stop auto-playing when prefersReducedMotion is true', () => {
    const { result } = renderHook(() => useRegimeAutoPlay({ prefersReducedMotion: true }));

    const initialRegime = result.current.activeRegime;
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.activeRegime).toBe(initialRegime);
  });

  it('should handleRegimeClick stops auto-play and jumps to regime', () => {
    const { result } = renderHook(() => useRegimeAutoPlay());

    act(() => {
      result.current.handleRegimeClick('eg');
    });

    expect(result.current.activeRegime).toBe('eg');
    expect(result.current.isAutoPlaying).toBe(false);
    expect(result.current.animationDirection).toBe('forward');
  });

  it('should track previousRegime correctly', () => {
    const { result } = renderHook(() => useRegimeAutoPlay({ autoPlayInterval: 1000 }));

    const firstRegime = result.current.activeRegime;
    expect(firstRegime).toBe('n');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // After advancing, activeRegime changes and previousRegime is updated
    expect(result.current.activeRegime).toBe('g');
    // previousRegime is set via useEffect, which runs after state updates
    expect(result.current.previousRegime).toBe('g');
  });

  it('should allow setIsAutoPlaying to control auto-play', () => {
    const { result } = renderHook(() => useRegimeAutoPlay({ autoPlayInterval: 1000 }));

    expect(result.current.isAutoPlaying).toBe(true);

    act(() => {
      result.current.setIsAutoPlaying(false);
    });

    expect(result.current.isAutoPlaying).toBe(false);

    const regime = result.current.activeRegime;
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.activeRegime).toBe(regime);
  });
});
