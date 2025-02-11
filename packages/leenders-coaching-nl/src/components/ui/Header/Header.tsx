"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { IconToggleButton } from "@/components/ui/IconToggleButton";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { Container } from "@/components/ui/Container";
import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";
import { uiConfig } from "@/config/ui.config";
import { iconPaths } from "@/config/icons.config";

import { Logo } from "./Logo";
import { NavigationItems } from "./NavigationItems";
import { MenuFooter } from "./MenuFooter";

type HeaderProps = ComponentPropsWithoutRef<"header">;

/**
 * Header component with hamburger menu and full-screen overlay
 */
export const Header = ({ className, ...props }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <Box
        as="header"
        className={twMerge(
          "fixed top-0 z-50 w-full transition-theme bg-background",
          className,
        )}
        style={isMenuOpen ? { backgroundColor: "hsl(var(--menu-background))" } : undefined}
        {...props}
      >
        <Container>
          <Flex justify="between" items="center" className="py-8">
            <Logo />
            <Flex items="center" gap={4}>
              <ThemeToggleButton className="transition-transform hover:scale-105" />
              <IconToggleButton
                isToggled={isMenuOpen}
                defaultIcon={iconPaths.menu.hamburger}
                toggledIcon={iconPaths.menu.close}
                label={uiConfig.mobileMenu.toggleButton}
                onClick={toggleMenu}
                className="transition-transform hover:scale-105"
              />
            </Flex>
          </Flex>
          <Box className={`h-px transition-theme ${isMenuOpen ? 'bg-foreground/80' : 'bg-foreground/10'}`} />
        </Container>
      </Box>

      <Box
        className={twMerge(
          "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out bg-menu",
          isMenuOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <Box className="h-screen overflow-y-auto">
          <Container className="min-h-screen pt-36">
            <Flex direction="column" className="h-full">
              <Box as="nav" className="mb-16 text-left md:text-right">
                <NavigationItems onItemClick={() => setIsMenuOpen(false)} />
              </Box>
              <MenuFooter />
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  );
};
