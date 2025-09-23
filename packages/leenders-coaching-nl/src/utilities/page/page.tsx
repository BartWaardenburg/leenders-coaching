import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPage } from '@/utilities/groq-queries';
import { generateMetadata as generateMetadataUtil } from '@/utilities/metadata/metadata';
import type { BasePage } from '@/types/Page';

/**
 * Generic function to fetch page data from Sanity using GROQ
 * @param pageType - The type of page to fetch (e.g., 'homePage', 'contactPage')
 * @returns Promise resolving to the page data or null
 */
export const getPageData = async <T extends BasePage>(
  pageType: string
): Promise<T | null> => {
  try {
    return (await getPage(pageType)) as T | null;
  } catch (error) {
    console.error(`Error fetching ${pageType} data:`, error);
    return null;
  }
};

/**
 * Generate metadata for a page using the comprehensive metadata utility
 * @param page - The page data from Sanity
 * @param fallbackTitle - Fallback title if no title is found in the page data
 * @returns Next.js Metadata object with JSON-LD structured data
 */
export const generatePageMetadata = async (
  page: BasePage | null,
  fallbackTitle: string
): Promise<Metadata> => {
  if (!page?.metadata) {
    return generateMetadataUtil({
      title: fallbackTitle,
      description:
        'Professionele coaching voor persoonlijke en professionele groei.',
    });
  }

  const { metadata } = page;

  /* Determine the OpenGraph type based on page type */
  const ogType = 'website';

  /* Generate structured data based on page type */
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title || fallbackTitle,
    description: metadata.description,
    url: `https://leenders-coaching.nl/${page.slug?.current || ''}`,
    publisher: {
      '@type': 'Organization',
      name: 'Leenders Coaching',
      url: 'https://leenders-coaching.nl',
    },
  };

  /* Use the comprehensive metadata utility which includes JSON-LD */
  return generateMetadataUtil({
    title: metadata.title || fallbackTitle,
    description: metadata.description,
    image: metadata.image,
    type: ogType,
    structuredData,
  });
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

  const sectionElements =
    page.sections?.map((section, index) => {
      if (!section || !section._type) return null;

      /* Ensure section._type and section._key are strings. */
      const sectionType = String(section._type);
      const sectionKey = section._key
        ? String(section._key)
        : `section-${index}`;

      const zebraMode = index % 2 === 1;

      return (
        <SectionRenderer
          key={sectionKey}
          type={sectionType}
          data={section as unknown as Record<string, unknown>}
          zebraMode={zebraMode}
        />
      );
    }) || [];

  return wrapper ? wrapper(sectionElements) : <>{sectionElements}</>;
};

/**
 * Renders the sections of a page with async support
 * @param page - The page data from Sanity
 * @param wrapper - Optional wrapper component for the sections
 * @returns Promise resolving to React component with rendered sections
 */
export const renderPageSectionsAsync = async (
  page: BasePage | null,
  wrapper?: (children: ReactNode) => ReactNode
): Promise<ReactNode> => {
  if (!page) {
    notFound();
  }

  const sectionElements = await Promise.all(
    (page.sections || []).map(async (section, index) => {
      /* Skip null sections and sections without a type. */
      if (!section || !section._type) return null;

      /* Ensure section._type and section._key are strings. */
      const sectionType = String(section._type);
      const sectionKey = section._key
        ? String(section._key)
        : `section-${index}`;

      /* Zebra pattern: even indices (0, 2, 4...) keep their variant,
       * odd indices (1, 3, 5...) have no variant */
      const zebraMode = index % 2 === 1;

      /* Handle async blog section specially */
      if (sectionType === 'sectionBlog') {
        const { transformBlogSection } = await import(
          '@/utilities/sections/blog'
        );
        const { SectionBlog } = await import(
          '@/components/sections/SectionBlog'
        );

        try {
          const props = await transformBlogSection(
            section as Record<string, unknown>
          );

          /* Apply zebra mode to blog section props */
          if (zebraMode && props.background) {
            props.background = undefined;
          }

          return <SectionBlog key={sectionKey} {...props} />;
        } catch (error) {
          console.error(`Failed to render blog section:`, error);
          return null;
        }
      }

      /* Use regular SectionRenderer for other sections */
      return (
        <SectionRenderer
          key={sectionKey}
          type={sectionType}
          data={section as unknown as Record<string, unknown>}
          zebraMode={zebraMode}
        />
      );
    })
  );

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
      return (await getPage(pageType)) as T | null;
    } catch (error) {
      console.error(`Error fetching ${pageType} data:`, error);
      return null;
    }
  };

  const getMetadata = async (): Promise<Metadata> => {
    const page = await getPageDataInternal();
    return await generatePageMetadata(page, fallbackTitle);
  };

  const PageComponent = async () => {
    const page = await getPageDataInternal();

    /* Use async rendering for blog pages to support showAllPosts functionality */
    if (pageType === 'blogPage') {
      return await renderPageSectionsAsync(page, wrapper);
    }

    return renderPageSections(page, wrapper);
  };

  return {
    getMetadata,
    PageComponent,
  };
};
