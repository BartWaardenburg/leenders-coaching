import { client } from '@/utilities/sanity/sanity';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';

/**
 * Enable draft mode for visual editing
 * This route is called by Sanity's Presentation Tool when entering preview mode
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN || process.env.SANITY_API_TOKEN,
  }),
});
