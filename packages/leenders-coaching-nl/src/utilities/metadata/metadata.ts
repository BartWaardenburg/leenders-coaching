import { type Metadata } from 'next';
import { getSiteSettings } from '../groq-queries';
import { urlFor } from '../image';

/* Default fallback values */
const defaultMetadata = {
  title: 'Leenders Coaching',
  description:
    'Professionele coaching voor persoonlijke en professionele groei.',
  openGraph: {
    type: 'website' as const,
    locale: 'nl_NL',
    url: 'https://www.leenders-coaching.nl',
    siteName: 'Leenders Coaching',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Leenders Coaching',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Configuration options for generating page metadata.
 */
type GenerateMetadataOptions = {
  title?: string;
  description?: string;
  image?: {
    image?: {
      asset?: {
        _ref: string;
        _type: string;
      };
    };
    alt?: string;
  };
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  structuredData?: object;
};

/**
 * Structured data schema for website entities.
 */
type WebsiteStructuredData = {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  description?: string;
  url: string;
};

/**
 * Structured data schema for article entities.
 */
type ArticleStructuredData = {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': 'Person';
    name: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
};

/**
 * Structured data schema for organization entities.
 */
type OrganizationStructuredData = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  description?: string;
  url: string;
  logo?: string;
  sameAs?: string[];
};

/**
 * Retrieves site metadata from Sanity or returns default values.
 * @returns Site metadata including title and description
 */
export const getSiteMetadata = async (): Promise<{
  title: string;
  description: string;
}> => {
  try {
    const siteSettings = await getSiteSettings();
    return {
      title: siteSettings?.title || defaultMetadata.title,
      description: siteSettings?.description || defaultMetadata.description,
    };
  } catch (error) {
    console.warn('Failed to fetch site settings, using defaults:', error);
    return {
      title: defaultMetadata.title,
      description: defaultMetadata.description,
    };
  }
};

/**
 * Generates website structured data for search engine optimization.
 * @param title - The website title
 * @param description - Optional website description
 * @param url - Optional website URL
 * @returns Website structured data object
 */
export const generateWebsiteStructuredData = (
  title: string,
  description?: string,
  url?: string
): WebsiteStructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: title,
  description,
  url: url || defaultMetadata.openGraph.url || '',
});

/**
 * Generates article structured data for search engine optimization.
 * @param title - The article title
 * @param description - Optional article description
 * @param image - Optional article image URL
 * @param datePublished - Optional publication date
 * @param dateModified - Optional modification date
 * @param author - Optional author name
 * @returns Article structured data object
 */
export const generateArticleStructuredData = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): ArticleStructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image,
  datePublished,
  dateModified,
  author: author
    ? {
        '@type': 'Person',
        name: author,
      }
    : undefined,
  publisher: {
    '@type': 'Organization',
    name: defaultMetadata.title,
    logo: defaultMetadata.openGraph.images?.[0]
      ? {
          '@type': 'ImageObject',
          url: defaultMetadata.openGraph.images[0].url,
        }
      : undefined,
  },
});

/**
 * Generates organization structured data for search engine optimization.
 * @param name - The organization name
 * @param description - Optional organization description
 * @param url - Optional organization URL
 * @param logo - Optional logo URL
 * @param socialLinks - Optional array of social media URLs
 * @returns Organization structured data object
 */
export const generateOrganizationStructuredData = ({
  name,
  description,
  url,
  logo,
  socialLinks,
}: {
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  socialLinks?: string[];
}): OrganizationStructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  description,
  url: url || defaultMetadata.openGraph.url || '',
  logo,
  sameAs: socialLinks,
});

/**
 * Generates metadata for a page, merging with default metadata from Sanity.
 * @param title - Optional page title
 * @param description - Optional page description
 * @param image - Optional accessible image for OpenGraph
 * @param type - OpenGraph type (default: 'website')
 * @param noindex - Whether to prevent indexing (default: false)
 * @param structuredData - Optional custom structured data
 * @returns Complete metadata object for Next.js
 */
export const generateMetadata = async ({
  title,
  description,
  image,
  type = 'website',
  noindex = false,
  structuredData,
}: GenerateMetadataOptions): Promise<Metadata> => {
  /* Get site metadata from Sanity */
  const siteMetadata = await getSiteMetadata();

  const pageTitle = title
    ? `${title} | ${siteMetadata.title}`
    : siteMetadata.title;

  /* Generate default structured data if none provided */
  const defaultStructuredData = !structuredData
    ? type === 'article'
      ? generateArticleStructuredData({
          title: pageTitle,
          description: description || siteMetadata.description,
          image:
            image && image.image
              ? urlFor(image.image).width(480).height(630).auto('format').url()
              : undefined,
        })
      : generateWebsiteStructuredData(
          pageTitle,
          description || siteMetadata.description
        )
    : structuredData;

  /* Generate dynamic Open Graph image URL */
  const generateDynamicOGImage = () => {
    const baseUrl = 'https://leenders-coaching.nl';
    const params = new URLSearchParams();

    params.set('title', pageTitle);

    if (description || siteMetadata.description) {
      params.set('description', description || siteMetadata.description);
    }

    /* Add custom image if provided */
    if (image && image.image) {
      const imageUrl = urlFor(image.image)
        .width(1200)
        .height(630)
        .auto('format')
        .url();
      params.set('image', imageUrl);
    }

    return `${baseUrl}/api/og?${params.toString()}`;
  };

  /* Use dynamic Open Graph image */
  const finalImages = [
    {
      url: generateDynamicOGImage(),
      width: 1200,
      height: 630,
      alt: image?.alt || pageTitle,
    },
  ];

  return {
    title: pageTitle,
    description: description || siteMetadata.description,
    openGraph: {
      title: pageTitle,
      description: description || siteMetadata.description,
      type,
      images: finalImages,
      siteName: siteMetadata.title,
    },
    twitter: {
      card: 'summary_large_image',
      images: finalImages,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'script:ld+json': JSON.stringify(defaultStructuredData),
    },
  };
};
