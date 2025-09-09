import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.ts'),
    },
  },
  staticDirs: ['../public'],
  docs: {
    defaultName: 'Documentation',
  },
  viteFinal: async (config) => {
    // Add path aliases to match tsconfig.json
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    // Add bundle analysis plugin when building
    if (process.env.ANALYZE_STORYBOOK === 'true') {
      config.plugins = config.plugins || [];
      config.plugins.push(
        visualizer({
          filename: path.resolve(
            __dirname,
            '../storybook-static/storybook-bundle-analysis.html'
          ),
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap', // or 'sunburst', 'network'
        })
      );
    }

    return config;
  },
};

export default config;
