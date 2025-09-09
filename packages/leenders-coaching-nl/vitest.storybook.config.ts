/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { aliases, optimizeDeps } from './vitest.shared';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.join(__dirname, '.storybook'),
    }),
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
    exclude: ['**/src/emails/email-templates.stories.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json-summary'],
      reportsDirectory: 'coverage/storybook',
      clean: false,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.stories.{js,jsx,ts,tsx}',
        'src/test/**',
        '.storybook/**',
        'node_modules/**',
      ],
      reportOnFailure: true,
    },
  },
  resolve: { alias: aliases },
  optimizeDeps,
});
