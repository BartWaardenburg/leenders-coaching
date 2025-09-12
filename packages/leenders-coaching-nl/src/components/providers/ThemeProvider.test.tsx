import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { ThemeProvider } from './ThemeProvider';

/* Mock next-themes with a simple implementation */
vi.mock('next-themes', () => ({
  ThemeProvider: ({
    children,
    ...props
  }: {
    children: ReactNode;
    [key: string]: any;
  }) => (
    <div data-testid="next-theme-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}));

/* Test component to verify children are rendered */
const TestComponent = () => <div data-testid="test-children">Test Content</div>;

describe('ThemeProvider', () => {
  describe('Provider functionality', () => {
    it('should render children and pass correct props to NextThemeProvider', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('next-theme-provider')).toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.attribute).toBe('class');
      expect(props.defaultTheme).toBe('system');
      expect(props.enableSystem).toBe(true);
      expect(props.disableTransitionOnChange).toBe(false);
      expect(props.storageKey).toBe('leenders-coaching-theme');
    });

    it('should pass through additional props to NextThemeProvider', () => {
      const customProps = {
        forcedTheme: 'dark',
        enableColorScheme: false,
        disableTransitionOnChange: true,
      };

      render(
        <ThemeProvider {...customProps}>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.attribute).toBe('class');
      expect(props.defaultTheme).toBe('system');
      expect(props.enableSystem).toBe(true);
      expect(props.disableTransitionOnChange).toBe(true); // Should be overridden
      expect(props.storageKey).toBe('leenders-coaching-theme');
      expect(props.forcedTheme).toBe('dark');
      expect(props.enableColorScheme).toBe(false);
    });

    it('should handle multiple children', () => {
      const MultipleChildren = () => (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </>
      );

      render(
        <ThemeProvider>
          <MultipleChildren />
        </ThemeProvider>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });

    it('should handle nested components', () => {
      const NestedComponent = () => (
        <div data-testid="nested-wrapper">
          <TestComponent />
        </div>
      );

      render(
        <ThemeProvider>
          <NestedComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('nested-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });

    it('should handle null children', () => {
      const { container } = render(<ThemeProvider>{null}</ThemeProvider>);

      expect(screen.getByTestId('next-theme-provider')).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="test-children"]')
      ).not.toBeInTheDocument();
    });

    it('should handle empty children', () => {
      const { container } = render(<ThemeProvider>{undefined}</ThemeProvider>);

      expect(screen.getByTestId('next-theme-provider')).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="test-children"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('Default configuration', () => {
    it('should use correct default theme configuration', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.attribute).toBe('class');
      expect(props.defaultTheme).toBe('system');
      expect(props.enableSystem).toBe(true);
      expect(props.disableTransitionOnChange).toBe(false);
      expect(props.storageKey).toBe('leenders-coaching-theme');
    });

    it('should use class attribute for theme switching', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.attribute).toBe('class');
    });

    it('should enable system theme detection', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.enableSystem).toBe(true);
    });

    it('should use custom storage key', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.storageKey).toBe('leenders-coaching-theme');
    });

    it('should not disable transitions by default', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.disableTransitionOnChange).toBe(false);
    });
  });

  describe('Props override behavior', () => {
    it('should allow overriding defaultTheme', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.defaultTheme).toBe('dark');
    });

    it('should allow overriding enableSystem', () => {
      render(
        <ThemeProvider enableSystem={false}>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.enableSystem).toBe(false);
    });

    it('should allow overriding disableTransitionOnChange', () => {
      render(
        <ThemeProvider disableTransitionOnChange={true}>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.disableTransitionOnChange).toBe(true);
    });

    it('should allow overriding storageKey', () => {
      render(
        <ThemeProvider storageKey="custom-theme-key">
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.storageKey).toBe('custom-theme-key');
    });

    it('should allow overriding attribute', () => {
      render(
        <ThemeProvider attribute="data-theme">
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.attribute).toBe('data-theme');
    });

    it('should handle multiple prop overrides', () => {
      const customProps = {
        defaultTheme: 'light' as const,
        enableSystem: false,
        disableTransitionOnChange: true,
        storageKey: 'custom-storage',
        attribute: 'data-custom-theme' as const,
        forcedTheme: 'dark' as const,
      };

      render(
        <ThemeProvider {...customProps}>
          <TestComponent />
        </ThemeProvider>
      );

      const provider = screen.getByTestId('next-theme-provider');
      const props = JSON.parse(provider.getAttribute('data-props') || '{}');

      expect(props.defaultTheme).toBe('light');
      expect(props.enableSystem).toBe(false);
      expect(props.disableTransitionOnChange).toBe(true);
      expect(props.storageKey).toBe('custom-storage');
      expect(props.attribute).toBe('data-custom-theme');
      expect(props.forcedTheme).toBe('dark');
    });
  });

  describe('Component composition', () => {
    it('should work with other providers', () => {
      const OtherProvider = ({ children }: { children: ReactNode }) => (
        <div data-testid="other-provider">{children}</div>
      );

      render(
        <ThemeProvider>
          <OtherProvider>
            <TestComponent />
          </OtherProvider>
        </ThemeProvider>
      );

      expect(screen.getByTestId('next-theme-provider')).toBeInTheDocument();
      expect(screen.getByTestId('other-provider')).toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });

    it('should handle complex nested structure', () => {
      const Level1 = ({ children }: { children: ReactNode }) => (
        <div data-testid="level-1">{children}</div>
      );
      const Level2 = ({ children }: { children: ReactNode }) => (
        <div data-testid="level-2">{children}</div>
      );
      const Level3 = ({ children }: { children: ReactNode }) => (
        <div data-testid="level-3">{children}</div>
      );

      render(
        <ThemeProvider>
          <Level1>
            <Level2>
              <Level3>
                <TestComponent />
              </Level3>
            </Level2>
          </Level1>
        </ThemeProvider>
      );

      expect(screen.getByTestId('next-theme-provider')).toBeInTheDocument();
      expect(screen.getByTestId('level-1')).toBeInTheDocument();
      expect(screen.getByTestId('level-2')).toBeInTheDocument();
      expect(screen.getByTestId('level-3')).toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });
  });
});
