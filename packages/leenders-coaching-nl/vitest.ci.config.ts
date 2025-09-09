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
