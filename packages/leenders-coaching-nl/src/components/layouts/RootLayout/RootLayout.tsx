import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Box } from '@/components/ui/Box';
import { GlobalDataProvider } from '@/components/providers/GlobalDataProvider';

import '@/app/globals.css';

type RootLayoutProps = {
  children: ReactNode;
  fonts: {
    variables: string[];
  };
};

/**
 * Root layout component with theme support, navigation, and footer
 */
export const RootLayout = async ({ children, fonts }: RootLayoutProps) => {
  return (
    <Box
      as="html"
      lang="nl"
      className={fonts.variables.join(' ')}
      suppressHydrationWarning
    >
      <Box as="body" className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalDataProvider>
            {children}
          </GlobalDataProvider>
          <Analytics />
        </ThemeProvider>
      </Box>
    </Box>
  );
};
