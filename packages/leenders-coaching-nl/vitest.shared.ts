import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * The directory name of the current module.
 */
const __dirname: string = fileURLToPath(new URL('.', import.meta.url));

/**
 * Absolute path to the src directory.
 */
const SRC: string = path.resolve(__dirname, './src');

/**
 * Aliases for module resolution.
 * @type {{ [key: string]: string }}
 */
export const aliases: { [key: string]: string } = {
  '@': SRC,
};

/**
 * Dependencies to exclude from optimization.
 * @type {{ exclude: string[] }}
 */
export const optimizeDeps: { exclude: string[] } = {
  exclude: ['@react-email/render'],
};

/**
 * Base configuration for code coverage.
 * Specifies which files are included/excluded from coverage reports.
 */
export const coverageBase = {
  provider: 'v8' as const,
  reporter: ['text', 'html', 'lcov', 'json-summary'],
  include: ['src/**/*.{js,jsx,ts,tsx}'],
  exclude: [
    'node_modules/**',
    'src/test/**',
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
 * JSDOM environment setup for Vitest.
 */
export const jsdomSetup = {
  environment: 'jsdom' as const,
  globals: true,
  setupFiles: ['./src/test/setup.ts'],
  environmentOptions: { jsdom: { url: 'http://localhost' } },
};
