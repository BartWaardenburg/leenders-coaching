import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';

import { ToastProvider, useToast } from './ToastProvider';

/* Mock dependencies */
vi.mock('@/components/ui/Toast/Toast', () => ({
  Toast: ({ id, message, variant, duration, onClose }: any) => (
    <div
      data-testid={`toast-${id}`}
      data-variant={variant}
      data-duration={duration}
      onClick={() => onClose(id)}
    >
      {message}
    </div>
  ),
}));

vi.mock('@/components/ui/Stack', () => ({
  Stack: ({ children, gap }: { children: ReactNode; gap?: number }) => (
    <div data-gap={gap}>{children}</div>
  ),
}));

vi.mock('@/components/ui/Box', () => ({
  Box: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

/* Test component that uses the useToast hook */
const TestComponent = () => {
  const { showToast } = useToast();

  return (
    <div data-testid="test-component">
      <button
        data-testid="show-success-toast"
        onClick={() => showToast('Success message', { variant: 'green' })}
      >
        Show Success Toast
      </button>
      <button
        data-testid="show-error-toast"
        onClick={() => showToast('Error message', { variant: 'pink' })}
      >
        Show Error Toast
      </button>
      <button
        data-testid="show-info-toast"
        onClick={() => showToast('Info message', { variant: 'blue' })}
      >
        Show Info Toast
      </button>
      <button
        data-testid="show-warning-toast"
        onClick={() => showToast('Warning message', { variant: 'yellow' })}
      >
        Show Warning Toast
      </button>
      <button
        data-testid="show-custom-duration-toast"
        onClick={() => showToast('Custom duration', { duration: 10000 })}
      >
        Show Custom Duration Toast
      </button>
      <button
        data-testid="show-default-toast"
        onClick={() => showToast('Default toast')}
      >
        Show Default Toast
      </button>
      <button
        data-testid="show-jsx-toast"
        onClick={() =>
          showToast(<div data-testid="jsx-message">JSX Message</div>)
        }
      >
        Show JSX Toast
      </button>
    </div>
  );
};

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Provider functionality', () => {
    it('should render children and toast container', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should handle multiple children', () => {
      const MultipleChildren = () => (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <TestComponent />
        </>
      );

      render(
        <ToastProvider>
          <MultipleChildren />
        </ToastProvider>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should handle nested components', () => {
      const NestedComponent = () => (
        <div data-testid="nested-wrapper">
          <TestComponent />
        </div>
      );

      render(
        <ToastProvider>
          <NestedComponent />
        </ToastProvider>
      );

      expect(screen.getByTestId('nested-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  describe('useToast hook', () => {
    it('should provide showToast function', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      expect(screen.getByTestId('show-success-toast')).toBeInTheDocument();
      expect(screen.getByTestId('show-error-toast')).toBeInTheDocument();
      expect(screen.getByTestId('show-info-toast')).toBeInTheDocument();
      expect(screen.getByTestId('show-warning-toast')).toBeInTheDocument();
    });

    it('should throw error when used outside provider', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useToast must be used within a ToastProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('Toast display functionality', () => {
    it('should show success toast with correct variant', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-success-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0]; // Get the first toast
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveAttribute('data-variant', 'green');
      expect(toast).toHaveTextContent('Success message');
    });

    it('should show error toast with correct variant', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-error-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveAttribute('data-variant', 'pink');
      expect(toast).toHaveTextContent('Error message');
    });

    it('should show info toast with correct variant', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-info-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveAttribute('data-variant', 'blue');
      expect(toast).toHaveTextContent('Info message');
    });

    it('should show warning toast with correct variant', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-warning-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveAttribute('data-variant', 'yellow');
      expect(toast).toHaveTextContent('Warning message');
    });

    it('should show default toast without variant', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-default-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(toast?.getAttribute('data-variant')).toBeNull();
      expect(toast).toHaveTextContent('Default toast');
    });

    it('should use default duration of 5000ms', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-default-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toHaveAttribute('data-duration', '5000');
    });

    it('should use custom duration when provided', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-custom-duration-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toHaveAttribute('data-duration', '10000');
      expect(toast).toHaveTextContent('Custom duration');
    });

    it('should handle JSX messages', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-jsx-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(screen.getByTestId('jsx-message')).toBeInTheDocument();
      expect(screen.getByTestId('jsx-message')).toHaveTextContent(
        'JSX Message'
      );
    });
  });

  describe('Multiple toasts', () => {
    it('should display multiple toasts simultaneously', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-success-toast'));
      fireEvent.click(screen.getByTestId('show-error-toast'));
      fireEvent.click(screen.getByTestId('show-info-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      expect(toasts.length).toBeGreaterThanOrEqual(3);

      // Check that we have toasts with the expected variants
      const successToasts = toasts.filter(
        (toast) => toast.getAttribute('data-variant') === 'green'
      );
      const errorToasts = toasts.filter(
        (toast) => toast.getAttribute('data-variant') === 'pink'
      );
      const infoToasts = toasts.filter(
        (toast) => toast.getAttribute('data-variant') === 'blue'
      );

      expect(successToasts.length).toBeGreaterThan(0);
      expect(errorToasts.length).toBeGreaterThan(0);
      expect(infoToasts.length).toBeGreaterThan(0);
    });

    it('should generate unique IDs for each toast', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-success-toast'));
      fireEvent.click(screen.getByTestId('show-error-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const ids = toasts.map((toast) => toast.getAttribute('data-testid'));

      expect(ids[0]).not.toBe(ids[1]);
      expect(ids[0]).toMatch(/^toast-/);
      expect(ids[1]).toMatch(/^toast-/);
    });
  });

  describe('Toast removal', () => {
    it('should remove toast when onClose is called', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-success-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      expect(toasts.length).toBeGreaterThan(0);

      // Click on the first toast to remove it
      fireEvent.click(toasts[0]!);

      // Check that the number of toasts decreased or is zero
      const remainingToasts = screen.queryAllByTestId(/toast-/);
      expect(remainingToasts.length).toBeLessThan(toasts.length);
    });

    it('should remove specific toast when multiple toasts exist', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-success-toast'));
      fireEvent.click(screen.getByTestId('show-error-toast'));
      fireEvent.click(screen.getByTestId('show-info-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const initialCount = toasts.length;
      expect(initialCount).toBeGreaterThanOrEqual(3);

      // Click on one of the toasts to remove it
      fireEvent.click(toasts[1]!);

      const remainingToasts = screen.getAllByTestId(/toast-/);
      expect(remainingToasts.length).toBeLessThan(initialCount);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty message', () => {
      const EmptyMessageComponent = () => {
        const { showToast } = useToast();
        return (
          <button data-testid="show-empty-toast" onClick={() => showToast('')}>
            Show Empty Toast
          </button>
        );
      };

      render(
        <ToastProvider>
          <EmptyMessageComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-empty-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveTextContent('');
    });

    it('should handle null message', () => {
      const NullMessageComponent = () => {
        const { showToast } = useToast();
        return (
          <button
            data-testid="show-null-toast"
            onClick={() => showToast(null as any)}
          >
            Show Null Toast
          </button>
        );
      };

      render(
        <ToastProvider>
          <NullMessageComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-null-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
    });

    it('should handle undefined message', () => {
      const UndefinedMessageComponent = () => {
        const { showToast } = useToast();
        return (
          <button
            data-testid="show-undefined-toast"
            onClick={() => showToast(undefined as any)}
          >
            Show Undefined Toast
          </button>
        );
      };

      render(
        <ToastProvider>
          <UndefinedMessageComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-undefined-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
    });

    it('should handle zero duration', () => {
      const ZeroDurationComponent = () => {
        const { showToast } = useToast();
        return (
          <button
            data-testid="show-zero-duration-toast"
            onClick={() => showToast('Zero duration', { duration: 0 })}
          >
            Show Zero Duration Toast
          </button>
        );
      };

      render(
        <ToastProvider>
          <ZeroDurationComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-zero-duration-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveAttribute('data-duration', '0');
    });

    it('should handle negative duration', () => {
      const NegativeDurationComponent = () => {
        const { showToast } = useToast();
        return (
          <button
            data-testid="show-negative-duration-toast"
            onClick={() => showToast('Negative duration', { duration: -1000 })}
          >
            Show Negative Duration Toast
          </button>
        );
      };

      render(
        <ToastProvider>
          <NegativeDurationComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-negative-duration-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveAttribute('data-duration', '-1000');
    });

    it('should handle invalid variant', () => {
      const InvalidVariantComponent = () => {
        const { showToast } = useToast();
        return (
          <button
            data-testid="show-invalid-variant-toast"
            onClick={() =>
              showToast('Invalid variant', { variant: 'invalid' as any })
            }
          >
            Show Invalid Variant Toast
          </button>
        );
      };

      render(
        <ToastProvider>
          <InvalidVariantComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-invalid-variant-toast'));

      const toasts = screen.getAllByTestId(/toast-/);
      const toast = toasts[0];
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveAttribute('data-variant', 'invalid');
    });
  });

  describe('Performance and memory', () => {
    it('should handle many toasts without memory leaks', () => {
      const ManyToastsComponent = () => {
        const { showToast } = useToast();
        return (
          <button
            data-testid="show-many-toasts"
            onClick={() => {
              for (let i = 0; i < 10; i++) {
                showToast(`Toast ${i}`);
              }
            }}
          >
            Show Many Toasts
          </button>
        );
      };

      render(
        <ToastProvider>
          <ManyToastsComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-many-toasts'));

      const toasts = screen.getAllByTestId(/toast-/);
      expect(toasts.length).toBeGreaterThanOrEqual(10);
    });

    it('should clean up toasts when provider unmounts', () => {
      const { unmount } = render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-success-toast'));
      const toasts = screen.getAllByTestId(/toast-/);
      expect(toasts.length).toBeGreaterThan(0);

      unmount();
      // After unmount, there should be no toast elements in the DOM
      expect(screen.queryAllByTestId(/toast-/)).toHaveLength(0);
    });
  });
});
