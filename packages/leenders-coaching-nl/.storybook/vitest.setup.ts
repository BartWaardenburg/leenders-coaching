import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/nextjs-vite';
import * as projectAnnotations from './preview';

/**
 * Set up environment variables for Storybook tests.
 */
process.env.NODE_ENV = 'test';
process.env.STORYBOOK = 'true';
process.env.VITEST = 'true';

/**
 * Set fallback Sanity environment variables for testing if not already defined.
 */
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'storybook-fallback';
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
}
if (!process.env.NEXT_PUBLIC_SANITY_API_VERSION) {
  process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2024-02-14';
}

/**
 * Mock Next.js router for Storybook tests.
 * This prevents the "expected app router to be mounted" error when components use useRouter.
 * Note: This mock is handled by the Storybook framework itself when running in Storybook mode.
 * The actual mocking is done through Storybook's built-in mocking capabilities.
 */

/**
 * Apply the correct configuration when testing stories with Vitest.
 * See: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
 */
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
