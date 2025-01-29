import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Box } from "@/components/ui/Box";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { Main } from "@/components/ui/Main";
import { footerConfig } from "@/config/footer";

import "@/app/globals.css";

type RootLayoutProps = {
  children: ReactNode;
  fonts: {
    variables: string[];
  };
};

/**
 * Root layout component with theme support, navigation, and footer
 */
export const RootLayout = ({ children, fonts }: RootLayoutProps) => {
  return (
    <Box
      as="html"
      lang="nl"
      className={fonts.variables.join(" ")}
      suppressHydrationWarning
    >
      <Box as="body" className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <Main className="flex-1">{children}</Main>
          <Footer {...footerConfig} />
          <Analytics />
        </ThemeProvider>
      </Box>
    </Box>
  );
};
