import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import {
  ConfigProvider,
  defaultConfig,
} from '../src/components/providers/ConfigProvider';
import { ThemeProvider } from '../src/components/providers/ThemeProvider';
import { ToastProvider } from '../src/components/providers/ToastProvider';
import { allModes } from './modes';
import '../src/app/globals.css';
import isChromatic from 'chromatic/isChromatic';

import { MotionConfig } from 'motion/react';

/**
 * Custom viewports that align with Tailwind CSS default breakpoints.
 * Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
 * Used for Storybook viewport switching.
 */
const tailwindViewports = {
  xs: {
    name: 'Extra Small (< 640px)',
    styles: {
      width: '375px',
      height: '667px',
    },
    type: 'mobile',
  },
  sm: {
    name: 'Small (sm: 640px)',
    styles: {
      width: '640px',
      height: '100%',
    },
    type: 'mobile',
  },
  md: {
    name: 'Medium (md: 768px)',
    styles: {
      width: '768px',
      height: '100%',
    },
    type: 'tablet',
  },
  lg: {
    name: 'Large (lg: 1024px)',
    styles: {
      width: '1024px',
      height: '100%',
    },
    type: 'desktop',
  },
  xl: {
    name: 'Extra Large (xl: 1280px)',
    styles: {
      width: '1280px',
      height: '100%',
    },
    type: 'desktop',
  },
  '2xl': {
    name: '2X Large (2xl: 1536px)',
    styles: {
      width: '1536px',
      height: '100%',
    },
    type: 'desktop',
  },
};

/**
 * Storybook global preview configuration.
 * - Sets up parameters for actions, Chromatic, Next.js, docs, themes, viewport, and a11y.
 * - Applies global decorators for theming and context providers.
 * @see https://storybook.js.org/docs/react/configure/overview
 */
const preview: Preview = {
  parameters: {
    /**
     * Automatically match action handlers for props starting with "on".
     */
    actions: { argTypesRegex: '^on[A-Z].*' },

    /**
     * Chromatic visual regression testing configuration.
     * - pauseAnimationAtEnd: Pauses CSS animations for snapshot stability.
     * - modes: Custom theme/viewport modes for Chromatic.
     * - Use 'delay' sparingly, only if assertions don't suffice.
     */
    chromatic: {
      pauseAnimationAtEnd: true,
      modes: allModes,
      // Tell Chromatic to emulate reduced motion at the browser level, too.
      prefersReducedMotion: 'reduce',
      // delay: 300, // Use sparingly, only if assertions don't suffice
    },

    /**
     * Motion configuration for deterministic testing.
     * - Keep these as *defaults* for dev; the decorator will override in tests.
     * - Override per-story when you need to test actual animation behavior.
     */
    reducedMotion: 'user',
    motionTransition: undefined,

    /**
     * Next.js app directory mode for Storybook.
     */
    nextjs: {
      appDirectory: true,
    },

    /**
     * Enable autodocs globally using the 'autodocs' tag.
     */
    docs: {
      autodocs: 'tag',
    },

    /**
     * Theme switching configuration for Storybook UI.
     */
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: 'light', color: '#ffffff' },
        { name: 'dark', class: 'dark', color: '#000000' },
        { name: 'system', class: 'system', color: '#888888' },
      ],
    },

    /**
     * Custom viewport options matching Tailwind breakpoints.
     */
    viewport: {
      options: tailwindViewports,
      defaultViewport: 'lg',
    },

    /**
     * Accessibility (a11y) testing configuration.
     * - 'todo': Show a11y violations in the test UI only.
     * - 'error': Fail CI on a11y violations.
     * - 'off': Skip a11y checks entirely.
     */
    a11y: {
      test: 'todo',
    },
  },
  /**
   * Enable Storybook autodocs globally.
   */
  tags: ['autodocs'],
  /**
   * Global decorators to wrap all stories with providers and theming.
   */
  decorators: [
    /**
     * Theme switching decorator using class names.
     */
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
        system: 'system',
      },
      defaultTheme: 'light',
    }),
    /**
     * Motion configuration decorator for deterministic testing.
     * Enforces reduced motion and zero-duration transitions in test contexts.
     * Stories can override via parameters when testing actual animation behavior.
     */
    (Story, context) => {
      const isStorybookTestRunner =
        typeof navigator !== 'undefined' &&
        /StorybookTestRunner/i.test(navigator.userAgent);
      const inTest = isStorybookTestRunner || isChromatic();

      // In tests: zero-duration, no animations.
      const reduced = inTest
        ? 'always'
        : (context.parameters.reducedMotion ?? 'user');
      const transition = inTest
        ? { duration: 0 }
        : (context.parameters.motionTransition ?? undefined);

      return (
        <MotionConfig reducedMotion={reduced} transition={transition}>
          <Story />
        </MotionConfig>
      );
    },
    /**
     * Wrap all stories with ConfigProvider, ThemeProvider, and ToastProvider.
     * @param Story - The story component to render.
     */
    (Story) => (
      <ConfigProvider config={defaultConfig}>
        <ThemeProvider>
          <ToastProvider>
            <Story />
          </ToastProvider>
        </ThemeProvider>
      </ConfigProvider>
    ),
  ],
};

export default preview;
