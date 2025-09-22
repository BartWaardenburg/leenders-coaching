import type { ComponentProps } from 'react';
import type { SectionBlog, BlogPost } from '@/components/sections/SectionBlog';
import type {
  SectionBlog as SanitySectionBlog,
  Category as SanityCategory,
  Post,
} from '@/types/sanity/schema';
import type { PastelVariant } from '@/utilities/tokens';
import {
  formatBlogPostDate,
  extractCategoryTitles,
  transformBlogPosts,
  type ResolvedPost,
} from '@/utilities/blog/blog';
import { getBlogPosts } from '@/utilities/groq-queries';

/**
 * Type guard to check if data is a valid Sanity blog section.
 * @param data - The data to check.
 * @returns True if data is a valid SanitySectionBlog.
 */
const isSanitySectionBlog = (
  data: Record<string, unknown>
): data is SanitySectionBlog => {
  return data._type === 'sectionBlog';
};

/**
 * Transforms a post reference into a BlogPost object.
 * Handles both already-transformed BlogPost objects and Sanity post references.
 * @param postRef - The post reference to transform (can be BlogPost or Sanity Post)
 * @returns Transformed BlogPost object or null if invalid
 */
const transformPost = (postRef: unknown): BlogPost | null => {
  /* Check if this is already a transformed BlogPost object or a Sanity post reference */
  const post = postRef as unknown as Post | BlogPost;

  /* If it's already a transformed BlogPost (no _id field), return it as-is */
  if (post && !('_id' in post)) {
    return post as BlogPost;
  }

  /* Otherwise, treat it as a Sanity post reference and transform it */
  const sanityPost = post as Post;

  /* Type guard to ensure we have a valid post with required fields. */
  if (!sanityPost || !sanityPost._id) {
    console.warn(
      'Skipping invalid post data: missing _id or post is null/undefined'
    );
    return null;
  }

  return {
    title: sanityPost.title || '',
    description: sanityPost.description || '',
    slug: sanityPost.slug?.current || '',
    date: formatBlogPostDate(sanityPost.publishedAt || ''),
    categories: extractCategoryTitles(
      sanityPost.categories?.map((categoryRef) => {
        /* Type cast the category reference to a resolved category. */
        const category = categoryRef as unknown as SanityCategory;
        return {
          title: category?.title || '',
          slug: { current: category?.slug?.current || '' },
        };
      })
    ),
    featured: sanityPost.featured || false,
    image: sanityPost.image || null,
    variant: sanityPost.variant,
  };
};

/**
 * Transform blog section data to component props (synchronous version for pre-fetched posts).
 * @param data - The raw section data from Sanity or manually created section data.
 * @returns Transformed props for the SectionBlog component.
 * @throws Error if data is not a valid blog section.
 */
export const transformBlogSectionSync = (
  data: Record<string, unknown>
): ComponentProps<typeof SectionBlog> => {
  /* Check if this is a manually created section with pre-fetched posts */
  if (data.posts && Array.isArray(data.posts)) {
    /* This is a manually created section with pre-fetched posts (like in category pages) */
    return {
      title: data.title as string | undefined,
      description: (data.description as string) || '',
      posts: data.posts as BlogPost[],
      postsPerPage: data.postsPerPage as number | undefined,
      background: data.background as PastelVariant | undefined,
      border: data.border as boolean | undefined,
    };
  }

  /* For Sanity sections, we need to handle the showAllPosts case differently */
  if (!isSanitySectionBlog(data)) {
    throw new Error('Invalid blog section data');
  }

  /* If showAllPosts is true, this should use the async version */
  if (data.showAllPosts) {
    throw new Error(
      'Synchronous blog section transformer cannot handle showAllPosts. Use transformBlogSection instead.'
    );
  }

  /* Use selected posts when showAllPosts is false */
  const posts = Array.isArray(data.posts)
    ? (data.posts as unknown[])
        .map((postRef: unknown) => transformPost(postRef))
        .filter((post): post is NonNullable<typeof post> => post !== null)
    : [];

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    posts,
    postsPerPage: data.postsPerPage,
    background: data.background,
    border: data.border,
  };
};

/**
 * Transform blog section data to component props (async version for fetching all posts).
 * @param data - The raw section data from Sanity.
 * @returns Transformed props for the SectionBlog component.
 * @throws Error if data is not a valid blog section.
 */
export const transformBlogSection = async (
  data: Record<string, unknown>
): Promise<ComponentProps<typeof SectionBlog>> => {
  if (!isSanitySectionBlog(data)) {
    throw new Error('Invalid blog section data');
  }

  let posts: BlogPost[] = [];

  /* If showAllPosts is true, fetch all blog posts */
  if (data.showAllPosts) {
    const allPosts = await getBlogPosts();
    const transformedPosts = transformBlogPosts(allPosts as ResolvedPost[]);

    /* Apply featured filter if needed when showing all posts */
    if (data.showFeaturedOnly) {
      posts = transformedPosts.filter((post) => post.featured);
    } else {
      posts = transformedPosts;
    }

    /* Apply sort order */
    if (data.sortOrder === 'oldest') {
      posts = [...posts].reverse();
    }
  } else {
    /* Use selected posts when showAllPosts is false */
    posts =
      data.posts
        ?.map(transformPost)
        .filter((post): post is NonNullable<typeof post> => post !== null) ||
      [];
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    posts,
    postsPerPage: data.postsPerPage,
    background: data.background,
    border: data.border,
  };
};
