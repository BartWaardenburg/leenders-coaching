import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

/**
 * Theme provider component that handles dark/light mode
 * Configured to prevent hydration mismatches and improve initial state detection
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="leenders-coaching-theme"
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
