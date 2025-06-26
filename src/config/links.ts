// Centralized configuration for all external and internal links
export const LINKS = {
  // Main application
  app: process.env.NEXT_PUBLIC_APP_URL || 'https://app.zap-pilot.org',

  // Documentation and resources
  documentation: 'https://zap-pilot.gitbook.io/',
  apiReference: 'https://zap-pilot.gitbook.io/api',
  tutorials: 'https://zap-pilot.gitbook.io/tutorials',
  whitepaper: 'https://zap-pilot.gitbook.io/whitepaper',

  // Social media
  social: {
    twitter: 'https://x.com/zappilot',
    discord: 'https://discord.gg/d3vXUtcFCJ',
    github: 'https://github.com/zapPilot',
    medium: 'https://farcaster.xyz/david-chang',
    youtube: 'https://www.youtube.com/watch?v=CnvKz3YbP08',
  },

  // Support and community
  support: {
    helpCenter: 'https://help.zap-pilot.org',
    contactUs: 'mailto:zap-pilot.org@ud.me',
    bugReport: 'https://github.com/zap-pilot/issues/new',
    featureRequest: 'https://github.com/zap-pilot/issues/new?template=feature_request.md',
    feedback: 'https://forms.gle/zappilot-feedback',
  },

  // Legal and compliance
  legal: {
    termsOfService: 'https://zap-pilot.org/terms',
    privacyPolicy: 'https://zap-pilot.org/privacy',
    cookiePolicy: 'https://zap-pilot.org/cookies',
    disclaimer: 'https://zap-pilot.org/disclaimer',
  },

  // Development and technical
  development: {
    github: 'https://github.com/zapPilot',
  },

  // Marketing and press
  marketing: {
    brandKit: '/brand-guide.md',
    pressKit: 'https://press.zap-pilot.org',
    partnerships: 'mailto:zap-pilot.org@ud.me',
    media: 'mailto:zap-pilot.org@ud.me',
  },

  // Newsletter and subscriptions
  newsletter: {
    subscribe: 'https://newsletter.zap-pilot.org/subscribe',
    unsubscribe: 'https://newsletter.zap-pilot.org/unsubscribe',
    archive: 'https://newsletter.zap-pilot.org/archive',
  },

  // Analytics and tracking (for internal use)
  analytics: {
    mixpanel: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    hotjar: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
} as const;

// Helper functions for link handling
export const openExternalLink = (url: string) => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

export const openEmail = (email: string, subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);

  const mailtoUrl = `mailto:${email}${params.toString() ? '?' + params.toString() : ''}`;

  if (typeof window !== 'undefined') {
    window.location.href = mailtoUrl;
  }
};

// Navigation links for internal site sections
export const NAVIGATION = {
  internal: [
    { href: '#features', label: 'Features' },
    { href: '#use-cases', label: 'Use Cases' },
    { href: '#how-it-works', label: 'How It Works' },
  ],
  footer: {
    product: [
      { href: '#features', label: 'Features' },
      { href: '#use-cases', label: 'Use Cases' },
      { href: '#how-it-works', label: 'How It Works' },
      { href: LINKS.app, label: 'Launch App', external: true },
    ],
    resources: [
      { href: LINKS.documentation, label: 'Documentation', external: true },
      { href: LINKS.apiReference, label: 'API Reference', external: true },
      { href: LINKS.tutorials, label: 'Tutorials', external: true },
      { href: LINKS.support.helpCenter, label: 'Support', external: true },
    ],
    community: [
      { href: LINKS.social.discord, label: 'Discord', external: true },
      { href: LINKS.social.twitter, label: 'Twitter', external: true },
      { href: LINKS.social.github, label: 'GitHub', external: true },
      { href: LINKS.newsletter.subscribe, label: 'Newsletter', external: true },
    ],
  },
} as const;

// Social media icons mapping (for dynamic rendering)
export const SOCIAL_ICONS = {
  twitter: 'Twitter',
  discord: 'MessageCircle',
  telegram: 'Send',
  github: 'Github',
  linkedin: 'Linkedin',
  medium: 'BookOpen',
  youtube: 'Youtube',
} as const;

// Link categories for easier management
export const LINK_CATEGORIES = {
  primary: [LINKS.app, LINKS.documentation],
  social: Object.values(LINKS.social),
  support: Object.values(LINKS.support),
  legal: Object.values(LINKS.legal),
} as const;
