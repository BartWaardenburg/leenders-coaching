import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * Storybook configuration for leenders-coaching-nl.
 * - Sets up stories, addons, framework, static directories, and docs.
 * - Customizes Vite config for path aliases and optional bundle analysis.
 */
const config: StorybookConfig = {
  /**
   * Glob pattern for locating story files.
   */
  stories: ['../src/**/*.stories.tsx'],
  /**
   * List of Storybook addons to enable.
   */
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  /**
   * Framework configuration for Next.js with Vite.
   */
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      /**
       * Path to the Next.js config file.
       */
      nextConfigPath: path.resolve(__dirname, '../next.config.ts'),
    },
  },
  /**
   * Directories to serve as static assets in Storybook.
   */
  staticDirs: ['../public'],
  /**
   * Documentation panel configuration.
   */
  docs: {
    defaultName: 'Documentation',
  },
  /**
   * Final Vite configuration override.
   * Adds path aliases and optionally the bundle visualizer plugin.
   * @param config - The existing Vite config object.
   * @returns The modified Vite config object.
   */
  viteFinal: async (config) => {
    // normalize existing alias into array
    const existing = Array.isArray(config.resolve?.alias)
      ? config.resolve!.alias
      : Object.entries(config.resolve?.alias ?? {}).map(
          ([find, replacement]) => ({ find, replacement })
        );

    const finalConfig = {
      ...config,
      resolve: {
        ...(config.resolve ?? {}),
        alias: [
          ...existing,
          {
            find: /^@\//,
            replacement: path.resolve(__dirname, '../src') + '/',
          },
        ],
      },
    };

    /**
     * If ANALYZE_STORYBOOK is set, add the rollup visualizer plugin
     * to generate a bundle analysis report after build.
     */
    if (process.env.ANALYZE_STORYBOOK === 'true') {
      finalConfig.plugins = finalConfig.plugins || [];
      finalConfig.plugins.push(
        visualizer({
          filename: path.resolve(
            __dirname,
            '../storybook-static/storybook-bundle-analysis.html'
          ),
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        })
      );
    }

    return finalConfig;
  },
};

export default config;
