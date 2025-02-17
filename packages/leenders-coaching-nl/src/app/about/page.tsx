import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/utilities/sanity';
import type { GetPageQuery, AboutPage } from '@/generated/graphql';
import GetPage from '@/graphql/queries/getPage.gql';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import type { Section } from '@/utilities/sections/index';

/**
 * Fetches about page data using the generated GraphQL client.
 * @returns Promise resolving to the about page data or null.
 */
const getAboutPage = async (): Promise<AboutPage | null> => {
  const response = await sanityClient.request<GetPageQuery>(GetPage, {
    type: 'aboutPage'
  });
  return response.allDocument?.[0] as AboutPage ?? null;
};

/* Generate metadata from Sanity data */
export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();

  if (!aboutPage?.metadata) {
    return {
      title: 'Over mij - Leenders Coaching',
      description: 'Leer meer over mijn aanpak en hoe ik je kan helpen met jouw persoonlijke en professionele groei.',
    };
  }

  const { metadata } = aboutPage;
  return {
    title: metadata.title || 'Over mij - Leenders Coaching',
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
    <>{aboutPage.sections?.map((section: Section) => {
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
