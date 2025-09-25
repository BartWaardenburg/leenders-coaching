import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

/**
 * Disables draft mode for visual editing.
 * This route is called by Sanity's Presentation Tool when exiting preview mode.
 * Accepts both 'sanity-preview-secret' (from Presentation tool) and 'secret' parameters.
 *
 * @param request - The incoming Next.js request object
 * @returns A redirect to the home page or a 401 response if the secret is invalid
 */
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const secret =
    searchParams.get('sanity-preview-secret') ?? searchParams.get('secret');

  /* Verify the secret token to prevent unauthorized access */
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  /* Disable draft mode */
  const draft = await draftMode();
  draft.disable();

  /* Redirect to home page */
  redirect('/');
};
