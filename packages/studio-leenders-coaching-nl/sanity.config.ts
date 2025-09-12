import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';
import { locations, mainDocuments } from './lib/presentation/resolve';

/**
 * Sanity Studio configuration for Leenders Coaching.
 * Includes structure tool, vision tool, and presentation tool for content management.
 * @returns The Sanity configuration object.
 */
export default defineConfig({
  name: 'default',
  title: 'Leenders Coaching',
  projectId: 'unh7vl3r',
  dataset: 'production',
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    presentationTool({
      name: 'presentation',
      title: 'Presentation',
      resolve: { locations, mainDocuments },
      previewUrl: {
        initial:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : process.env.NEXT_PUBLIC_SITE_URL ||
              'https://leenders-coaching.nl',
        previewMode: {
          enable: '/api/draft/enable',
        },
      },
      allowOrigins: [
        'https://www.leenders-coaching.nl',
        'https://leenders-coaching.nl',
        'http://localhost:*',
      ],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  autoUpdates: false,
});
