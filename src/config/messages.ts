export const MESSAGES = {
  // Primary slogans
  slogans: {
    primary: 'Buy in fear. Defend in greed.',
    philosophy: 'Do Less · Don\'t Rush · Only Act When Necessary',
    philosophyDescription:
      'Built on timeless principles of disciplined investing—act only at market extremes, not on impulse.',
  },

  // Hero section
  hero: {
    badge: '📊 Sentiment-Driven Rebalancing',
    subtitle:
      'Zap Pilot converts market sentiment into wallet-native rebalancing routes — you stay in control of your keys.',
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
          'Rebalancing happens over 5-10 days with daily limits (1-3% of portfolio). No panic selling, no FOMO buying — just systematic allocation adjustments.',
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
          'Gradually shifts from 70% crypto → 30% crypto over 10 days, locking in gains to stablecoins.',
      },
      {
        regime: 'Neutral',
        title: 'Sideways Market: Hold & Wait',
        scenario: 'Fear & Greed Index hovers between 45-55 for weeks.',
        userIntent: 'I don\'t want to overtrade or pay unnecessary fees.',
        zapAction:
          'Carries over your existing allocation with zero rebalancing. Your portfolio stays put.',
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
} as const;

// Type for accessing messages
export type Messages = typeof MESSAGES;
