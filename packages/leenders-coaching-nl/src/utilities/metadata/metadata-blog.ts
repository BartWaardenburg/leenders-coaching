import type { Metadata } from 'next';
import { generateMetadata } from './metadata';
import { urlFor } from '@/utilities/image';
import type { Post } from '@/types/sanity/schema';

/**
 * Type for resolved blog post data from GROQ query
 * Extends the base Post type with additional fields needed for metadata generation
 */
export type ResolvedBlogPost = Omit<Post, 'categories'> & {
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    color?: string;
  } | null>;
  content?: unknown;
  metadata?: {
    title?: string;
    description?: string;
    openGraph?: unknown;
  };
};

/**
 * Generates metadata for individual blog posts
 * @param post - The blog post data from Sanity
 * @param slug - The blog post slug
 * @returns Next.js Metadata object with blog post specific SEO data
 */
export const generateBlogPostMetadata = async (
  post: ResolvedBlogPost,
  slug: string
): Promise<Metadata> => {
  if (!post) {
    return {};
  }

  const {
    metadata,
    title,
    description,
    publishedAt,
    image,
    categories,
    variant,
  } = post;

  /* Generate dynamic Open Graph image using the API endpoint */
  const generateOGImageUrl = () => {
    const baseUrl = 'https://leenders-coaching.nl';
    const params = new URLSearchParams();

    /* Add required title parameter */
    params.set('title', metadata?.title || title || 'Untitled Post');

    /* Add description if available */
    if (metadata?.description || description) {
      params.set('description', metadata?.description || description || '');
    }

    /* Add variant for styling */
    if (variant) {
      params.set('variant', variant);
    }

    /* Add post image if available */
    if (image && image.image?.asset) {
      const imageUrl = urlFor(image.image)
        .width(1200)
        .height(630)
        .auto('format')
        .fit('max')
        .url();
      params.set('image', imageUrl);
    }

    /* Add categories for display */
    if (categories && categories.length > 0) {
      const categoryTitles = categories
        .filter((category) => category != null)
        .map((category) => category.title)
        .join(', ');
      if (categoryTitles) {
        params.set('categories', categoryTitles);
      }
    }

    /* Add publication date */
    if (publishedAt) {
      const date = new Date(publishedAt);
      params.set(
        'date',
        date.toLocaleDateString('nl-NL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    }

    return `${baseUrl}/api/og?${params.toString()}`;
  };

  /* Use dynamic Open Graph image */
  const images = [
    {
      url: generateOGImageUrl(),
      width: 1200,
      height: 630,
      alt: metadata?.title || title || 'Blog post image',
    },
  ];

  /* Generate comprehensive structured data for blog posts */
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata?.title || title || 'Untitled Post',
    description: metadata?.description || description || '',
    image: images?.[0]?.url,
    datePublished: publishedAt,
    dateModified: post._updatedAt,
    author: {
      '@type': 'Person',
      name: 'Leenders Coaching',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Leenders Coaching',
      logo: {
        '@type': 'ImageObject',
        url: 'https://leenders-coaching.nl/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://leenders-coaching.nl/blog/${slug}`,
    },
  };

  return generateMetadata({
    title: metadata?.title || title || 'Untitled Post',
    description: metadata?.description || description || '',
    images,
    type: 'article',
    noindex: metadata?.robots?.index === false,
    structuredData,
  });
};

/**
 * Generates metadata for blog category pages
 * @param category - The category data from Sanity
 * @param slug - The category slug
 * @returns Next.js Metadata object with category specific SEO data
 */
export const generateBlogCategoryMetadata = async (
  category: {
    metadata?: unknown;
    title?: string;
    description?: string;
    robots?: { index?: boolean };
  },
  slug: string
): Promise<Metadata> => {
  if (!category) {
    return {};
  }

  const metadata = category.metadata as
    | {
        title?: string;
        description?: string;
        robots?: { index?: boolean };
      }
    | undefined;
  const { title, description, robots } = category;

  /* Generate comprehensive structured data for category pages */
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: metadata?.title || title || 'Category',
    description: metadata?.description || description || '',
    mainEntity: {
      '@type': 'ItemList',
      name: metadata?.title || title || 'Category',
      description: metadata?.description || description || '',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://leenders-coaching.nl/blog/category/${slug}`,
    },
  };

  return generateMetadata({
    title: metadata?.title || `${title} - Blog Categorieën`,
    description:
      metadata?.description ||
      description ||
      `Ontdek alle blog artikelen in de categorie ${title}`,
    type: 'website',
    noindex: robots?.index === false,
    structuredData,
  });
};
