import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Webhook endpoint for Sanity to trigger cache revalidation
 * This endpoint is called when content is published in Sanity
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = request.nextUrl.searchParams.get('secret');

    // Verify the secret token to prevent unauthorized access
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Determine which tags to revalidate based on the document type
    const documentType = body._type;
    const tagsToRevalidate: string[] = ['sanity'];

    // Add specific tags based on document type
    switch (documentType) {
      case 'post':
        tagsToRevalidate.push('posts', 'blog');
        break;
      case 'homePage':
        tagsToRevalidate.push('pages', 'home');
        break;
      case 'aboutPage':
        tagsToRevalidate.push('pages', 'about');
        break;
      case 'coachingPage':
        tagsToRevalidate.push('pages', 'coaching');
        break;
      case 'contactPage':
        tagsToRevalidate.push('pages', 'contact');
        break;
      case 'approachPage':
        tagsToRevalidate.push('pages', 'approach');
        break;
      case 'header':
      case 'footer':
      case 'siteSettings':
        tagsToRevalidate.push('global', 'navigation', 'footer', 'settings');
        break;
      case 'category':
        tagsToRevalidate.push('categories', 'posts');
        break;
      default:
        // For unknown types, revalidate all content
        tagsToRevalidate.push('pages', 'posts', 'global');
    }

    // Revalidate all relevant tags
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      documentType,
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
