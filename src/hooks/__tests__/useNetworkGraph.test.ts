import { renderHook, act } from '@testing-library/react';
import { useNetworkGraph } from '../useNetworkGraph';

// Mock the data modules
jest.mock('@/data/networkNodes', () => ({
  getNetworkNodes: jest.fn((isMobile: boolean) => [
    {
      id: 'user',
      x: isMobile ? 200 : 300,
      y: isMobile ? 200 : 250,
      label: 'Portfolio Intent',
      type: 'intent',
      color: '#8B5CF6',
      size: isMobile ? 50 : 70,
    },
    {
      id: 'uniswap',
      x: isMobile ? 100 : 150,
      y: isMobile ? 120 : 150,
      label: 'Uniswap V3',
      type: 'protocol',
      color: '#FF007A',
      size: isMobile ? 32 : 45,
    },
  ]),
  initialConnections: [{ from: 'user', to: 'uniswap', color: '#8B5CF6', strength: 0.8 }],
}));

jest.mock('@/data/intentFlows', () => ({
  getCurrentIntentFlow: jest.fn((index: number) => ({
    id: 'flow-' + index,
    name: 'Test Flow ' + index,
    path: ['user', 'uniswap'],
    description: 'Test flow description',
  })),
  getIntentFlowsCount: jest.fn(() => 3),
}));

describe('useNetworkGraph', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with null active node', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(result.current.activeNode).toBeNull();
    });

    it('should initialize with nodes based on isMobile', () => {
      const { result: desktopResult } = renderHook(() => useNetworkGraph(false));
      const { result: mobileResult } = renderHook(() => useNetworkGraph(true));

      // Desktop nodes should have desktop positions
      expect(desktopResult.current.nodes[0].x).toBe(300);
      expect(desktopResult.current.nodes[0].size).toBe(70);

      // Mobile nodes should have mobile positions
      expect(mobileResult.current.nodes[0].x).toBe(200);
      expect(mobileResult.current.nodes[0].size).toBe(50);
    });

    it('should initialize connections with animated set to false', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      result.current.connections.forEach(conn => {
        expect(conn.animated).toBe(false);
      });
    });

    it('should initialize focusedNodeIndex to -1', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(result.current.focusedNodeIndex).toBe(-1);
    });

    it('should initialize isExecuting to false', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(result.current.isExecuting).toBe(false);
    });

    it('should initialize executionProgress to 0', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(result.current.executionProgress).toBe(0);
    });
  });

  describe('setActiveNode', () => {
    it('should update activeNode when called', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      act(() => {
        result.current.setActiveNode('uniswap');
      });

      expect(result.current.activeNode).toBe('uniswap');
    });

    it('should set activeNode to null when called with null', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      act(() => {
        result.current.setActiveNode('uniswap');
      });
      expect(result.current.activeNode).toBe('uniswap');

      act(() => {
        result.current.setActiveNode(null);
      });
      expect(result.current.activeNode).toBeNull();
    });
  });

  describe('setFocusedNodeIndex', () => {
    it('should update focusedNodeIndex when called', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      act(() => {
        result.current.setFocusedNodeIndex(1);
      });

      expect(result.current.focusedNodeIndex).toBe(1);
    });

    it('should accept callback function', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      act(() => {
        result.current.setFocusedNodeIndex(0);
      });

      act(() => {
        result.current.setFocusedNodeIndex(prev => prev + 1);
      });

      expect(result.current.focusedNodeIndex).toBe(1);
    });
  });

  describe('getNodePosition', () => {
    it('should return correct position for existing node', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      const position = result.current.getNodePosition('user');

      expect(position).toEqual({ x: 300, y: 250 });
    });

    it('should return { x: 0, y: 0 } for non-existing node', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      const position = result.current.getNodePosition('non-existing');

      expect(position).toEqual({ x: 0, y: 0 });
    });

    it('should return mobile position when isMobile is true', () => {
      const { result } = renderHook(() => useNetworkGraph(true));

      const position = result.current.getNodePosition('user');

      expect(position).toEqual({ x: 200, y: 200 });
    });
  });

  describe('currentFlowData', () => {
    it('should return current flow data', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(result.current.currentFlowData).toEqual({
        id: 'flow-0',
        name: 'Test Flow 0',
        path: ['user', 'uniswap'],
        description: 'Test flow description',
      });
    });
  });

  describe('auto-play animation', () => {
    it('should start execution after interval', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(result.current.isExecuting).toBe(false);

      act(() => {
        jest.advanceTimersByTime(4000);
      });

      expect(result.current.isExecuting).toBe(true);
    });

    it('should reset execution progress when new flow starts', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      // Start a flow
      act(() => {
        jest.advanceTimersByTime(4000);
      });

      // Progress should reset to 0 when starting
      expect(result.current.executionProgress).toBe(0);
    });

    it('should animate connections in the current flow path', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      // Start a flow
      act(() => {
        jest.advanceTimersByTime(4000);
      });

      // After animation starts (500ms delay)
      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Connections in the flow path should be animated
      const animatedConnections = result.current.connections.filter(c => c.animated);
      expect(animatedConnections.length).toBeGreaterThan(0);
    });
  });

  describe('memoization', () => {
    it('should memoize nodes based on isMobile', () => {
      const { result, rerender } = renderHook(({ isMobile }) => useNetworkGraph(isMobile), {
        initialProps: { isMobile: false },
      });

      const initialNodes = result.current.nodes;

      // Rerender with same props - should keep same reference
      rerender({ isMobile: false });
      expect(result.current.nodes).toBe(initialNodes);

      // Rerender with different props - should update
      rerender({ isMobile: true });
      expect(result.current.nodes).not.toBe(initialNodes);
      expect(result.current.nodes[0].x).toBe(200); // Mobile position
    });
  });

  describe('returned interface', () => {
    it('should return all expected properties', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(result.current).toHaveProperty('nodes');
      expect(result.current).toHaveProperty('connections');
      expect(result.current).toHaveProperty('activeNode');
      expect(result.current).toHaveProperty('setActiveNode');
      expect(result.current).toHaveProperty('focusedNodeIndex');
      expect(result.current).toHaveProperty('setFocusedNodeIndex');
      expect(result.current).toHaveProperty('currentFlowData');
      expect(result.current).toHaveProperty('isExecuting');
      expect(result.current).toHaveProperty('executionProgress');
      expect(result.current).toHaveProperty('getNodePosition');
    });

    it('should return nodes as an array', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(Array.isArray(result.current.nodes)).toBe(true);
      expect(result.current.nodes.length).toBe(2);
    });

    it('should return connections as an array', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(Array.isArray(result.current.connections)).toBe(true);
      expect(result.current.connections.length).toBe(1);
    });

    it('should return setActiveNode as a function', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(typeof result.current.setActiveNode).toBe('function');
    });

    it('should return getNodePosition as a function', () => {
      const { result } = renderHook(() => useNetworkGraph(false));

      expect(typeof result.current.getNodePosition).toBe('function');
    });
  });
});
