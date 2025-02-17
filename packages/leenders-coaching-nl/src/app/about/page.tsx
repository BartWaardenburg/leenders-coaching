import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/utilities/sanity';
import { GetPageQuery } from '@/generated/graphql';
import GetPage from '@/graphql/pages/getAboutPage.gql';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

/**
 * Fetches about page data using the generated GraphQL client.
 * @returns Promise resolving to the about page data or null.
 */
const getAboutPage = async () => {
  const response = await sanityClient.request<GetPageQuery>(GetPage);
  return response.allAboutPage?.[0] ?? null;
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
    keywords: metadata.keywords?.filter((keyword: string | null): keyword is string => keyword !== null) || undefined,
    openGraph: metadata.openGraph?.image?.url?.asset?.url
      ? {
        images: [{
          url: metadata.openGraph.image.url.asset.url,
          alt: metadata.openGraph.image.alt || ''
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

  return (
    <div>
      <h1>{aboutPage.title}</h1>
      {aboutPage.sections?.map((section) => {
        // Skip sections without a type
        if (!section._type) return null;

        return (
          <SectionRenderer
            key={section._key || section._id || section._type}
            type={section._type}
            data={section}
          />
        );
      })}
    </div>
  );
}
