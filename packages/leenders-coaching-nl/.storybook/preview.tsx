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

/**
 * Custom viewports that align with Tailwind CSS default breakpoints
 * Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
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

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    chromatic: {
      pauseAnimationAtEnd: true,
      modes: allModes,
    },
    nextjs: {
      appDirectory: true,
    },
    docs: {
      autodocs: 'tag',
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: 'light', color: '#ffffff' },
        { name: 'dark', class: 'dark', color: '#000000' },
        { name: 'system', class: 'system', color: '#888888' },
      ],
    },
    viewport: {
      options: tailwindViewports,
      defaultViewport: 'lg',
    },
  },
  tags: ['autodocs'],
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
        system: 'system',
      },
      defaultTheme: 'light',
    }),
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
