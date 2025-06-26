export interface IntentFlow {
  id: string;
  name: string;
  userIntent: string;
  path: string[];
  value: string;
  apy: string;
  executionTime: string;
  gasOptimized: string;
  status: 'executing' | 'completed' | 'optimizing';
  steps: string[];
}

// Portfolio-based intent execution flows data
export const intentFlows: IntentFlow[] = [
  {
    id: 'multi-chain-diversification',
    name: 'Multi-Chain Stablecoin Portfolio',
    userIntent: '"Diversify my stablecoins across multiple chains and pools"',
    path: ['user', 'aave', 'polygon'],
    value: '$25,000',
    apy: '9.8%',
    executionTime: '1.4s',
    gasOptimized: '78%',
    status: 'executing',
    steps: [
      'Analyzing optimal chain allocation',
      'Splitting funds across Polygon, Arbitrum, Base',
      'Deploying to highest-yield stable pools',
      'Setting up cross-chain rebalancing',
    ],
  },
  {
    id: 'crypto-index-fund',
    name: 'Crypto Index Fund + Liquidity Mining',
    userIntent: '"Create a crypto index fund with liquidity mining rewards"',
    path: ['user', 'uniswap', 'ethereum'],
    value: '$50,000',
    apy: '14.2%',
    executionTime: '2.1s',
    gasOptimized: '65%',
    status: 'completed',
    steps: [
      'Building diversified crypto portfolio',
      'Allocating to top 10 assets by market cap',
      'Adding liquidity to high-yield pairs',
      'Optimizing for farming rewards',
    ],
  },
  {
    id: 'custom-portfolio',
    name: 'Custom Portfolio Strategy',
    userIntent: '"Build my own portfolio with specific chains and pools"',
    path: ['user', 'curve', 'base'],
    value: '$35,750',
    apy: '11.6%',
    executionTime: '1.8s',
    gasOptimized: '82%',
    status: 'optimizing',
    steps: [
      'Processing custom allocation preferences',
      'Selecting Ethereum, Base, and Arbitrum',
      'Deploying to chosen DeFi protocols',
      'Implementing automated rebalancing',
    ],
  },
  {
    id: 'yield-portfolio',
    name: 'High-Yield Portfolio Optimization',
    userIntent: '"Maximize yields across my entire portfolio automatically"',
    path: ['user', 'morpho', 'ethereum'],
    value: '$42,500',
    apy: '13.7%',
    executionTime: '1.6s',
    gasOptimized: '73%',
    status: 'executing',
    steps: [
      'Scanning all available yield opportunities',
      'Optimizing allocation across protocols',
      'Implementing dynamic yield farming',
      'Setting up automated compounding',
    ],
  },
];

/**
 * Get current intent flow data by index
 * @param currentFlow - Index of the current flow
 * @returns The intent flow data at the given index
 */
export function getCurrentIntentFlow(currentFlow: number): IntentFlow {
  return intentFlows[currentFlow % intentFlows.length];
}

/**
 * Get the total number of intent flows
 * @returns Number of available intent flows
 */
export function getIntentFlowsCount(): number {
  return intentFlows.length;
}
