"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";

import { navigationConfig } from "@/config/navigation";
import { iconPaths } from "@/config/icons.config";

import { MobileMenu } from "./MobileMenu";
import { MobileMenuButton } from "./MobileMenuButton";
import { NavigationLink, BrandLink } from "./NavigationLink";

type NavigationProps = ComponentPropsWithoutRef<"nav">;

const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d={iconPaths.message} />
  </svg>
);

/**
 * Main navigation component with responsive design and modern animations
 */
export const Navigation = ({ className, ...props }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border/40">
      <nav className={twMerge("container mx-auto px-4", className)} {...props}>
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <BrandLink
            href={navigationConfig.brand.href}
            className="relative z-10 transition-transform hover:scale-105"
          >
            {navigationConfig.brand.title}
          </BrandLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationConfig.items.map((item) => (
              <div key={item.href} className="relative group">
                <NavigationLink
                  href={item.href}
                  className={`py-2 transition-colors ${pathname === item.href
                    ? "text-primary"
                    : "hover:text-primary"
                    }`}
                >
                  {item.label}
                </NavigationLink>
                <div
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out ${pathname === item.href
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </div>
            ))}
            <div className="relative group">
              <ThemeToggleButton className="transition-transform hover:scale-110" />
            </div>
            <NavigationLink href={navigationConfig.cta.href}>
              <Button
                variant="primary"
                className="relative overflow-hidden w-12 h-12 rounded-full p-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                <span className="sr-only">{navigationConfig.cta.label}</span>
                <MessageIcon />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 animate-shimmer" />
              </Button>
            </NavigationLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggleButton className="transition-transform hover:scale-110" />
            <MobileMenuButton
              onClick={toggleMobileMenu}
              className="transition-transform hover:scale-105"
            />
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      </nav>
    </div>
  );
};
