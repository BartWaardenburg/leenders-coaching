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
      thresholds: { statements: 70, branches: 70, functions: 70, lines: 70 },
    },
  },
  resolve: { alias: aliases },
  optimizeDeps,
});
