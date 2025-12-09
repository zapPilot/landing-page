import { useState, useEffect, useMemo, useCallback } from 'react';
import { getNetworkNodes, initialConnections, type Connection } from '@/data/networkNodes';
import { getCurrentIntentFlow, getIntentFlowsCount } from '@/data/intentFlows';

export function useNetworkGraph(isMobile: boolean) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentFlow, setCurrentFlow] = useState(0);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(-1);

  // Memoize nodes to prevent unnecessary re-renders
  const nodes = useMemo(() => getNetworkNodes(isMobile), [isMobile]);

  // Enhanced connections with strength and routing data
  const [connections, setConnections] = useState<Connection[]>(
    initialConnections.map(conn => ({ ...conn, animated: false }))
  );

  // Animate intent execution flows
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExecuting(true);
      setExecutionProgress(0);

      // Reset all connections
      setConnections(prev => prev.map(conn => ({ ...conn, animated: false })));

      // Start new flow animation
      setTimeout(() => {
        const currentFlowData = getCurrentIntentFlow(currentFlow);
        const progressInterval = setInterval(() => {
          setExecutionProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setIsExecuting(false);
              return 100;
            }
            return prev + 2;
          });
        }, 40);

        // Animate current flow path
        setConnections(prev =>
          prev.map(conn => {
            const isInPath = currentFlowData.path.some((node, index) => {
              const nextNode = currentFlowData.path[index + 1];
              return (
                nextNode &&
                ((conn.from === node && conn.to === nextNode) ||
                  (conn.from === nextNode && conn.to === node))
              );
            });
            return {
              ...conn,
              animated: isInPath,
              strength: isInPath ? 1 : conn.strength,
            };
          })
        );

        // Move to next flow
        setTimeout(() => {
          setCurrentFlow(prev => (prev + 1) % getIntentFlowsCount());
        }, 1000);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentFlow]);

  const getNodePosition = useCallback(
    (nodeId: string) => {
      const node = nodes.find(n => n.id === nodeId);
      return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
    },
    [nodes]
  );

  const currentFlowData = useMemo(() => getCurrentIntentFlow(currentFlow), [currentFlow]);

  return {
    nodes,
    connections,
    activeNode,
    setActiveNode,
    focusedNodeIndex,
    setFocusedNodeIndex,
    currentFlowData,
    isExecuting,
    executionProgress,
    getNodePosition,
  };
}
