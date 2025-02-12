import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { useDarkMode } from 'storybook-dark-mode';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {},
    layout: 'fullscreen',
    backgrounds: {
      disable: true,
    },
    darkMode: {
      current: 'light',
      dark: { className: 'dark' },
      light: { className: 'light' },
      stylePreview: true,
      classTarget: 'html',
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      const isDarkMode = useDarkMode();

      return (
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          forcedTheme={isDarkMode ? 'dark' : 'light'}
        >
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
