import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/utilities/sanity';
import type { GetPageQuery, HomePage } from '@/generated/graphql';
import GetPage from '@/graphql/queries/getPage.gql';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import type { SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline } from '@/generated/graphql';

/**
 * Fetches home page data using the generated GraphQL client.
 * @returns Promise resolving to the home page data or null.
 */
const getHomePage = async (): Promise<HomePage | null> => {
  const response = await sanityClient.request<GetPageQuery>(GetPage, {
    type: 'homePage'
  });
  return response.allDocument?.[0] as HomePage ?? null;
};

/* Generate metadata from Sanity data */
export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  if (!homePage?.metadata) {
    return {
      title: 'Leenders Coaching',
      description: 'Professionele coaching voor persoonlijke en professionele groei.',
    };
  }

  const { metadata } = homePage;
  return {
    title: metadata.title || 'Leenders Coaching',
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
 * HomePage component
 */
export default async function HomePage() {
  const homePage = await getHomePage();

  if (!homePage) {
    notFound();
  }

  return (
    <div>
      <h1>{homePage.title}</h1>
      {homePage.sections?.map((section: SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline) => {
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
