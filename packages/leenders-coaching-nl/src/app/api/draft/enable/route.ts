import { client } from '@/utilities/sanity';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';

export const dynamic = 'force-dynamic'; // ensure no caching
export const revalidate = 0;

/**
 * Enable draft mode for visual editing
 * This route is called by Sanity's Presentation Tool when entering preview mode
 * The Presentation tool calls this endpoint with:
 * - sanity-preview-secret: The preview secret for validation
 * - sanity-preview-perspective: The perspective (drafts/published)
 * - sanity-preview-pathname: The current path being previewed
 *
 * @returns {Promise<void>} Response with draft mode cookies set
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN || process.env.SANITY_API_TOKEN,
  }),
});
