import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

// Mock complex components to avoid deep rendering issues
jest.mock('@/components/AnimatedBackground', () => ({
  AnimatedBackground: () => <div data-testid="animated-background" />,
}));

jest.mock('@/components/regime', () => ({
  RegimeVisualizer: () => <div data-testid="regime-visualizer" />,
}));

jest.mock('@/components/NetworkGraph', () => ({
  NetworkGraph: () => <div data-testid="network-graph" />,
}));

describe('HomePage', () => {
  describe('section rendering', () => {
    it('should render all major sections', () => {
      render(<HomePage />);

      // Navbar should be present (appears in both navbar and footer)
      expect(screen.getAllByText('Zap Pilot').length).toBeGreaterThan(0);

      // Hero section content
      const heroButtons = screen.getAllByRole('button', { name: /Connect Wallet/i });
      expect(heroButtons.length).toBeGreaterThan(0);

      // Features section
      expect(screen.getByText('Sentiment-Driven Intelligence')).toBeInTheDocument();
      expect(screen.getByText('Self-Custodial. Always.')).toBeInTheDocument();

      // CTA section
      expect(screen.getByText(/Sentiment-Driven DeFi/i)).toBeInTheDocument();

      // Footer
      expect(screen.getByText(/Built with/)).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      render(<HomePage />);

      // There are multiple links with same names (navbar + footer)
      expect(screen.getAllByRole('link', { name: 'Features' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: 'Use Cases' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: 'How It Works' }).length).toBeGreaterThan(0);
    });

    it('should render AnimatedBackground', () => {
      render(<HomePage />);

      expect(screen.getByTestId('animated-background')).toBeInTheDocument();
    });

    it('should render RegimeVisualizer', () => {
      render(<HomePage />);

      expect(screen.getByTestId('regime-visualizer')).toBeInTheDocument();
    });
  });

  describe('layout structure', () => {
    it('should have dark background theme', () => {
      const { container } = render(<HomePage />);

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass('bg-gray-950');
      expect(mainDiv).toHaveClass('text-white');
    });

    it('should have min-height screen', () => {
      const { container } = render(<HomePage />);

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass('min-h-screen');
    });

    it('should have overflow-x-hidden to prevent horizontal scroll', () => {
      const { container } = render(<HomePage />);

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass('overflow-x-hidden');
    });
  });

  describe('section order', () => {
    it('should render sections in correct visual order', () => {
      const { container } = render(<HomePage />);

      // Get all section-like elements
      const content = container.textContent || '';

      // Hero should come before Features
      const heroIndex = content.indexOf('Connect Wallet');
      const featuresIndex = content.indexOf('Sentiment-Driven Intelligence');
      expect(heroIndex).toBeLessThan(featuresIndex);

      // Features should come before CTA
      const ctaIndex = content.indexOf('Sentiment-Driven DeFi');
      expect(featuresIndex).toBeLessThan(ctaIndex);

      // CTA should come before Footer
      const footerIndex = content.indexOf('Built with');
      expect(ctaIndex).toBeLessThan(footerIndex);
    });
  });

  describe('accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<HomePage />);

      // Should have h1 for main title
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBeGreaterThan(0);

      // Should have h2 for section headings
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it('should have navigation landmark', () => {
      const { container } = render(<HomePage />);

      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('should have footer landmark', () => {
      const { container } = render(<HomePage />);

      expect(container.querySelector('footer')).toBeInTheDocument();
    });
  });

  describe('interactive elements', () => {
    it('should render all CTA buttons', () => {
      render(<HomePage />);

      // Hero CTA
      expect(screen.getByRole('button', { name: /Connect Wallet/i })).toBeInTheDocument();

      // Watch Demo button
      expect(screen.getByRole('button', { name: /Watch Demo/i })).toBeInTheDocument();
    });

    it('should render Launch App buttons', () => {
      render(<HomePage />);

      // Multiple Launch App buttons (navbar + possibly CTA)
      const launchButtons = screen.getAllByRole('button', { name: /Launch/i });
      expect(launchButtons.length).toBeGreaterThan(0);
    });
  });
});
