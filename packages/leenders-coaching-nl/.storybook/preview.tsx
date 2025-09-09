import React from 'react';
import type { Preview } from '@storybook/react';
import {
  ConfigProvider,
  defaultConfig,
} from '../src/components/providers/ConfigProvider';
import { ThemeProvider } from '../src/components/providers/ThemeProvider';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Disable Chromatic for stories that use external services
    chromatic: {
      // Disable for stories that might have timing issues
      delay: 1000,
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider config={defaultConfig}>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </ConfigProvider>
    ),
  ],
};

export default preview;
