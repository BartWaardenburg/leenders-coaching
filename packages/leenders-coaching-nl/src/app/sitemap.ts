/**
 * Next.js built-in sitemap generation using Sanity CMS
 * Generates dynamic sitemap with all pages, blog posts, and categories
 * Follows Next.js 15+ App Router conventions with TypeScript support
 */
import type { MetadataRoute } from 'next';
import {
  getBlogPostsForSitemap,
  getCategoriesForSitemap,
  getStaticPagesForSitemap,
} from '@/utilities/groq-queries';

/**
 * Generate the base URL for the site
 */
const getBaseUrl = (): string => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const vercelUrl = process.env.VERCEL_URL;

  if (isDevelopment) {
    return 'http://localhost:3000';
  }

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return 'https://leenders-coaching.nl';
};

/**
 * Convert Sanity slug to full URL
 */
const getPageUrl = (slug: string, baseUrl: string): string => {
  // Remove leading slash if present
  const cleanSlug = slug.startsWith('/') ? slug.slice(1) : slug;
  return `${baseUrl}/${cleanSlug}`;
};

/**
 * Get infrastructure routes for sitemap
 * Only truly static routes that don't pull content from Sanity
 */
const getInfrastructureRoutes = (baseUrl: string): MetadataRoute.Sitemap => [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
];

/**
 * Next.js built-in sitemap function
 * Combines infrastructure routes with all content-managed pages from Sanity
 * Supports ISR through cache tags and revalidation
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const baseUrl = getBaseUrl();

    // Fetch static pages, blog posts, and categories from Sanity with cache tags for ISR
    const [staticPages, blogPosts, categories] = await Promise.all([
      getStaticPagesForSitemap(),
      getBlogPostsForSitemap(),
      getCategoriesForSitemap(),
    ]);

    // Start with infrastructure routes (only truly static homepage)
    const sitemapEntries: MetadataRoute.Sitemap = [
      ...getInfrastructureRoutes(baseUrl),
    ];

    // Add all content-managed pages from Sanity
    staticPages.forEach((page) => {
      const url = getPageUrl(page.slug.current, baseUrl);
      const lastModified = new Date(page._updatedAt);

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // Add blog posts
    blogPosts.forEach((post) => {
      const url = `${baseUrl}/blog/${post.slug.current}`;
      const lastModified = new Date(
        Math.max(
          new Date(post.publishedAt).getTime(),
          new Date(post._updatedAt).getTime()
        )
      );

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });

    // Add blog categories
    categories.forEach((category) => {
      const url = `${baseUrl}/blog/categorie/${category.slug.current}`;
      const lastModified = new Date(category._updatedAt);

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.5,
      });
    });

    return sitemapEntries;
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return basic fallback sitemap on error
    const baseUrl = getBaseUrl();
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ];
  }
}
