"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { FiMenu, FiX } from "react-icons/fi";

import { IconButton } from "@/components/ui/IconButton";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { uiConfig } from "@/config/ui.config";

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
      <header
        className={twMerge(
          "fixed top-0 z-50 w-full transition-colors duration-300 bg-background",
          className,
        )}
        style={isMenuOpen ? { backgroundColor: "hsl(var(--menu-background))" } : undefined}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="py-8 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <ThemeToggleButton className="transition-transform hover:scale-105" />
              <IconButton
                label={uiConfig.mobileMenu.toggleButton}
                onClick={toggleMenu}
                className="transition-transform hover:scale-105"
              >
                {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </IconButton>
            </div>
          </div>
          <div className={`h-px transition-colors duration-300 ${isMenuOpen ? 'bg-foreground/80' : 'bg-foreground/10'}`} />
        </div>
      </header>

      <div
        className={twMerge(
          "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out bg-menu",
          isMenuOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="h-screen overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 min-h-screen pt-32">
            <div className="flex flex-col h-full">
              <nav className="mb-16">
                <NavigationItems onItemClick={() => setIsMenuOpen(false)} />
              </nav>
              <MenuFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
