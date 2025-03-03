import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/utilities/sanity';
import type { GetPageQuery, Document, Metadata as SanityMetadata } from '@/generated/graphql';
import GetPage from '@/graphql/queries/getPage.gql';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import type { Section } from '@/utilities/sections/index';
import type { ReactNode } from 'react';

/**
 * Represents a generic page from Sanity with common fields
 * Extends the Document type from generated GraphQL types
 */
export interface BasePage extends Document {
  title?: string;
  metadata?: SanityMetadata;
  sections?: Section[];
  slug?: {
    current?: string;
  };
}

/**
 * Generic function to fetch page data from Sanity
 * @param pageType - The type of page to fetch (e.g., 'homePage', 'contactPage')
 * @returns Promise resolving to the page data or null
 */
export const getPageData = async <T extends BasePage>(pageType: string): Promise<T | null> => {
  const response = await sanityClient.request<GetPageQuery>(GetPage, {
    type: pageType
  });
  return response.allDocument?.[0] as T ?? null;
};

/**
 * Generate metadata for a page
 * @param page - The page data from Sanity
 * @param fallbackTitle - Fallback title if no title is found in the page data
 * @returns Next.js Metadata object
 */
export const generatePageMetadata = (
  page: BasePage | null,
  fallbackTitle: string
): Metadata => {
  if (!page?.metadata) {
    return {
      title: fallbackTitle,
      description: 'Professionele coaching voor persoonlijke en professionele groei.',
    };
  }

  const { metadata } = page;
  return {
    title: metadata.title || fallbackTitle,
    description: metadata.description || undefined,
    keywords: metadata.keywords?.filter((keyword: string | null): keyword is string =>
      keyword !== null) || undefined,
    openGraph: metadata.openGraph?.image?.url?.asset?.url
      ? {
        title: metadata.openGraph.title || metadata.title || fallbackTitle,
        description: metadata.openGraph.description || metadata.description,
        url: metadata.openGraph.url,
        siteName: metadata.openGraph.siteName,
        images: [
          {
            url: metadata.openGraph.image.url.asset.url,
            width: metadata.openGraph.image.width || 1200,
            height: metadata.openGraph.image.height || 630,
            alt: metadata.openGraph.image.alt || metadata.title || fallbackTitle,
          },
        ],
        type: (metadata.openGraph.type || 'website') as 'website' | 'article',
      }
      : undefined,
  };
};

/**
 * Render page sections
 * @param page - The page data containing sections to render
 * @param wrapper - Optional wrapper component for the sections
 * @returns React component with rendered sections
 */
export const renderPageSections = (
  page: BasePage | null,
  wrapper?: (children: ReactNode) => ReactNode
): ReactNode => {
  if (!page) {
    notFound();
  }

  const sectionElements = page.sections?.map((section, index) => {
    // Skip sections without a type
    if (!section._type) return null;

    // Generate a unique key using available identifiers or index as fallback
    const uniqueKey = section._key || section._id || `${section._type}-${index}`;

    return (
      <SectionRenderer
        key={uniqueKey}
        type={section._type}
        data={section}
      />
    );
  }) || [];

  return wrapper ? wrapper(sectionElements) : <>{sectionElements}</>;
};

/**
 * A generic page component factory function
 * @param pageType - The type of page to fetch from Sanity
 * @param fallbackTitle - Fallback title to use if no title is found in the page data
 * @param wrapper - Optional wrapper component for the sections
 * @returns Object with getMetadata and PageComponent functions
 */
export const createPageComponent = <T extends BasePage>(
  pageType: string,
  fallbackTitle: string,
  wrapper?: (children: ReactNode) => ReactNode
) => {
  const getPageDataInternal = async (): Promise<T | null> => {
    const response = await sanityClient.request<GetPageQuery>(GetPage, {
      type: pageType
    });
    return response.allDocument?.[0] as T ?? null;
  };

  const getMetadata = async (): Promise<Metadata> => {
    const page = await getPageDataInternal();
    return generatePageMetadata(page, fallbackTitle);
  };

  const PageComponent = async () => {
    const page = await getPageDataInternal();
    return renderPageSections(page, wrapper);
  };

  return {
    getMetadata,
    PageComponent
  };
}; 