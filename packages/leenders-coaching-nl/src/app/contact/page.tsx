import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/utilities/sanity';
import type { GetPageQuery, ContactPage } from '@/generated/graphql';
import GetPage from '@/graphql/queries/getPage.gql';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import type { Section } from '@/utilities/sections/index';

/**
 * Fetches contact page data using the generated GraphQL client.
 * @returns Promise resolving to the contact page data or null.
 */
const getContactPage = async (): Promise<ContactPage | null> => {
  const response = await sanityClient.request<GetPageQuery>(GetPage, {
    type: 'contactPage'
  });
  return response.allDocument?.[0] as ContactPage ?? null;
};

/* Generate metadata from Sanity data */
export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();

  if (!contactPage?.metadata) {
    return {
      title: 'Contact - Leenders Coaching',
      description: 'Neem contact op voor een vrijblijvend kennismakingsgesprek of stel je vraag over coaching.',
    };
  }

  const { metadata } = contactPage;
  return {
    title: metadata.title || 'Contact - Leenders Coaching',
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
 * ContactPage component
 */
export default async function ContactPage() {
  const contactPage = await getContactPage();

  if (!contactPage) {
    notFound();
  }

  return (
    <>{contactPage.sections?.map((section: Section) => {
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
