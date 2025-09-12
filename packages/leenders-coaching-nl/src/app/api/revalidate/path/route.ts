import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = { path?: string };

/**
 * Handles POST requests from Sanity webhooks to surgically revalidate individual pages by their path.
 * This provides more granular control than tag-based revalidation and allows for longer cache times
 * since individual pages can be revalidated on-demand.
 *
 * @param req - The incoming Next.js request object
 * @returns A JSON response indicating the result of the revalidation
 */
export const POST = async (req: NextRequest) => {
  try {
    /* Ensure the secret environment variable is set */
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response(
        'Missing environment variable SANITY_REVALIDATE_SECRET',
        { status: 500 }
      );
    }

    /* Parse the webhook body and validate the signature */
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!body?.path) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    /* Revalidate the specific path */
    revalidatePath(body.path);

    const message = `Updated route: ${body.path}`;
    /* Log the successful revalidation */
    console.log(`✅ Path revalidated: ${body.path}`);

    return NextResponse.json({ body, message });
  } catch (err) {
    /* Log and return any errors that occur during revalidation */
    console.error('❌ Path revalidation error:', err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
};
