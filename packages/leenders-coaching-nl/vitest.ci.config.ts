/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import {
  aliases,
  optimizeDeps,
  coverageBase,
  jsdomSetup,
} from './vitest.shared';

export default defineConfig({
  test: {
    ...jsdomSetup,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules/**',
      'dist/**',
      '.storybook/**',
      '**/*.stories.{js,jsx,ts,tsx}',
      'coverage/**',
      'storybook-static/**',
    ],
    browser: {
      enabled: false,
    },
    coverage: {
      ...coverageBase,
      reportsDirectory: 'coverage/unit',
      clean: true,
      thresholds: { statements: 0, branches: 0, functions: 0, lines: 0 },
    },
  },
  resolve: { alias: aliases },
  optimizeDeps,
});
