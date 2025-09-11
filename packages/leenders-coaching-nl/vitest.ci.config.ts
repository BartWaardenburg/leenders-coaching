/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  baseConfig,
  resolve,
  projects,
  coverageConfigs,
} from './vitest.shared';

const pkgRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: pkgRoot,
  cacheDir: path.join(pkgRoot, 'node_modules/.vite-vitest-ci'),
  ...baseConfig,
  resolve,

  test: {
    coverage: coverageConfigs.ci,
    projects: [projects.unit, projects.storybook],
  },
});
