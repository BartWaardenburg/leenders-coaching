import type { Preview } from '@storybook/react';

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
};

export default preview;
