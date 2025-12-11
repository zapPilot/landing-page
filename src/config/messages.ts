export const MESSAGES = {
  // Primary slogans
  slogans: {
    primary: 'Your Portfolio. Guided by Market Sentiment',
    philosophy: 'Buy in fear. Defend in greed.',
    philosophyDescription:
      'A disciplined, sentiment-based strategy designed to help you allocate smarter, avoid extremes, and grow long-term BTC/ETH holdings with confidence.',
  },

  // Hero section
  hero: {
    badge: '📊 Sentiment-Driven Rebalancing',
    subtitle:
      'Zap Pilot is a self-custodial, sentiment-driven rebalancing engine that adjusts your BTC/ETH exposure at emotional extremes — with every action executed directly from your own wallet.',
    ctaPrimary: 'Discover Your Allocation',
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
        title: 'Execute & Sign',
        description: 'Click the calendar link to sign the transaction. You stay in control.',
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
    cards: [
      {
        title: 'Open Source',
        description: 'Explore our codebase and contribute to the future of DeFi',
      },
      {
        title: 'Community',
        description: 'Join our Discord and learn regime-based allocation strategies',
      },
      {
        title: 'Learn More',
        description: 'Explore the Fear & Greed Index methodology and backtest results',
      },
    ],
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
    copyright: '© 2023 Zap Pilot. All rights reserved.',
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
          'Decentralized lending optimizer delivering superior yields with minimized risk through efficient capital allocation.',
        logo: '/protocols/morpho.webp',
        link: 'https://morpho.org',
      },
      {
        name: 'GMX v2',
        category: 'Perpetuals',
        description:
          'Provide liquidity to GM Pools backing BTC/ETH perpetuals. Earn fees from trading activity and trader liquidations.',
        logo: '/protocols/gmx-v2.webp',
        link: 'https://gmx.io',
      },
      {
        name: 'Hyperliquid',
        category: 'Perpetuals',
        description:
          'Provide stablecoins to Hyperliquid HLP (Hyperliquid Liquidity Pool) for stablecoin positions. Earn trading fees from liquidity provision.',
        logo: '/protocols/hyperliquid.webp',
        link: 'https://hyperfoundation.org/',
      },
      {
        name: 'Aster',
        category: 'Perpetuals',
        description:
          'Provide stablecoins to Aster ALP (Aster Liquidity Pool) for stablecoin positions. Earn trading fees from liquidity provision.',
        logo: '/protocols/aster.webp',
        link: 'https://www.asterdex.com/en',
      },
    ],
  },
} as const;
