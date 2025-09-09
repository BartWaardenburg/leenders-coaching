import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react';
import * as projectAnnotations from './preview';

// Set up environment variables for Storybook tests
process.env.NODE_ENV = 'test';
process.env.STORYBOOK = 'true';
process.env.VITEST = 'true';

// Set fallback Sanity environment variables for testing
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'storybook-fallback';
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
}
if (!process.env.NEXT_PUBLIC_SANITY_API_VERSION) {
  process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2024-02-14';
}

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
