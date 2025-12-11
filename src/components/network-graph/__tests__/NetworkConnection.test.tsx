import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { NetworkConnection } from '../NetworkConnection';
import type { Connection } from '@/data/networkNodes';

describe('NetworkConnection', () => {
  const mockConnection: Connection = {
    from: 'node-a',
    to: 'node-b',
    animated: false,
    color: '#8B5CF6',
    strength: 0.8,
  };

  const mockFromPos = { x: 100, y: 150 };
  const mockToPos = { x: 300, y: 250 };

  describe('base line rendering', () => {
    it('should render base line with correct positions', () => {
      const { container } = render(
        <svg>
          <NetworkConnection connection={mockConnection} fromPos={mockFromPos} toPos={mockToPos} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toBeInTheDocument();
      expect(line).toHaveAttribute('x1', '100');
      expect(line).toHaveAttribute('y1', '150');
      expect(line).toHaveAttribute('x2', '300');
      expect(line).toHaveAttribute('y2', '250');
    });

    it('should render base line with gray stroke', () => {
      const { container } = render(
        <svg>
          <NetworkConnection connection={mockConnection} fromPos={mockFromPos} toPos={mockToPos} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', '#374151');
    });

    it('should calculate stroke width based on connection strength', () => {
      const { container } = render(
        <svg>
          <NetworkConnection connection={mockConnection} fromPos={mockFromPos} toPos={mockToPos} />
        </svg>
      );

      const line = container.querySelector('line');
      // strokeWidth = 1 + strength = 1 + 0.8 = 1.8
      expect(line).toHaveAttribute('stroke-width', '1.8');
    });

    it('should have correct opacity', () => {
      const { container } = render(
        <svg>
          <NetworkConnection connection={mockConnection} fromPos={mockFromPos} toPos={mockToPos} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('opacity', '0.4');
    });
  });

  describe('animated state', () => {
    it('should render only base line when not animated', () => {
      const { container } = render(
        <svg>
          <NetworkConnection connection={mockConnection} fromPos={mockFromPos} toPos={mockToPos} />
        </svg>
      );

      // Should have only one line (base line)
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(1);

      // Should not have animated circles
      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(0);
    });

    it('should render animated line when animated is true', () => {
      const animatedConnection = { ...mockConnection, animated: true };
      const { container } = render(
        <svg>
          <NetworkConnection
            connection={animatedConnection}
            fromPos={mockFromPos}
            toPos={mockToPos}
          />
        </svg>
      );

      // Should have two lines (base + animated)
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(2);
    });

    it('should render animated line with connection color', () => {
      const animatedConnection = { ...mockConnection, animated: true };
      const { container } = render(
        <svg>
          <NetworkConnection
            connection={animatedConnection}
            fromPos={mockFromPos}
            toPos={mockToPos}
          />
        </svg>
      );

      const lines = container.querySelectorAll('line');
      const animatedLine = lines[1];
      expect(animatedLine).toHaveAttribute('stroke', '#8B5CF6');
    });

    it('should render animated line with correct stroke width', () => {
      const animatedConnection = { ...mockConnection, animated: true };
      const { container } = render(
        <svg>
          <NetworkConnection
            connection={animatedConnection}
            fromPos={mockFromPos}
            toPos={mockToPos}
          />
        </svg>
      );

      const lines = container.querySelectorAll('line');
      const animatedLine = lines[1];
      expect(animatedLine).toHaveAttribute('stroke-width', '3');
    });

    it('should render data packet circles when animated', () => {
      const animatedConnection = { ...mockConnection, animated: true };
      const { container } = render(
        <svg>
          <NetworkConnection
            connection={animatedConnection}
            fromPos={mockFromPos}
            toPos={mockToPos}
          />
        </svg>
      );

      // Should have two circles (solid packet + outer ring)
      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(2);
    });

    it('should render solid packet circle with correct attributes', () => {
      const animatedConnection = { ...mockConnection, animated: true };
      const { container } = render(
        <svg>
          <NetworkConnection
            connection={animatedConnection}
            fromPos={mockFromPos}
            toPos={mockToPos}
          />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      const solidCircle = circles[0];

      expect(solidCircle).toHaveAttribute('r', '6');
      expect(solidCircle).toHaveAttribute('fill', '#8B5CF6');
    });

    it('should render outer ring circle with correct attributes', () => {
      const animatedConnection = { ...mockConnection, animated: true };
      const { container } = render(
        <svg>
          <NetworkConnection
            connection={animatedConnection}
            fromPos={mockFromPos}
            toPos={mockToPos}
          />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      const ringCircle = circles[1];

      expect(ringCircle).toHaveAttribute('r', '12');
      expect(ringCircle).toHaveAttribute('fill', 'none');
      expect(ringCircle).toHaveAttribute('stroke', '#8B5CF6');
      expect(ringCircle).toHaveAttribute('stroke-width', '2');
    });
  });

  describe('different connection strengths', () => {
    it('should handle strength of 1', () => {
      const strongConnection = { ...mockConnection, strength: 1 };
      const { container } = render(
        <svg>
          <NetworkConnection
            connection={strongConnection}
            fromPos={mockFromPos}
            toPos={mockToPos}
          />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke-width', '2');
    });

    it('should handle strength of 0.5', () => {
      const weakConnection = { ...mockConnection, strength: 0.5 };
      const { container } = render(
        <svg>
          <NetworkConnection connection={weakConnection} fromPos={mockFromPos} toPos={mockToPos} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke-width', '1.5');
    });
  });

  describe('different colors', () => {
    it('should use connection color for animated elements', () => {
      const redConnection: Connection = {
        ...mockConnection,
        animated: true,
        color: '#FF0000',
      };

      const { container } = render(
        <svg>
          <NetworkConnection connection={redConnection} fromPos={mockFromPos} toPos={mockToPos} />
        </svg>
      );

      const lines = container.querySelectorAll('line');
      const animatedLine = lines[1];
      expect(animatedLine).toHaveAttribute('stroke', '#FF0000');

      const circles = container.querySelectorAll('circle');
      expect(circles[0]).toHaveAttribute('fill', '#FF0000');
      expect(circles[1]).toHaveAttribute('stroke', '#FF0000');
    });
  });

  describe('SVG structure', () => {
    it('should render within a g element', () => {
      const { container } = render(
        <svg>
          <NetworkConnection connection={mockConnection} fromPos={mockFromPos} toPos={mockToPos} />
        </svg>
      );

      const gElement = container.querySelector('g');
      expect(gElement).toBeInTheDocument();
    });

    it('should contain all elements within the g group', () => {
      const animatedConnection = { ...mockConnection, animated: true };
      const { container } = render(
        <svg>
          <NetworkConnection
            connection={animatedConnection}
            fromPos={mockFromPos}
            toPos={mockToPos}
          />
        </svg>
      );

      const gElement = container.querySelector('g');
      expect(gElement?.querySelectorAll('line').length).toBe(2);
      expect(gElement?.querySelectorAll('circle').length).toBe(2);
    });
  });
});
