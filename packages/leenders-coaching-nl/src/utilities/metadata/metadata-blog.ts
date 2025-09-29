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
    image?: {
      image?: {
        asset?: {
          _ref: string;
          _type: string;
        };
      };
      alt?: string;
    };
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

  const { metadata, title, description, publishedAt, image } = post;

  /* Generate comprehensive structured data for blog posts */
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata?.title || title || 'Untitled Post',
    description: metadata?.description || description || '',
    image:
      metadata?.image && metadata.image.image
        ? urlFor(metadata.image.image)
            .width(480)
            .height(630)
            .auto('format')
            .url()
        : image && image.image
          ? urlFor(image.image).width(480).height(630).auto('format').url()
          : undefined,
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
        url: 'https://www.leenders-coaching.nl/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.leenders-coaching.nl/blog/${slug}`,
    },
  };

  /* Generate breadcrumbs for blog posts */
  const breadcrumbs = [
    { name: 'Blog', url: '/blog' },
    ...(post.categories && post.categories.length > 0
      ? post.categories
          .filter((cat) => cat !== null)
          .slice(0, 1) // Use first category for breadcrumbs
          .map((cat) => ({
            name: cat!.title,
            url: `/blog/categorie/${cat!.slug.current}`,
          }))
      : []),
    { name: metadata?.title || title || 'Untitled Post', url: `/blog/${slug}` },
  ];

  return generateMetadata({
    title: metadata?.title || title || 'Untitled Post',
    description: metadata?.description || description || '',
    image: metadata?.image || image, // Use custom metadata image or fallback to post image
    type: 'article',
    noindex: false, // Simplified - no robots config in new schema
    structuredData,
    url: `https://www.leenders-coaching.nl/blog/${slug}`,
    breadcrumbs,
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
    metadata?: {
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
    };
    title?: string;
    description?: string;
  },
  slug: string
): Promise<Metadata> => {
  if (!category) {
    return {};
  }

  const { metadata, title, description } = category;

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
      '@id': `https://www.leenders-coaching.nl/blog/categorie/${slug}`,
    },
  };

  /* Generate breadcrumbs for category pages */
  const breadcrumbs = [
    { name: 'Blog', url: '/blog' },
    {
      name: metadata?.title || title || 'Category',
      url: `/blog/categorie/${slug}`,
    },
  ];

  return generateMetadata({
    title: metadata?.title || `${title} - Blog Categorieën`,
    description:
      metadata?.description ||
      description ||
      `Ontdek alle blog artikelen in de categorie ${title}`,
    image: metadata?.image,
    type: 'website',
    noindex: false,
    structuredData,
    url: `https://www.leenders-coaching.nl/blog/categorie/${slug}`,
    breadcrumbs,
  });
};
