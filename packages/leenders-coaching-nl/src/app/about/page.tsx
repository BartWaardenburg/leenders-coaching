import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { graphqlClient } from '@/graphql/client';
import { AboutPageDocument } from '@/graphql/generated/graphql';
import type { AboutPageQuery } from '@/graphql/generated/graphql';

/**
 * Fetches about page data using the generated GraphQL client.
 * @returns Promise resolving to the about page data or null.
 */
const getAboutPage = async () => {
  const response = await graphqlClient.request<AboutPageQuery>(AboutPageDocument);
  return response.allAboutPage[0] ?? null;
};

/* Generate metadata from Sanity data */
export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();

  if (!aboutPage?.metadata) {
    return {
      title: 'About - Leenders Coaching',
      description: 'Learn about my approach to coaching and how I can help you achieve your goals.',
    };
  }

  const { metadata } = aboutPage;
  return {
    title: metadata.title || 'About - Leenders Coaching',
    description: metadata.description || undefined,
    keywords: metadata.keywords?.filter((keyword): keyword is string => keyword !== null) || undefined,
    openGraph: metadata.image?.asset?.url
      ? {
        images: [{
          url: metadata.image.asset.url,
          alt: metadata.image.asset.altText || ''
        }],
      }
      : undefined,
  };
}

/**
 * AboutPage component
 */
export default async function AboutPage() {
  const aboutPage = await getAboutPage();
  if (!aboutPage) {
    notFound();
  }

  console.log(aboutPage)

  return (
    <div>
      {/* TODO: Implement page sections rendering */}
      <h1>{aboutPage.title}</h1>
      {/* Add section rendering logic here */}
    </div>
  );
}
