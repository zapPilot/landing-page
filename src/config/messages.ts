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
    subtitle: 'Built for the future of DeFi, designed for today\'s users',
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
          'Rebalancing adapts to market intensity: 5 days (1%/day) for intermediate regimes, 10 days (2.5%/day) for extreme regimes. No panic selling, no FOMO buying — just systematic execution.',
      },
      {
        title: 'Transparent & Backtestable',
        description:
          'All parameters are visible and adjustable. Regime thresholds, allocation targets, execution pace — everything is designed to be backtested and optimized.',
      },
    ],
  },

  // Use Cases section
  useCases: {
    title: 'Use Cases',
    subtitle: 'Real scenarios where Zap Pilot keeps you disciplined',
    cases: [
      {
        regime: 'Extreme Fear',
        title: 'Market Crash: Buy When Others Panic',
        scenario: 'Bitcoin crashes from $60K to $40K. Fear & Greed Index drops to 15.',
        userIntent: 'I want to DCA into BTC/ETH but without timing the exact bottom.',
        zapAction:
          'Gradually shifts from 30% crypto → 70% crypto over 10 days using your stable reserves.',
      },
      {
        regime: 'Extreme Greed',
        title: 'Bull Market Peak: Take Profits Gradually',
        scenario: 'Bitcoin rallies to $100K. Fear & Greed Index hits 92.',
        userIntent: 'I want to take profits but avoid selling too early.',
        zapAction:
          'Shifts from 70% crypto → 30% crypto over 10 days (2.5%/day = 25% total adjustment), locking in gains to stablecoins or low-risk pools.',
      },
      {
        regime: 'Greed',
        title: 'Rising Market: Lock Gains into LP',
        scenario: 'Bitcoin rallies to $75K. Fear & Greed Index hits 65.',
        userIntent: 'I want to lock in some gains while keeping crypto exposure and earning fees.',
        zapAction:
          'Shifts 5% of portfolio from spot BTC/ETH → crypto-USDC LP over 5 days (1%/day), earning trading fees while maintaining exposure.',
      },
      {
        regime: 'Neutral',
        title: 'Sideways Market: Maintain Balance',
        scenario: 'Fear & Greed Index hovers between 46-54 for weeks.',
        userIntent: 'I don\'t want to overtrade or pay unnecessary fees.',
        zapAction:
          'Maintains your 50/50 allocation with zero active rebalancing. Only monitors risk: if borrowing rates spike above threshold, automatically deleverages to protect capital.',
      },
      {
        regime: 'Fear',
        title: 'Market Cooling: Unwind LP for Spot',
        scenario: 'Bitcoin drops to $55K. Fear & Greed Index falls to 35.',
        userIntent: 'I want to increase spot exposure before market possibly drops further.',
        zapAction:
          'Unwinds 5% of portfolio from crypto-USDC LP → DCA into spot BTC/ETH over 5 days (1%/day), preparing for potential Extreme Fear.',
      },
    ],
    bottomMessage: {
      line1: 'Let market sentiment guide your decisions.',
      line2: 'Zap Pilot handles the gradual execution — entirely within your wallet.',
    },
  },

  // How It Works section
  howItWorks: {
    title: 'How It Works',
    subtitle: 'Three simple steps to sentiment-driven rebalancing',
    steps: [
      {
        title: 'Define Strategy',
        description: 'Set your target allocations for each regime',
      },
      {
        title: 'Monitor Sentiment',
        description: 'Zap Pilot watches Fear & Greed Index 24/7',
      },
      {
        title: 'Execute Gradually',
        description: 'Rebalancing happens over 5-10 days in your wallet',
      },
    ],
  },

  // CTA section
  cta: {
    title: 'Ready for Disciplined,',
    titleSecondLine: 'Sentiment-Driven DeFi?',
    subtitle:
      'Join investors who rebalance based on market extremes — not impulsive emotions',
    ctaPrimary: 'Launch Zap Pilot',
    ctaSecondary: 'Read Documentation',
    cards: [
      {
        title: 'Open Source',
        description:
          'Explore our codebase and contribute to the future of DeFi',
      },
      {
        title: 'Community',
        description:
          'Join our Discord and learn regime-based allocation strategies',
      },
      {
        title: 'Learn More',
        description:
          'Explore the Fear & Greed Index methodology and backtest results',
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
      description:
        'Get the latest updates on new features and DeFi insights.',
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
        name: 'Morpho Blue',
        category: 'Lending',
        description: 'Decentralized lending optimizer delivering superior yields with minimized risk through efficient capital allocation.',
        logo: '/protocols/morpho-blue.webp',
        link: 'https://morpho.org',
      },
      {
        name: 'GMX v2',
        category: 'Perpetuals',
        description: 'Decentralized perpetual exchange offering low-cost leverage trading with deep liquidity and minimal slippage.',
        logo: '/protocols/gmx-v2.webp',
        link: 'https://gmx.io',
      },
      {
        name: 'Hyperdrive',
        category: 'Fixed Yield',
        description: 'Automated market maker for fixed and variable yield markets, enabling predictable returns without lock-ups.',
        logo: '/protocols/hyperdrive.webp',
        link: 'https://hyperdrive.delv.tech',
      },
      {
        name: 'ApolloDAO',
        category: 'Yield Aggregator',
        description: 'Multi-chain yield optimizer that automatically compounds returns across the most profitable DeFi strategies.',
        logo: '/protocols/apollodao.webp',
        link: 'https://apollo.farm',
      },
    ],
  },
} as const;
