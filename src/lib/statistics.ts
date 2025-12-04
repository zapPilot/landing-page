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
  {
    label: 'Integrated Protocols',
    type: 'icons',
    icons: [
      { src: '/protocols/morpho-blue.webp', alt: 'Morpho Blue', name: 'Morpho' },
      { src: '/protocols/gmx-v2.webp', alt: 'GMX v2', name: 'GMX' },
      { src: '/protocols/hyperdrive.webp', alt: 'Hyperdrive', name: 'Hyperdrive' },
      { src: '/protocols/apollodao.webp', alt: 'ApolloDAO', name: 'Apollo' },
    ],
  },
];
