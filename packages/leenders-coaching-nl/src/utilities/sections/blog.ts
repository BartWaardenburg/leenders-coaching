import type { ComponentProps } from 'react';
import type { SectionBlog } from '@/components/sections/SectionBlog';
import type {
  SectionBlog as SanitySectionBlog,
  Category as SanityCategory,
  Post,
} from '@/types/sanity/schema';

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
 * Transform blog section data to component props.
 * @param data - The raw section data from Sanity.
 * @returns Transformed props for the SectionBlog component.
 * @throws Error if data is not a valid blog section.
 */
export const transformBlogSection = (
  data: Record<string, unknown>
): ComponentProps<typeof SectionBlog> => {
  if (!isSanitySectionBlog(data)) {
    throw new Error('Invalid blog section data');
  }

  /* Get posts and apply sorting/filtering. */
  const posts =
    data.posts?.map((postRef) => {
      /* Using type assertion here because Sanity's reference resolution makes it difficult
       * to type correctly. The resolved post will have all the fields we need,
       * but the type system cannot understand the reference resolution.
       */
      const post = postRef as unknown as Post;

      /* Type guard to ensure we have a valid post with required fields. */
      if (!post || !post._id) {
        throw new Error('Invalid post data: missing _id');
      }

      return {
        _key: post._id,
        title: post.title || '',
        description: post.description || '',
        slug: post.slug?.current || '',
        date: post.publishedAt || '',
        categories:
          post.categories?.map((categoryRef) => {
            /* Type cast the category reference to a resolved category. */
            const category = categoryRef as unknown as SanityCategory;
            return category?.title || '';
          }) || [],
        featured: post.featured || false,
        image: post.image || null,
        variant: post.variant,
      };
    }) || [];

  /* Apply featured filter if needed. */
  const filteredPosts = data.showFeaturedOnly
    ? posts.filter((post) => post.featured)
    : posts;

  /* Apply sorting. */
  if (data.sortOrder) {
    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return data.sortOrder === 'newest'
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    posts: filteredPosts,
    postsPerPage: data.postsPerPage,
    background: data.background,
    border: data.border,
  };
};
