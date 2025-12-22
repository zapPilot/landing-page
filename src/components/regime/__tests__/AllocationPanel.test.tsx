import '@testing-library/jest-dom';
import {
  render,
  screen,
  createAllocationPanelProps,
  createMockStrategy,
  createMaintainingStrategy,
  getRegimeById,
} from '@/test-utils';
import { AllocationPanel } from '../AllocationPanel';
import { regimes, type RegimeStrategy } from '@/lib/regimeData';

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
  describe('rendering', () => {
    it('should render regime label', () => {
      render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      expect(screen.getByText(getRegimeById('ef').label)).toBeInTheDocument();
    });

    it('should render regime philosophy', () => {
      render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      expect(screen.getByText(getRegimeById('ef').philosophy)).toBeInTheDocument();
    });

    it('should render philosophy author', () => {
      render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      expect(screen.getByText(`— ${getRegimeById('ef').author}`)).toBeInTheDocument();
    });

    it('should render color indicator', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      const colorIndicator = container.querySelector('.rounded-full');
      expect(colorIndicator).toHaveStyle({
        backgroundColor: getRegimeById('ef').fillColor,
      });
    });
  });

  describe('direction badge', () => {
    it('should not render direction badge when directionLabel is null', () => {
      render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} directionLabel={null} />
        </svg>
      );

      expect(screen.queryByTestId('direction-badge')).not.toBeInTheDocument();
    });

    it('should render direction badge when directionLabel is provided', () => {
      render(
        <svg>
          <AllocationPanel
            {...createAllocationPanelProps()}
            directionLabel="From Extreme Fear (recovery)"
          />
        </svg>
      );

      expect(screen.getByTestId('direction-badge')).toBeInTheDocument();
      expect(screen.getByTestId('label')).toHaveTextContent('From Extreme Fear (recovery)');
    });

    it('should pass correct direction to badge', () => {
      render(
        <svg>
          <AllocationPanel
            {...createAllocationPanelProps()}
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
            {...createAllocationPanelProps()}
            activeStrategy={createMockStrategy()}
          />
        </svg>
      );

      expect(screen.getByTestId('allocation-comparison')).toBeInTheDocument();
    });

    it('should pass correct allocation data to AllocationComparison', () => {
      render(
        <svg>
          <AllocationPanel
            {...createAllocationPanelProps()}
            activeStrategy={createMockStrategy()}
          />
        </svg>
      );

      expect(screen.getByTestId('before')).toHaveTextContent(
        JSON.stringify(createMockStrategy().useCase!.allocationBefore)
      );
      expect(screen.getByTestId('after')).toHaveTextContent(
        JSON.stringify(createMockStrategy().useCase!.allocationAfter)
      );
    });

    it('should pass timeframe to AllocationComparison', () => {
      render(
        <svg>
          <AllocationPanel
            {...createAllocationPanelProps()}
            activeStrategy={createMockStrategy()}
          />
        </svg>
      );

      expect(screen.getByTestId('timeframe')).toHaveTextContent('Over 5-10 days');
    });

    it('should show MaintainingAllocation when allocations are the same', () => {
      render(
        <svg>
          <AllocationPanel
            {...createAllocationPanelProps()}
            activeStrategy={createMaintainingStrategy()}
          />
        </svg>
      );

      expect(screen.getByTestId('maintaining-allocation')).toBeInTheDocument();
      expect(screen.queryByTestId('allocation-comparison')).not.toBeInTheDocument();
    });

    it('should show MaintainingAllocation when useCase is undefined', () => {
      const strategyWithoutUseCase: RegimeStrategy = {
        title: 'Test Strategy',
      };

      render(
        <svg>
          <AllocationPanel
            {...createAllocationPanelProps()}
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
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      const foreignObject = container.querySelector('foreignObject');
      expect(foreignObject).toBeInTheDocument();
    });

    it('should apply correct position to foreignObject', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      const foreignObject = container.querySelector('foreignObject');
      expect(foreignObject).toHaveAttribute('x', '100');
      expect(foreignObject).toHaveAttribute('y', '50');
    });

    it('should apply correct dimensions to foreignObject', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      const foreignObject = container.querySelector('foreignObject');
      expect(foreignObject).toHaveAttribute('width', '400');
      expect(foreignObject).toHaveAttribute('height', '500');
    });
  });

  describe('styling', () => {
    it('should apply solid background styling for iOS Safari compatibility', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      // Using solid bg-gray-900/95 instead of backdrop-blur-lg for iOS Safari compatibility
      const panel = container.querySelector('.bg-gray-900\\/95');
      expect(panel).toBeInTheDocument();
    });

    it('should apply rounded corners', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
        </svg>
      );

      const panel = container.querySelector('.rounded-2xl');
      expect(panel).toBeInTheDocument();
    });

    it('should apply border styling', () => {
      const { container } = render(
        <svg>
          <AllocationPanel {...createAllocationPanelProps()} />
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
              {...createAllocationPanelProps()}
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
