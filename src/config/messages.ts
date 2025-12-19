export const MESSAGES = {
  // Primary slogans
  slogans: {
    primary: 'Your Portfolio. Guided by Market Sentiment',
    primaryLine1: 'Your Portfolio.',
    primaryLine2: 'Guided by Market Sentiment.',
    philosophy: 'Buy in fear. Defend in greed.',
    philosophyDescription:
      'A disciplined, sentiment-based strategy designed to help you allocate smarter, avoid extremes, and grow long-term BTC/ETH holdings with confidence.',
  },

  // Hero section
  hero: {
    badge: '📊 Sentiment-Driven Rebalancing',
    subtitle: 'Sentiment-driven rebalancing for BTC & ETH — fully self-custodial.',
    ctaPrimary: 'Connect Wallet',
    ctaSecondary: 'Watch Demo',
  },

  // Features section
  features: {
    title: 'Why Zap Pilot?',
    subtitle: "Built for the future of DeFi, designed for today's users",
    items: [
      {
        title: 'Sentiment-Driven Intelligence',
        description:
          'Monitors the Fear & Greed Index 24/7 and only suggests rebalancing when market emotions reach extremes — helping you buy fear and sell greed.',
      },
      {
        title: 'Self-Custodial. Always.',
        description:
          'Every token stays in your wallet. Zap Pilot generates optimized rebalancing routes — you sign every transaction. No custody, no compromise.',
      },
      {
        title: 'Gradual, Disciplined Execution',
        description:
          'Rebalancing adapts to market intensity. Calendar-guided execution prevents panic selling and ensures disciplined DCA over 5-10 days.',
      },
      {
        title: 'Transparent & Backtestable',
        description:
          'All parameters are visible and adjustable. Regime thresholds, allocation targets, execution pace — everything is designed to be backtested and optimized.',
      },
    ],
  },

  // How It Works section
  howItWorks: {
    title: 'How It Works',
    subtitle: 'Three simple steps to sentiment-driven rebalancing',
    steps: [
      {
        number: 1,
        icon: 'Settings' as const,
        title: 'Define Strategy',
        description:
          'Set your target allocations. Zap Pilot calculates the optimal rebalancing route.',
        color: 'from-purple-500 to-violet-600',
      },
      {
        number: 2,
        icon: 'Calendar' as const,
        title: 'Smart Calendar Sync',
        description: 'Zap Pilot adds execute links to your calendar when market regimes shift.',
        color: 'from-blue-500 to-cyan-600',
      },
      {
        number: 3,
        icon: 'Shield' as const,
        title: 'Review & Sign',
        description:
          "When it's time to rebalance, click the link in your calendar — review the route and sign directly from your wallet.",
        color: 'from-green-500 to-emerald-600',
      },
    ],
  },

  // CTA section
  cta: {
    title: 'Ready for Disciplined,',
    titleSecondLine: 'Sentiment-Driven DeFi?',
    subtitle: 'Join investors who rebalance based on market extremes — not impulsive emotions',
    ctaPrimary: 'Launch Zap Pilot',
    ctaSecondary: 'Read Documentation',
  },

  // Footer section
  footer: {
    brand: {
      description:
        'Sentiment-driven rebalancing for BTC/ETH investors. Disciplined, gradual, and always self-custodial.',
    },
    newsletter: {
      title: 'Stay Updated',
      description: 'Get the latest updates on new features and DeFi insights.',
      buttonText: 'Subscribe',
      disclaimer: 'No spam, unsubscribe at any time.',
    },
    copyright: '© 2024 Zap Pilot. All rights reserved.',
    builtWith: 'Built with ❤️ for DeFi',
  },

  // Core value propositions (reusable)
  values: {
    selfCustody: 'Your keys, your crypto, always',
    sentimentDriven: 'Fear & Greed Index guides allocation',
    manualSigning: 'Every transaction requires your manual signature',
    gradualExecution: '5-10 days with daily limits (1-3%)',
    notAFund: 'NOT a fund. Strategy suggestions only.',
  },

  // Protocols section
  protocols: {
    title: 'Integrated Protocols',
    subtitle: 'Best-in-class DeFi protocols powering your rebalancing strategy',
    items: [
      {
        name: 'Morpho',
        category: 'Lending',
        description:
          'Optimized lending vaults with curated risk profiles. Earn yield on idle stablecoins with transparent, audited strategies.',
        logo: '/protocols/morpho.webp',
        link: 'https://morpho.org',
      },
      {
        name: 'GMX v2',
        category: 'LP Vaults',
        description:
          'Provide liquidity to GM Pools backing BTC/ETH perpetuals. Earn fees from trader activity and liquidations.',
        logo: '/protocols/gmx-v2.webp',
        link: 'https://gmx.io',
      },
      {
        name: 'Hyperliquid',
        category: 'Delta-Neutral',
        description:
          'Market-make on the fastest L1 perp DEX. HLP earns from bid-ask spreads with balanced long/short exposure.',
        logo: '/protocols/hyperliquid.webp',
        link: 'https://hyperfoundation.org/',
      },
      {
        name: 'Aster',
        category: 'Yield',
        description:
          "Deposit stablecoins into ALP for passive yield. Earn trading fees as the protocol's liquidity backbone.",
        logo: '/protocols/aster.webp',
        link: 'https://www.asterdex.com/en',
      },
    ],
  },
} as const;
