/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json-summary'],
      exclude: [
        'node_modules/',
        'src/test/setup.ts',
        // Configuration files
        '**/*.config.{js,ts,mjs}',
        '**/lighthouserc.js',
        '**/next.config.ts',
        '**/tailwind.config.ts',
        '**/postcss.config.mjs',
        '**/eslint.config.mjs',
        '**/vitest.config.ts',
        // Type definitions
        '**/*.d.ts',
        // Build and output directories
        '.next/**',
        'dist/**',
        'build/**',
        'coverage/**',
        'storybook-static/**',
        // Stories and test files
        '**/*.stories.{js,jsx,ts,tsx}',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
      ],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      reportOnFailure: true,
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
