import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/utilities/sanity';
import type { GetPageQuery, ApproachPage } from '@/generated/graphql';
import GetPage from '@/graphql/queries/getPage.gql';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import type { Section } from '@/utilities/sections/index';

/**
 * Fetches approach page data using the generated GraphQL client.
 * @returns Promise resolving to the approach page data or null.
 */
const getApproachPage = async (): Promise<ApproachPage | null> => {
  const response = await sanityClient.request<GetPageQuery>(GetPage, {
    type: 'approachPage'
  });
  return response.allDocument?.[0] as ApproachPage ?? null;
};

/* Generate metadata from Sanity data */
export async function generateMetadata(): Promise<Metadata> {
  const approachPage = await getApproachPage();

  if (!approachPage?.metadata) {
    return {
      title: 'Aanpak - Leenders Coaching',
      description: 'Ontdek mijn coaching aanpak en methodiek voor persoonlijke en professionele ontwikkeling.',
    };
  }

  const { metadata } = approachPage;
  return {
    title: metadata.title || 'Aanpak - Leenders Coaching',
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
 * ApproachPage component
 */
export default async function ApproachPage() {
  const approachPage = await getApproachPage();

  if (!approachPage) {
    notFound();
  }

  return (
    <>{approachPage.sections?.map((section: Section) => {
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