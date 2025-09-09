import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.ts'),
    },
  },
  staticDirs: ['../public'],
  docs: {
    defaultName: 'Documentation',
  },
  webpackFinal: async (config) => {
    // Provide fallback environment variables for Storybook
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    // Add path aliases to match tsconfig.json
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    // Define environment variables for Storybook
    config.plugins = config.plugins || [];
    config.plugins.push(
      new (require('webpack').DefinePlugin)({
        'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(
          'storybook-mock-project'
        ),
        'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(
          'storybook-mock-dataset'
        ),
        'process.env.NEXT_PUBLIC_SANITY_API_VERSION':
          JSON.stringify('2024-02-14'),
        'process.env.SANITY_API_TOKEN': JSON.stringify('storybook-mock-token'),
      })
    );

    return config;
  },
};

export default config;
