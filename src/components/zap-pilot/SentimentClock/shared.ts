export interface Regime {
    id: string;
    label: string;
    range: string;
    allocation: string;
    color: string;
    fill: string;
    activeFill: string;
    actions: string[];
    philosophy: string;
}

export const REGIMES: Regime[] = [
    {
        id: 'ef',
        label: 'Extreme Fear',
        range: '0-25',
        allocation: '70% Crypto / 30% Stable',
        color: 'text-red-500',
        fill: '#ef4444', // red-500
        activeFill: '#dc2626', // red-600
        actions: [
            'DCA into BTC/ETH with stables',
            'Prioritize debt repayment if LTV rises',
            'No new leverage'
        ],
        philosophy: 'Value-buying BTC/ETH only. Rational greed during irrational fear.'
    },
    {
        id: 'f',
        label: 'Fear',
        range: '26-45',
        allocation: '60% Crypto / 40% Stable',
        color: 'text-orange-500',
        fill: '#f97316', // orange-500
        activeFill: '#ea580c', // orange-600
        actions: [
            'Small "probe entries" (light DCA)',
            'Partial LP deployment acting as "midway zone"',
            'Take profits on leverage if rates spike'
        ],
        philosophy: 'Half-step entries; prepare for possible "second leg down."'
    },
    {
        id: 'n',
        label: 'Neutral',
        range: '46-54',
        allocation: '50% Crypto / 50% Stable',
        color: 'text-yellow-500',
        fill: '#eab308', // yellow-500
        activeFill: '#ca8a04', // yellow-600
        actions: [
            '"Holiday mode": minimal activity',
            'Light rebalancing only',
            'Deleverage if borrowing rates hit threshold'
        ],
        philosophy: 'When the market is normal, inactivity is a valid strategy.'
    },
    {
        id: 'g',
        label: 'Greed',
        range: '55-75',
        allocation: '40% Crypto / 60% Stable',
        color: 'text-lime-500',
        fill: '#84cc16', // lime-500
        activeFill: '#65a30d', // lime-600
        actions: [
            'Shift spot BTC/ETH into BTC/ETH–USD LP',
            'Softly lock in gains',
            'Earn fees while retaining beta'
        ],
        philosophy: 'Not a full exit — a soft glide from "spot → LP → stables."'
    },
    {
        id: 'eg',
        label: 'Extreme Greed',
        range: '76-100',
        allocation: '30% Crypto / 70% Stable',
        color: 'text-green-500',
        fill: '#22c55e', // green-500
        activeFill: '#16a34a', // green-600
        actions: [
            'DCA-sell excess BTC/ETH into stables',
            'Move stables into conservative vaults',
            'Retain small "residual beta" only'
        ],
        philosophy: 'Shift from "how much more can I gain?" to "how much am I willing to lose?"'
    }
];
