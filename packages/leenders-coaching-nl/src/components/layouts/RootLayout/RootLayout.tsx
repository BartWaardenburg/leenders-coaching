import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Box } from '@/components/ui/Box/Box';
import { GlobalDataProvider } from '@/components/providers/GlobalDataProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import {
  ConfigProvider,
  defaultConfig,
} from '@/components/providers/ConfigProvider';
import { DisableDraftMode } from '@/components/ui/DisableDraftMode';
import { PreconnectResources } from '@/components/ui/PreconnectResources';

import '@/app/globals.css';

type RootLayoutProps = {
  children: ReactNode;
  fonts: {
    variables: string[];
  };
};

/**
 * Root layout component with theme support, navigation, and footer
 * Includes visual editing overlay when in draft mode
 */
export const RootLayout = async ({ children, fonts }: RootLayoutProps) => {
  const { isEnabled } = await draftMode();

  return (
    <Box
      as="html"
      lang="nl"
      className={fonts.variables.join(' ')}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <Box as="body" className="antialiased min-h-screen flex flex-col">
        <PreconnectResources />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConfigProvider config={defaultConfig}>
            <GlobalDataProvider>
              <ToastProvider>
                {children}
                <Analytics />
                <SpeedInsights />
                {isEnabled && (
                  <>
                    <VisualEditing />
                    <DisableDraftMode />
                  </>
                )}
              </ToastProvider>
            </GlobalDataProvider>
          </ConfigProvider>
        </ThemeProvider>
      </Box>
    </Box>
  );
};
