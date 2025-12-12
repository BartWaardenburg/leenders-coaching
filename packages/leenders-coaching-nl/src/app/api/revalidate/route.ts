import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string } | string;
  path?: string | null;
};

/**
 * Handles POST requests from Sanity webhooks to trigger cache revalidation.
 * This endpoint is called when content is published or updated in Sanity.
 *
 * @param req - The incoming Next.js request object
 * @returns A JSON response indicating the result of the revalidation
 */
export async function POST(req: NextRequest) {
  try {
    /* Ensure the secret environment variable is set */
    if (!process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { message: 'Missing environment variable SANITY_WEBHOOK_SECRET' },
        { status: 500 }
      );
    }

    /* Parse the webhook body and validate the signature */
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: 'Bad Request - missing _type' },
        { status: 400 }
      );
    }

    const { _type, slug, path } = body;

    if (_type) revalidateTag(_type, 'max');

    // Handle different content types
    switch (_type) {
      case 'post':
        const postSlug = typeof slug === 'string' ? slug : slug?.current;
        if (postSlug) {
          revalidateTag(`post:${postSlug}`, 'max');
          if (path) revalidatePath(path, 'page');
          // Fallback: if path is missing (delete/unpublish), revalidate blog listing
          if (!path) revalidatePath('/blog', 'page');
        }
        // Revalidate sitemap when blog posts change
        revalidateTag('sitemap', 'max');
        break;

      case 'category':
        const categorySlug = typeof slug === 'string' ? slug : slug?.current;
        if (categorySlug) {
          revalidateTag(`category:${categorySlug}`, 'max');
          if (path) revalidatePath(path, 'page');
          // Fallback: if path is missing (delete/unpublish), revalidate parent listings
          if (!path) {
            revalidatePath('/blog', 'page'); // listing
            revalidateTag('category', 'max'); // covers category pages that query by tag
          }
        }
        break;

      case 'homePage':
      case 'aboutPage':
      case 'coachingPage':
      case 'contactPage':
      case 'approachPage':
      case 'privacyPage':
      case 'voorwaardenPage':
      case 'page':
        if (path) revalidatePath(path, 'page');
        // Revalidate sitemap when pages change
        revalidateTag('sitemap', 'max');
        break;

      case 'header':
      case 'footer':
      case 'configuration':
        // Global content affects all pages
        revalidateTag('global', 'max');
        revalidateTag('navigation', 'max');
        revalidateTag('footer', 'max');
        revalidateTag('settings', 'max');
        revalidateTag('sitemap', 'max');
        revalidatePath('/', 'page');
        break;
    }

    console.log('Webhook processed:', { type: _type, path: path || undefined });

    return NextResponse.json({
      revalidated: true,
    });
  } catch (err) {
    /* Log and return any errors that occur during revalidation */
    console.error('❌ Revalidation error:', err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
