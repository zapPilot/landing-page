export interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'protocol' | 'chain' | 'user' | 'intent';
  color: string;
  size: number;
  icon?: string;
  apy?: string;
  tvl?: string;
  status?: string;
}

export interface ResponsiveNodeConfig {
  desktop: { x: number; y: number; size: number };
  mobile: { x: number; y: number; size: number };
}

interface BaseNodeData {
  id: string;
  label: string;
  type: 'protocol' | 'chain' | 'user' | 'intent';
  color: string;
  icon?: string;
  apy?: string;
  tvl?: string;
  status?: string;
  responsive: ResponsiveNodeConfig;
}

// Network node base data with responsive configurations
const networkNodeData: BaseNodeData[] = [
  // User/Portfolio Intent node (center)
  {
    id: 'user',
    label: 'Portfolio Intent',
    type: 'intent',
    color: '#8B5CF6',
    icon: '💼',
    responsive: {
      desktop: { x: 300, y: 250, size: 70 },
      mobile: { x: 200, y: 200, size: 50 }
    }
  },
  
  // DeFi Protocol nodes
  {
    id: 'uniswap',
    label: 'Uniswap V3',
    type: 'protocol',
    color: '#FF007A',
    icon: '🦄',
    apy: '18.4%',
    tvl: '$3.2B',
    status: 'active',
    responsive: {
      desktop: { x: 150, y: 150, size: 45 },
      mobile: { x: 100, y: 120, size: 32 }
    }
  },
  {
    id: 'aave',
    label: 'Aave V3',
    type: 'protocol',
    color: '#B6509E',
    icon: '👻',
    apy: '5.8%',
    tvl: '$5.1B',
    status: 'active',
    responsive: {
      desktop: { x: 450, y: 150, size: 45 },
      mobile: { x: 300, y: 120, size: 32 }
    }
  },
  {
    id: 'compound',
    label: 'Compound',
    type: 'protocol',
    color: '#00D395',
    icon: '🏛️',
    apy: '4.2%',
    tvl: '$1.8B',
    status: 'active',
    responsive: {
      desktop: { x: 150, y: 350, size: 40 },
      mobile: { x: 100, y: 280, size: 28 }
    }
  },
  {
    id: 'curve',
    label: 'Curve',
    type: 'protocol',
    color: '#FD0D2C',
    icon: '📈',
    apy: '12.1%',
    tvl: '$2.9B',
    status: 'active',
    responsive: {
      desktop: { x: 450, y: 350, size: 42 },
      mobile: { x: 300, y: 280, size: 30 }
    }
  },
  {
    id: 'morpho',
    label: 'Morpho',
    type: 'protocol',
    color: '#00C4FF',
    icon: '🔷',
    apy: '8.9%',
    tvl: '$890M',
    status: 'active',
    responsive: {
      desktop: { x: 100, y: 250, size: 35 },
      mobile: { x: 60, y: 200, size: 25 }
    }
  },
  
  // Chain nodes
  {
    id: 'ethereum',
    label: 'Ethereum',
    type: 'chain',
    color: '#627EEA',
    icon: 'Ξ',
    status: 'mainnet',
    responsive: {
      desktop: { x: 200, y: 100, size: 38 },
      mobile: { x: 150, y: 80, size: 28 }
    }
  },
  {
    id: 'polygon',
    label: 'Polygon',
    type: 'chain',
    color: '#8247E5',
    icon: '⬟',
    status: 'l2',
    responsive: {
      desktop: { x: 500, y: 250, size: 36 },
      mobile: { x: 340, y: 200, size: 26 }
    }
  },
  {
    id: 'arbitrum',
    label: 'Arbitrum',
    type: 'chain',
    color: '#213147',
    icon: '🔷',
    status: 'l2',
    responsive: {
      desktop: { x: 350, y: 100, size: 36 },
      mobile: { x: 250, y: 80, size: 26 }
    }
  },
  {
    id: 'base',
    label: 'Base',
    type: 'chain',
    color: '#0052FF',
    icon: '🔵',
    status: 'l2',
    responsive: {
      desktop: { x: 400, y: 400, size: 34 },
      mobile: { x: 270, y: 320, size: 24 }
    }
  }
];

/**
 * Generate responsive network nodes based on screen size
 * @param isMobile - Whether to use mobile layout
 * @returns Array of Node objects with proper positioning and sizing
 */
export function getNetworkNodes(isMobile: boolean): Node[] {
  return networkNodeData.map(nodeData => {
    const config = isMobile ? nodeData.responsive.mobile : nodeData.responsive.desktop;
    
    return {
      id: nodeData.id,
      x: config.x,
      y: config.y,
      label: nodeData.label,
      type: nodeData.type,
      color: nodeData.color,
      size: config.size,
      icon: nodeData.icon,
      apy: nodeData.apy,
      tvl: nodeData.tvl,
      status: nodeData.status
    };
  });
}

// Connection data for the network graph
export interface Connection {
  from: string;
  to: string;
  animated: boolean;
  color: string;
  strength: number;
}

export const initialConnections: Omit<Connection, 'animated'>[] = [
  { from: 'user', to: 'uniswap', color: '#8B5CF6', strength: 0.8 },
  { from: 'user', to: 'aave', color: '#8B5CF6', strength: 0.9 },
  { from: 'user', to: 'compound', color: '#8B5CF6', strength: 0.6 },
  { from: 'user', to: 'curve', color: '#8B5CF6', strength: 0.7 },
  { from: 'user', to: 'morpho', color: '#8B5CF6', strength: 0.5 },
  { from: 'uniswap', to: 'ethereum', color: '#627EEA', strength: 0.9 },
  { from: 'aave', to: 'polygon', color: '#8247E5', strength: 0.8 },
  { from: 'compound', to: 'arbitrum', color: '#213147', strength: 0.7 },
  { from: 'curve', to: 'base', color: '#0052FF', strength: 0.6 },
  { from: 'morpho', to: 'ethereum', color: '#627EEA', strength: 0.5 }
];