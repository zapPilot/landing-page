export const MESSAGES = {
  // Primary slogans
  slogans: {
    primary: 'Be Greedy. When Others Are Fearful.',
    primaryLine1: 'Be Greedy.',
    primaryLine2: 'When Others Are Fearful.',
    philosophy: 'Buy in fear. Defend in greed.',
    philosophyDescription:
      'A disciplined, sentiment-based strategy designed to help you allocate smarter, avoid extremes, and grow long-term BTC/ETH holdings with confidence.',
  },

  // Hero section
  hero: {
    badge: '📊 Sentiment-Driven Rebalancing',
    subtitle: 'Buy Fear. Sell Greed. Stay in Control.',
    ctaPrimary: 'Connect Wallet',
    ctaSecondary: 'Watch Demo',
  },

  // Features section
  features: {
    title: 'Why Zap Pilot?',
    subtitle: 'Simple, disciplined, and self-custodial.',
    items: [
      {
        title: 'Market Sentiment Engine',
        description: 'We watch the market 24/7. You get alerts to buy fear and sell greed.',
      },
      {
        title: 'Your Keys. Your Crypto.',
        description: 'No deposits. You decide. You sign every trade. 100% self-custodial.',
      },
      {
        title: 'Smart Rebalancing',
        description: 'No panic selling. Just disciplined, gradual adjustments over 5-10 days.',
      },
      {
        title: 'Transparent Strategy',
        description: 'See exactly how it works. Adjustable settings. Fully backtestable.',
      },
    ],
  },

  // How It Works section
  howItWorks: {
    title: 'How It Works',
    subtitle: '3 Steps to Sentiment Rebalancing',
    steps: [
      {
        number: 1,
        icon: 'Settings' as const,
        title: 'Set Strategy',
        description: 'Choose your assets. We calculate the best moves.',
        color: 'from-purple-500 to-violet-600',
      },
      {
        number: 2,
        icon: 'Calendar' as const,
        title: 'Get Alerts',
        description: "Receive calendar alerts when it's time to act.",
        color: 'from-blue-500 to-cyan-600',
      },
      {
        number: 3,
        icon: 'Shield' as const,
        title: 'Review & Sign',
        description: 'Click the link, review the trade, and sign with your wallet.',
        color: 'from-green-500 to-emerald-600',
      },
    ],
  },

  // CTA section
  cta: {
    title: 'Stop Guessing.',
    titleSecondLine: 'Start Rebalancing.',
    subtitle: 'Join investors who trade on data, not emotion.',
    ctaPrimary: 'Launch Zap Pilot',
    ctaSecondary: 'Read Documentation',
  },

  // Footer section
  footer: {
    brand: {
      description: 'Buy Fear. Sell Greed. Stay in Control.',
    },
    newsletter: {
      title: 'Stay Updated',
      description: 'Get the latest features and insights.',
      buttonText: 'Subscribe',
      disclaimer: 'No spam, unsubscribe anytime.',
    },
    copyright: '© 2024 Zap Pilot. All rights reserved.',
    builtWith: 'Built with ❤️ for DeFi',
  },

  // Core value propositions (reusable)
  values: {
    selfCustody: 'Your keys, your crypto, always',
    sentimentDriven: 'Driven by Fear & Greed',
    manualSigning: 'You sign every transaction',
    gradualExecution: 'Gradual, disciplined moves',
    notAFund: 'Not a fund. You are in control.',
  },

  // Protocols section
  protocols: {
    title: 'Integrated Protocols',
    subtitle: 'Powered by the Best in DeFi.',
    items: [
      {
        name: 'Morpho',
        category: 'Lending',
        description: 'Earn yield on stablecoins via curated lending vaults.',
        logo: '/protocols/morpho.webp',
        link: 'https://morpho.org',
      },
      {
        name: 'GMX v2',
        category: 'LP Vaults',
        description: 'Earn fees from GM pools backing BTC/ETH perps.',
        logo: '/protocols/gmx-v2.webp',
        link: 'https://gmx.io',
      },
      {
        name: 'Hyperliquid',
        category: 'Delta-Neutral',
        description: 'Earn maker spreads on Hyperliquid L1 perps.',
        logo: '/protocols/hyperliquid.webp',
        link: 'https://hyperfoundation.org/',
      },
      {
        name: 'Aster',
        category: 'Yield',
        description: 'Passive yield via ALP stablecoin liquidity.',
        logo: '/protocols/aster.webp',
        link: 'https://www.asterdex.com/en',
      },
    ],
  },
} as const;
