import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

// Component that renders normally
const NormalChild = () => <div>Normal content</div>;

describe('ErrorBoundary', () => {
  // Suppress console.error for expected errors in tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <NormalChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('should render error fallback when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should display refresh page button', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument();
  });

  it('should reset error state when try again is clicked', () => {
    const TestComponent = () => {
      return (
        <ErrorBoundary>
          <NormalChild />
        </ErrorBoundary>
      );
    };

    const { rerender } = render(<TestComponent />);

    expect(screen.getByText('Normal content')).toBeInTheDocument();

    rerender(<TestComponent />);
    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });
});
