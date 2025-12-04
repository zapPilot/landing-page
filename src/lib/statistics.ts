// Shared statistics constants for Hero and CTA components

export type StatType = 'text' | 'icons';

export interface Stat {
  label: string;
  value?: string;
  type: StatType;
  icons?: Array<{
    src: string;
    alt: string;
    name: string;
  }>;
}

export const STATISTICS: Stat[] = [
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
];
