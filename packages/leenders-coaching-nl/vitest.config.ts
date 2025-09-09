/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  baseConfig,
  plugins,
  resolve,
  projects,
  coverageConfigs,
} from './vitest.shared';

const pkgRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: pkgRoot,
  cacheDir: path.join(pkgRoot, 'node_modules/.vite-vitest'),
  ...baseConfig,
  plugins,
  resolve,

  test: {
    coverage: coverageConfigs.development,
    projects: [projects.unit, projects.storybook],
  },
});
