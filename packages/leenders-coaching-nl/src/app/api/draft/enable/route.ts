import { client } from '@/utilities/sanity';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const token = process.env.SANITY_VIEWER_TOKEN ?? process.env.SANITY_API_TOKEN;
if (!token) {
  throw new Error(
    'Missing SANITY_VIEWER_TOKEN (or SANITY_API_TOKEN) for preview'
  );
}

const previewSecret = process.env.SANITY_PREVIEW_SECRET;
if (!previewSecret) {
  throw new Error('Missing SANITY_PREVIEW_SECRET for preview validation');
}

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
export const GET = async (request: NextRequest): Promise<Response> => {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('sanity-preview-secret');

  /* Verify the secret token to prevent unauthorized access */
  if (secret !== previewSecret) {
    return new Response('Invalid token', { status: 401 });
  }

  /* Use the built-in draft mode enabler with our configured client */
  const { GET: enableDraftMode } = defineEnableDraftMode({
    client: client.withConfig({
      token: process.env.SANITY_VIEWER_TOKEN || process.env.SANITY_API_TOKEN,
      useCdn: false,
      stega: {
        studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
      },
    }),
  });

  return enableDraftMode(request);
};
