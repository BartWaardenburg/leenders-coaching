import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { groq } from '@/utilities/sanity';
import { PAGE_QUERY } from '@/groq/queries';
import type { BasePage } from '@/types/Page';
import type { PAGE_QUERYResult } from '@/types/sanity/groq';

/**
 * Generic function to fetch page data from Sanity using GROQ
 * @param pageType - The type of page to fetch (e.g., 'homePage', 'contactPage')
 * @returns Promise resolving to the page data or null
 */
export const getPageData = async <T extends BasePage>(pageType: string): Promise<T | null> => {
  try {
    return await groq<PAGE_QUERYResult<T>>(PAGE_QUERY(pageType));
  } catch (error) {
    console.error(`Error fetching ${pageType} data:`, error);
    return null;
  }
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

  const metadata: Metadata = {
    title: page.metadata.title || fallbackTitle,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
  };

  // Add OpenGraph metadata if available
  if (page.metadata.openGraph) {
    const og = page.metadata.openGraph;
    metadata.openGraph = {
      title: og.title,
      description: og.description,
      type: 'website', // Using a fixed valid type
      url: og.url,
      siteName: og.siteName,
    };

    // Only add images if we have image data
    if (og.image) {
      metadata.openGraph.images = [{
        url: typeof og.image.url === 'string' ? og.image.url : '',
        width: og.image.width,
        height: og.image.height,
        alt: og.image.alt,
      }];
    }
  }

  return metadata;
};

/**
 * Renders the sections of a page
 * @param page - The page data from Sanity
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

    // Ensure section._type and section._key are strings
    const sectionType = String(section._type);
    const sectionKey = section._key ? String(section._key) : `section-${index}`;

    return (
      <SectionRenderer
        key={sectionKey}
        type={sectionType}
        data={section as unknown as Record<string, unknown>}
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
    try {
      return await groq<PAGE_QUERYResult<T>>(PAGE_QUERY(pageType));
    } catch (error) {
      console.error(`Error fetching ${pageType} data:`, error);
      return null;
    }
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