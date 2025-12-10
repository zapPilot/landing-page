import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AllocationPanel } from '../AllocationPanel';
import { regimes, type Regime, type RegimeStrategy } from '@/lib/regimeData';

// Mock the child components
jest.mock('@/components/ui/allocation', () => ({
  AllocationComparison: ({
    before,
    after,
    timeframe,
  }: {
    before: { spot: number; lp: number; stable: number };
    after: { spot: number; lp: number; stable: number };
    timeframe: string;
  }) => (
    <div data-testid="allocation-comparison">
      <span data-testid="before">{JSON.stringify(before)}</span>
      <span data-testid="after">{JSON.stringify(after)}</span>
      <span data-testid="timeframe">{timeframe}</span>
    </div>
  ),
  MaintainingAllocation: () => (
    <div data-testid="maintaining-allocation">Maintaining current allocation</div>
  ),
}));

jest.mock('../DirectionBadge', () => ({
  DirectionBadge: ({
    direction,
    label,
  }: {
    direction: string;
    label: string;
    regimeColor: string;
    isAutoPlaying: boolean;
  }) => (
    <div data-testid="direction-badge">
      <span data-testid="direction">{direction}</span>
      <span data-testid="label">{label}</span>
    </div>
  ),
}));

describe('AllocationPanel', () => {
  const mockPanelPosition = {
    x: 100,
    y: 50,
    width: 400,
    height: 500,
  };

  const mockStrategyWithChange: RegimeStrategy = {
    title: 'Maximum Accumulation',
    useCase: {
      scenario: 'Bitcoin drops 33% from recent highs.',
      userIntent: 'I want to DCA into BTC/ETH.',
      zapAction: 'Aggressively accumulates Bitcoin.',
      allocationBefore: { spot: 10, lp: 20, stable: 70 },
      allocationAfter: { spot: 70, lp: 0, stable: 30 },
    },
  };

  const mockStrategyWithoutChange: RegimeStrategy = {
    title: 'Holiday Mode',
    useCase: {
      scenario: 'FGI hovers between 46-54 for weeks.',
      userIntent: "I don't want to overtrade.",
      zapAction: 'Zero rebalancing.',
      allocationBefore: { spot: 50, lp: 20, stable: 30 },
      allocationAfter: { spot: 50, lp: 20, stable: 30 },
    },
  };

  const mockRegime: Regime = regimes.find(r => r.id === 'ef')!;

  const defaultProps = {
    activeRegimeData: mockRegime,
    panelPosition: mockPanelPosition,
    isMobile: false,
    animationDirection: 'forward' as const,
    activeStrategy: mockStrategyWithChange,
    directionLabel: null,
    isAutoPlaying: false,
  };

  describe('rendering', () => {
    it('should render regime label', () => {
      render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      expect(screen.getByText(mockRegime.label)).toBeInTheDocument();
    });

    it('should render regime philosophy', () => {
      render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      expect(screen.getByText(mockRegime.philosophy)).toBeInTheDocument();
    });

    it('should render philosophy author', () => {
      render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      expect(screen.getByText(`— ${mockRegime.author}`)).toBeInTheDocument();
    });

    it('should render color indicator', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      const colorIndicator = container.querySelector('.rounded-full');
      expect(colorIndicator).toHaveStyle({
        backgroundColor: mockRegime.fillColor,
      });
    });
  });

  describe('direction badge', () => {
    it('should not render direction badge when directionLabel is null', () => {
      render(
        <svg>
          <AllocationPanel {...defaultProps} directionLabel={null} />
        </svg>
      );

      expect(screen.queryByTestId('direction-badge')).not.toBeInTheDocument();
    });

    it('should render direction badge when directionLabel is provided', () => {
      render(
        <svg>
          <AllocationPanel
            {...defaultProps}
            directionLabel="From Extreme Fear (recovery)"
          />
        </svg>
      );

      expect(screen.getByTestId('direction-badge')).toBeInTheDocument();
      expect(screen.getByTestId('label')).toHaveTextContent(
        'From Extreme Fear (recovery)'
      );
    });

    it('should pass correct direction to badge', () => {
      render(
        <svg>
          <AllocationPanel
            {...defaultProps}
            directionLabel="Test label"
            animationDirection="backward"
          />
        </svg>
      );

      expect(screen.getByTestId('direction')).toHaveTextContent('backward');
    });
  });

  describe('allocation display', () => {
    it('should show AllocationComparison when allocations differ', () => {
      render(
        <svg>
          <AllocationPanel
            {...defaultProps}
            activeStrategy={mockStrategyWithChange}
          />
        </svg>
      );

      expect(screen.getByTestId('allocation-comparison')).toBeInTheDocument();
    });

    it('should pass correct allocation data to AllocationComparison', () => {
      render(
        <svg>
          <AllocationPanel
            {...defaultProps}
            activeStrategy={mockStrategyWithChange}
          />
        </svg>
      );

      expect(screen.getByTestId('before')).toHaveTextContent(
        JSON.stringify(mockStrategyWithChange.useCase!.allocationBefore)
      );
      expect(screen.getByTestId('after')).toHaveTextContent(
        JSON.stringify(mockStrategyWithChange.useCase!.allocationAfter)
      );
    });

    it('should pass timeframe to AllocationComparison', () => {
      render(
        <svg>
          <AllocationPanel
            {...defaultProps}
            activeStrategy={mockStrategyWithChange}
          />
        </svg>
      );

      expect(screen.getByTestId('timeframe')).toHaveTextContent('Over 5-10 days');
    });

    it('should show MaintainingAllocation when allocations are the same', () => {
      render(
        <svg>
          <AllocationPanel
            {...defaultProps}
            activeStrategy={mockStrategyWithoutChange}
          />
        </svg>
      );

      expect(screen.getByTestId('maintaining-allocation')).toBeInTheDocument();
      expect(
        screen.queryByTestId('allocation-comparison')
      ).not.toBeInTheDocument();
    });

    it('should show MaintainingAllocation when useCase is undefined', () => {
      const strategyWithoutUseCase: RegimeStrategy = {
        title: 'Test Strategy',
      };

      render(
        <svg>
          <AllocationPanel
            {...defaultProps}
            activeStrategy={strategyWithoutUseCase}
          />
        </svg>
      );

      expect(screen.getByTestId('maintaining-allocation')).toBeInTheDocument();
    });
  });

  describe('panel positioning', () => {
    it('should use foreignObject for HTML content', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      const foreignObject = container.querySelector('foreignObject');
      expect(foreignObject).toBeInTheDocument();
    });

    it('should apply correct position to foreignObject', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      const foreignObject = container.querySelector('foreignObject');
      expect(foreignObject).toHaveAttribute('x', '100');
      expect(foreignObject).toHaveAttribute('y', '50');
    });

    it('should apply correct dimensions to foreignObject', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      const foreignObject = container.querySelector('foreignObject');
      expect(foreignObject).toHaveAttribute('width', '400');
      expect(foreignObject).toHaveAttribute('height', '500');
    });
  });

  describe('styling', () => {
    it('should apply backdrop blur styling', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      const panel = container.querySelector('.backdrop-blur-lg');
      expect(panel).toBeInTheDocument();
    });

    it('should apply rounded corners', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      const panel = container.querySelector('.rounded-2xl');
      expect(panel).toBeInTheDocument();
    });

    it('should apply border styling', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...defaultProps} />
        </svg>
      );

      const panel = container.querySelector('.border-gray-800');
      expect(panel).toBeInTheDocument();
    });
  });

  describe('different regimes', () => {
    it('should display correct data for each regime', () => {
      regimes.forEach(regime => {
        const { unmount } = render(
          <svg>
            <AllocationPanel
              {...defaultProps}
              activeRegimeData={regime}
              activeStrategy={regime.strategies.default}
            />
          </svg>
        );

        expect(screen.getByText(regime.label)).toBeInTheDocument();
        expect(screen.getByText(regime.philosophy)).toBeInTheDocument();
        expect(screen.getByText(`— ${regime.author}`)).toBeInTheDocument();

        unmount();
      });
    });
  });
});
