import React from 'react';
import type { Preview } from '@storybook/nextjs';
import { withThemeByClassName } from '@storybook/addon-themes';
import {
  ConfigProvider,
  defaultConfig as baseConfig,
} from '../src/components/providers/ConfigProvider';
import { ToastProvider } from '../src/components/ui/Toast/ToastManager';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      disable: true,
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => {
      return (
        <ConfigProvider config={baseConfig}>
          <ToastProvider>
            <Story />
          </ToastProvider>
        </ConfigProvider>
      );
    },
  ],
};

export default preview;
