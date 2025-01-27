import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Box } from "@/components/ui/Box";
import { Footer } from "@/components/ui/Footer";
import { GradientBackground } from "@/components/ui/GradientBackground";
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
      lang="en"
      className={fonts.variables.join(" ")}
      suppressHydrationWarning
    >
      <Box as="body" className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GradientBackground>
            <Header />
            <Main>{children}</Main>
            <Footer {...footerConfig} />
          </GradientBackground>
        </ThemeProvider>
      </Box>
    </Box>
  );
};
