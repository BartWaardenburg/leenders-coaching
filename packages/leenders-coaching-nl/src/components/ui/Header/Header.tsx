'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

import { IconToggleButton } from '@/components/ui/IconToggleButton';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';
import { Container } from '@/components/ui/Container';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';
import { uiConfig } from '@/config/ui.config';
import { iconPaths } from '@/config/icons.config';

import { Logo } from './Logo';
import { NavigationItems } from './NavigationItems';
import { MenuFooter as HeaderMenuFooter } from './MenuFooter';

type NavigationItem = {
  _key: string;
  label: string;
  href: string;
};

type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'about'> & {
  navigation: NavigationItem[];
  about: {
    title: string;
    description: string;
  };
  social: {
    title: string;
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
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

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
export const Header = ({ className, navigation, about, social, contact, ...props }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
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
        as="header"
        className={twMerge(
          'fixed top-0 z-50 w-full transition-theme bg-background',
          isMenuOpen && 'bg-menu',
          className,
        )}
        {...props}
      >
        <Container>
          <Flex justify="between" items="center" className="py-8">
            <Logo />
            <Flex items="center" gap={4}>
              <ThemeToggleButton />
              <IconToggleButton
                isToggled={isMenuOpen}
                defaultIcon={iconPaths.menu.hamburger}
                toggledIcon={iconPaths.menu.close}
                label={uiConfig.mobileMenu.toggleButton}
                onClick={toggleMenu}
                speed="quick"
              />
            </Flex>
          </Flex>
          <Box
            className={twMerge(
              'h-px transition-theme',
              isMenuOpen ? 'bg-foreground/80' : 'bg-foreground/10'
            )}
          />
        </Container>
      </Box>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-menu"
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
                      <NavigationItems
                        links={navigation}
                        onItemClick={() => setIsMenuOpen(false)}
                      />
                    </Box>
                    <HeaderMenuFooter sections={menuFooter} socialLinks={[]} />
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
