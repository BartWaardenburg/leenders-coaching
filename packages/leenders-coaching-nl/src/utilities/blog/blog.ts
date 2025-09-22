import type { ImageSource } from '@/utilities/image';
import type { PastelVariant } from '@/utilities/tokens';
import type { Post } from '@/types/sanity/schema';

/**
 * Type definition for blog post data expected by SectionBlog component
 */
export type BlogPost = {
  title: string;
  description: string;
  slug: string;
  date: string;
  categories: string[];
  image: ImageSource;
  featured?: boolean;
  variant?: PastelVariant;
};

/**
 * Type for resolved post data from GROQ queries
 * Extends the base Post type with flattened category data
 */
export type ResolvedPost = Omit<Post, 'categories'> & {
  categories?: Array<{ title: string; slug: { current: string } } | null>;
};

/**
 * Transforms raw blog post data from Sanity into the format expected by SectionBlog
 * @param posts - Array of resolved post data from GROQ queries
 * @returns Array of transformed blog posts ready for SectionBlog component
 * @throws Error if a post is missing a slug
 */
export const transformBlogPosts = (posts: ResolvedPost[]): BlogPost[] => {
  return posts
    .filter((post): post is ResolvedPost => post != null)
    .map((post): BlogPost => {
      if (!post.slug?.current) {
        throw new Error(`Post "${post.title || 'Unknown'}" is missing a slug`);
      }

      return {
        title: post.title || 'Untitled Post',
        description: post.description || '',
        slug: post.slug.current,
        date: formatBlogPostDate(post.publishedAt || ''),
        categories: extractCategoryTitles(post.categories),
        image: post.image,
        featured: post.featured,
        variant: post.variant,
      };
    });
};

/**
 * Transforms a single blog post from Sanity format to BlogPost format
 * @param post - Single resolved post data from GROQ query
 * @returns Transformed blog post
 * @throws Error if post is missing a slug or invalid
 */
export const transformSingleBlogPost = (post: ResolvedPost): BlogPost => {
  const transformedPosts = transformBlogPosts([post]);
  const transformedPost = transformedPosts[0];
  if (!transformedPost) {
    throw new Error('Failed to transform blog post');
  }
  return transformedPost;
};

/**
 * Shared utility for formatting blog post dates
 * @param dateString - ISO date string from Sanity
 * @returns Formatted date string in Dutch locale
 */
export const formatBlogPostDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
  });
};

/**
 * Shared utility for extracting category titles from blog post data
 * @param categories - Array of category objects (can be flattened or referenced)
 * @returns Array of category title strings
 */
export const extractCategoryTitles = (
  categories:
    | Array<{ title: string; slug: { current: string } } | null>
    | undefined
): string[] => {
  if (!categories) return [];
  return categories
    .map((cat) => cat?.title)
    .filter((title): title is string => Boolean(title));
};
