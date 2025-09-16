'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/utilities/cn';
import { motion, AnimatePresence } from 'motion/react';

import { IconToggleButton } from '@/components/ui/IconToggleButton';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';
import { Container } from '@/components/ui/Container';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';
import { useConfig } from '@/components/providers/ClientConfigProvider';
import { iconPaths } from '@/utilities/icons-config';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { lockScroll, unlockScroll } from '@/utilities/scroll-lock';

import { Logo } from './Logo';
import { NavigationItems } from './NavigationItems';
import { MenuFooter as HeaderMenuFooter } from './MenuFooter';

type NavigationItem = {
  _key: string;
  label: string;
  href: string;
};

export type SocialLink = {
  _key: string;
  platform: string;
  url: string;
};

type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'about'> & {
  navigation: NavigationItem[];
  about: {
    title: string;
    description: string;
  };
  social: {
    title: string;
    links: SocialLink[];
  };
  contact: {
    title: string;
    projectEnquiry: {
      label: string;
      href: string;
      linkText: string;
    };
    generalEnquiry: {
      label: string;
      href: string;
      linkText: string;
    };
  };
};

/* Animation variants for the menu overlay */
const menuVariants = {
  hidden: {
    y: '-100%',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
} as const;

/* Animation variants for the menu content */
const contentVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
};

/**
 * Header component with hamburger menu and full-screen overlay
 */
export const Header = ({
  className,
  navigation,
  about,
  social,
  contact,
  ...props
}: HeaderProps) => {
  const config = useConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Make the main content inert for screen readers when menu is open
    const mainContent = document.querySelector('main');
    if (mainContent) {
      if (isMenuOpen) {
        mainContent.setAttribute('inert', 'true');
      } else {
        mainContent.removeAttribute('inert');
      }
    }

    return () => {
      unlockScroll();
      if (mainContent) {
        mainContent.removeAttribute('inert');
      }
    };
  }, [isMenuOpen]);

  // Focus trap functionality
  useFocusTrap(isMenuOpen, menuRef, hamburgerRef.current);

  // Set CSS variable for header height using ResizeObserver
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      const height = header.offsetHeight;
      document.documentElement.style.setProperty('--header-h', `${height}px`);
    };

    // Set initial height
    updateHeaderHeight();

    // Use ResizeObserver to watch for header size changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    resizeObserver.observe(header);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuFooter = {
    about,
    social,
    contact,
  };

  return (
    <>
      <Box
        ref={headerRef}
        as="header"
        className={cn(
          'fixed top-0 z-50 w-full transition-theme bg-background',
          isMenuOpen &&
            '[background-color:var(--color-menu-background)] dark:[background-color:var(--color-menu-background-dark)]',
          className
        )}
        {...props}
      >
        <Container>
          <Flex justify="between" items="center" className="py-8">
            <Logo />
            <Flex items="center" gap={4}>
              <ThemeToggleButton />
              <IconToggleButton
                ref={hamburgerRef}
                isToggled={isMenuOpen}
                defaultIcon={iconPaths.menu.hamburger}
                toggledIcon={iconPaths.menu.close}
                label={config.interface.mobileMenu.toggleButton}
                onClick={toggleMenu}
                speed="quick"
                aria-expanded={isMenuOpen}
                aria-controls="header-menu"
              />
            </Flex>
          </Flex>
          <Box
            className={cn(
              'h-px transition-theme',
              isMenuOpen ? 'bg-foreground/80' : 'bg-foreground/10'
            )}
          />
        </Container>
      </Box>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="header-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed inset-0 z-40 [background-color:var(--color-menu-background)] dark:[background-color:var(--color-menu-background-dark)] transition-theme"
            role="dialog"
            aria-modal="true"
            aria-labelledby="header-menu-title"
          >
            <Box className="h-screen overflow-y-auto">
              <Container className="min-h-screen pt-36">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Flex direction="column" className="h-full">
                    <Box as="nav" className="mb-16 text-left md:text-right">
                      <h2 id="header-menu-title" className="sr-only">
                        Navigatiemenu
                      </h2>
                      <NavigationItems
                        links={navigation}
                        onItemClick={() => setIsMenuOpen(false)}
                      />
                    </Box>
                    <HeaderMenuFooter sections={menuFooter} />
                  </Flex>
                </motion.div>
              </Container>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
