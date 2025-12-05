// LP Pool statistics - alternative version with LP pairs
// This is a variation showing LP pools instead of just core assets

import { type Stat } from './statistics';

export const LP_STATISTICS: Stat[] = [
  {
    label: 'Total Value Locked',
    value: '$261k+',
    type: 'text',
  },
  {
    label: 'Market Regimes Monitored',
    value: '5',
    type: 'text',
  },
  {
    label: 'Core Assets',
    type: 'icons',
    icons: [
      { src: '/btc.webp', alt: 'Bitcoin', name: 'BTC' },
      { src: '/eth.webp', alt: 'Ethereum', name: 'ETH' },
      { src: '/usdc.webp', alt: 'USDC', name: 'USDC' },
    ],
  },
  {
    label: 'Active LP Pairs',
    type: 'icons',
    icons: [
      { src: '/btc.webp', alt: 'BTC-USDC LP', name: 'BTC-USDC' },
      { src: '/eth.webp', alt: 'ETH-USDC LP', name: 'ETH-USDC' },
    ],
  },
];
