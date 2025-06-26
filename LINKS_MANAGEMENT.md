# Links Management System

## Overview

Zap Pilot uses a centralized links management system to maintain consistency across all components and make updates easier. All external links, social media URLs, and navigation items are configured in a single location.

## Configuration File

**Location**: `src/config/links.ts`

This file contains all links used throughout the application, organized into logical categories:

### Main Categories

1. **Primary Links**
   - Main application URL
   - Documentation links

2. **Social Media**
   - Twitter, Discord, GitHub, etc.
   - Supports environment variable overrides

3. **Support & Community**
   - Help center, contact information
   - Bug reporting and feedback

4. **Legal Pages**
   - Terms of service, privacy policy
   - Cookie policy, disclaimers

5. **External Integrations**
   - CoinGecko, CoinMarketCap
   - DeFiLlama, DexTools

6. **Development**
   - GitHub repositories
   - NPM packages, security audits

## Usage in Components

### Import the Configuration

```typescript
import { LINKS, NAVIGATION, openExternalLink } from '@/config/links';
```

### Use in Your Component

```typescript
// For external links
<button onClick={() => openExternalLink(LINKS.app)}>
  Launch App
</button>

// For internal navigation
{NAVIGATION.internal.map(item => (
  <a href={item.href}>{item.label}</a>
))}
```

### Components Updated

The following components now use the centralized system:

- ✅ **Navbar**: Uses `NAVIGATION.internal` and `LINKS.app`
- ✅ **Hero**: Uses `LINKS.app`
- ✅ **CTA**: Uses `LINKS.app`, `LINKS.social.github`, `LINKS.social.discord`, `LINKS.documentation`
- ✅ **Footer**: Uses all footer navigation arrays
- ✅ **HowItWorks**: Uses `LINKS.app`

## Environment Configuration

Links can be customized per environment using environment variables:

### Available Variables

```bash
# Primary URLs
NEXT_PUBLIC_APP_URL=https://app.zap-pilot.org

# Social Media Handles
NEXT_PUBLIC_TWITTER_HANDLE=zappilot
NEXT_PUBLIC_DISCORD_INVITE=zappilot
NEXT_PUBLIC_GITHUB_ORG=zap-pilot

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MIXPANEL_TOKEN=your_token
NEXT_PUBLIC_HOTJAR_ID=your_id
```

### Setup Instructions

1. Copy `.env.example` to `.env.local`
2. Update the values for your environment
3. Restart the development server

## How to Update Links

### 1. Single Link Update

```typescript
// In src/config/links.ts
export const LINKS = {
  app: 'https://new-app-url.com', // ← Update here
  // ... other links
};
```

### 2. Multiple Links Update

```typescript
// Update multiple social links at once
social: {
  twitter: 'https://twitter.com/new_handle',
  discord: 'https://discord.gg/new_invite',
  // ... other social links
}
```

### 3. Environment-Specific Updates

```bash
# In .env.local
NEXT_PUBLIC_APP_URL=https://staging.zap-pilot.org
NEXT_PUBLIC_TWITTER_HANDLE=zappilot_dev
```

## Helper Functions

### `openExternalLink(url: string)`

Opens external links in a new tab with security attributes:

```typescript
openExternalLink(LINKS.social.twitter);
// Opens Twitter in new tab with noopener,noreferrer
```

### `openEmail(email: string, subject?: string, body?: string)`

Creates mailto links with optional subject and body:

```typescript
openEmail('support@zap-pilot.org', 'Bug Report', 'I found an issue with...');
```

## Link Categories

### Quick Reference

- **`LINKS.app`**: Main application URL
- **`LINKS.documentation`**: Documentation homepage
- **`LINKS.social.*`**: All social media links
- **`LINKS.support.*`**: Support and help links
- **`LINKS.legal.*`**: Legal pages
- **`NAVIGATION.internal`**: Internal page navigation
- **`NAVIGATION.footer.*`**: Footer section links

## Testing Links

### Automated Testing

```typescript
// Example test
import { LINKS } from '@/config/links';

test('all links are valid URLs', () => {
  Object.values(LINKS.social).forEach(url => {
    expect(url).toMatch(/^https?:\/\//);
  });
});
```

### Manual Testing

1. Use the Links Dashboard: `src/components/admin/LinksDashboard.tsx`
2. Check all buttons and links on the website
3. Verify external links open in new tabs
4. Test email links open mail client

## Best Practices

### ✅ Do

- Always use `LINKS.*` constants instead of hardcoded URLs
- Use `openExternalLink()` for external URLs
- Group related links in the same category
- Add new links to the appropriate section
- Update environment variables for different deployments

### ❌ Don't

- Hardcode URLs directly in components
- Use `window.open()` directly (use helper functions)
- Skip testing after updating links
- Forget to update both development and production environments

## Maintenance

### Regular Tasks

1. **Monthly**: Check all external links for validity
2. **Quarterly**: Review and update social media links
3. **As needed**: Update app URLs for new deployments
4. **Before releases**: Verify all links work correctly

### Link Validation

```bash
# Script to check all links (example)
npm run check-links
```

## Troubleshooting

### Common Issues

1. **Links not updating**: Clear browser cache and restart dev server
2. **Environment variables not working**: Check `.env.local` file and restart
3. **External links not opening**: Verify `openExternalLink()` is being used
4. **Footer links broken**: Check `NAVIGATION.footer.*` arrays

### Debug Mode

Add this to see all links in console:

```typescript
console.log('All links:', LINKS);
console.log('Navigation:', NAVIGATION);
```

---

This centralized system ensures consistency, makes maintenance easier, and provides flexibility for different environments and deployments.
