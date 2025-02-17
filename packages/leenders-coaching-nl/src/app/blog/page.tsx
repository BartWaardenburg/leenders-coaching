import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/utilities/sanity';
import type { GetPageQuery, BlogPage } from '@/generated/graphql';
import GetPage from '@/graphql/queries/getPage.gql';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import type { Section } from '@/utilities/sections/index';

/**
 * Fetches blog page data using the generated GraphQL client.
 * @returns Promise resolving to the blog page data or null.
 */
const getBlogPage = async (): Promise<BlogPage | null> => {
  const response = await sanityClient.request<GetPageQuery>(GetPage, {
    type: 'blogPage'
  });
  return response.allDocument?.[0] as BlogPage ?? null;
};

/* Generate metadata from Sanity data */
export async function generateMetadata(): Promise<Metadata> {
  const blogPage = await getBlogPage();

  if (!blogPage?.metadata) {
    return {
      title: 'Blog - Leenders Coaching',
      description: 'Lees meer over coaching, persoonlijke ontwikkeling en professionele groei in mijn blog.',
    };
  }

  const { metadata } = blogPage;
  return {
    title: metadata.title || 'Blog - Leenders Coaching',
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
 * BlogPage component
 */
export default async function BlogPage() {
  const blogPage = await getBlogPage();

  if (!blogPage) {
    notFound();
  }

  return (
    <>{blogPage.sections?.map((section: Section) => {
      // Skip sections without a type
      if (!section._type) return null;

      return (
        <SectionRenderer
          key={section._key || section._id || section._type}
          type={section._type}
          data={section}
        />
      );
    })}</>
  );
} 