import type { ComponentProps } from 'react';
import type { SectionBlog } from '@/components/sections/SectionBlog';
import type {
  SectionBlog as SanitySectionBlog,
  Post,
} from '@/types/sanity/schema';
import { urlForImage } from '@/utilities/sanity';

/* Type guard for blog section */
const isSanitySectionBlog = (
  data: Record<string, unknown>,
): data is SanitySectionBlog => {
  return data._type === 'sectionBlog';
};

/**
 * Transform blog section data to component props
 */
export const transformBlogSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionBlog> => {
  if (!isSanitySectionBlog(data)) {
    throw new Error('Invalid blog section data');
  }

  // Get posts and apply sorting/filtering
  const posts =
    data.posts?.map((postRef) => {
      /* Using any here because Sanity's reference resolution makes it difficult
       * to type correctly. The resolved post will have all the fields we need,
       * but the type system can't understand the reference resolution.
       */
      const post = postRef as unknown as Post;
      return {
        _key: post._id,
        title: post.title || '',
        description: post.description || '',
        slug: post.slug?.current || '',
        date: post.publishedAt || '',
        categories: post.categories || [],
        featured: post.featured || false,
        image: post.image ? urlForImage(post.image).url() : '',
        variant: post.variant,
      };
    }) || [];

  // Apply featured filter if needed
  const filteredPosts = data.showFeaturedOnly
    ? posts.filter((post) => post.featured)
    : posts;

  // Apply sorting
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
