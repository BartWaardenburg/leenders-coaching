import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const pkgRoot = fileURLToPath(new URL('.', import.meta.url));

/**
 * Dependencies to optimize and exclude for Vitest runs.
 * Used to speed up test startup and avoid unnecessary bundling.
 */
export const optimizeDeps = {
  include: [
    'sb-original/default-loader',
    'sb-original/image-context',
    'chromatic/isChromatic',
  ],
  exclude: ['@react-email/render', 'markdown-to-jsx'],
};

/**
 * Shared resolve configuration for aliases and extensions.
 * Ensures consistency across all Vitest configs.
 */
export const resolveConfig = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  dedupe: ['react', 'react-dom'],
};

/**
 * Storybook plugin configuration for Vitest.
 * Only used for Storybook tests.
 */
export const storybookPlugin = storybookTest({
  configDir: path.join(pkgRoot, '.storybook'),
  storybookScript: 'pnpm storybook',
  tags: {
    include: ['test'],
  },
});

/**
 * Shared plugins configuration for Vitest.
 * Empty by default - plugins are added per project as needed.
 */
export const plugins = [];

/**
 * Shared resolve configuration with aliases.
 * Maps "@" to the src directory.
 */
export const resolve = {
  alias: {
    '@': path.resolve(pkgRoot, 'src'),
  },
  ...resolveConfig,
};

/**
 * Base coverage configuration for Vitest.
 * Used as a base for both development and CI coverage configs.
 */
export const coverageBase = {
  provider: 'v8' as const,
  reporter: ['text', 'html', 'lcov', 'json-summary'],
  include: ['src/**/*.{js,jsx,ts,tsx}'],
  exclude: [
    'node_modules/**',
    'src/test/**',
    'src/types/**',
    '.storybook/**',
    /* Config files */
    '**/*.config.{js,ts,mjs,cjs}',
    '**/lighthouserc.js',
    '**/next.config.ts',
    '**/tailwind.config.ts',
    '**/postcss.config.mjs',
    '**/eslint.config.mjs',
    '**/vitest.config.ts',
    '**/vitest.ci.config.ts',
    '**/vitest.storybook.config.ts',
    /* Build / output */
    '.next/**',
    'dist/**',
    'build/**',
    'coverage/**',
    'storybook-static/**',
    /* Tests & stories */
    '**/*.stories.{js,jsx,ts,tsx}',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    /* Types */
    '**/*.d.ts',
  ],
  reportOnFailure: true,
};

/**
 * JSDOM environment setup for unit tests.
 * Used for React and DOM-based testing.
 */
export const jsdomSetup = {
  environment: 'jsdom' as const,
  globals: true,
  setupFiles: ['./src/test/setup.ts'],
  environmentOptions: { jsdom: { url: 'http://localhost' } },
};

/**
 * Browser environment setup for Storybook tests.
 * Uses Playwright for browser-based testing.
 * Optimized for container usage with prebaked browsers.
 */
export const browserSetup = {
  browser: {
    enabled: true,
    headless: true,
    provider: 'playwright',
    instances: [{ browser: 'chromium' }],
    // Prefer regular chromium over headless shell if available
    useHeadlessShell: false,
    // Container-optimized settings
    isolate: false, // Better performance in containers
  },
  setupFiles: ['.storybook/vitest.setup.ts'],
};

/**
 * Patterns for test file inclusion and exclusion.
 */
export const testPatterns = {
  unit: ['src/**/*.test.{ts,tsx}'],
  storybook: ['src/**/*.stories.{ts,tsx}'],
  exclude: [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/src/emails/email-templates.stories.tsx',
  ],
};

/**
 * Exclude patterns for different test types.
 */
export const excludePatterns = {
  unit: [
    'node_modules/**',
    'dist/**',
    '.storybook/**',
    '**/*.stories.{js,jsx,ts,tsx}',
    'coverage/**',
    'storybook-static/**',
  ],
  storybook: [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/src/emails/email-templates.stories.tsx',
  ],
};

/**
 * Shared project configurations for Vitest.
 * - unit: for unit tests (jsdom)
 * - storybook: for Storybook stories (browser)
 */
export const projects = {
  unit: {
    extends: true as const,
    plugins: [],
    test: {
      name: 'unit',
      ...jsdomSetup,
      include: testPatterns.unit,
      exclude: excludePatterns.unit,
      browser: { enabled: false },
    },
  },
  storybook: {
    extends: true as const,
    plugins: [storybookPlugin],
    test: {
      name: 'storybook',
      ...browserSetup,
      include: testPatterns.storybook,
      exclude: excludePatterns.storybook,
    },
  },
};

/**
 * Shared coverage configurations for development and CI.
 */
export const coverageConfigs = {
  development: {
    ...coverageBase,
    reportsDirectory: 'coverage',
    clean: true,
    thresholds: { statements: 70, branches: 70, functions: 70, lines: 70 },
  },
  ci: {
    ...coverageBase,
    reportsDirectory: 'coverage',
    clean: true,
    thresholds: { statements: 0, branches: 0, functions: 0, lines: 0 },
    watermarks: {
      statements: [50, 80] as [number, number],
      branches: [50, 80] as [number, number],
      functions: [50, 80] as [number, number],
      lines: [50, 80] as [number, number],
    },
  },
};

/**
 * Base Vitest config fragment.
 * Used in all Vitest config files for this package.
 */
export const baseConfig = {
  optimizeDeps,
  define: { 'import.meta.vitest': 'undefined' },
  esbuild: { jsx: 'transform' as const },
};
