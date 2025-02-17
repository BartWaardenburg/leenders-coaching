import type { ComponentProps } from 'react';
import type { SectionBlog } from '@/components/sections/SectionBlog';

/* Sanity data type */
export interface SanityBlogSection extends Record<string, unknown> {
  _type: 'sectionBlog';
  title: string;
  description?: string;
  posts: Array<{
    title: string;
    description: string;
    slug: string;
    date: string;
    categories: string[];
    image: string;
    featured?: boolean;
    variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  }>;
  postsPerPage?: number;
}

/**
 * Type guard for blog section
 */
export const isBlogSection = (
  data: Record<string, unknown>,
): data is SanityBlogSection => {
  return data._type === 'sectionBlog';
};

/**
 * Transform blog section data to component props
 */
export const transformBlogSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionBlog> => {
  if (!isBlogSection(data)) {
    throw new Error('Invalid blog section data');
  }

  return {
    title: data.title,
    description: data.description || '',
    posts: data.posts,
    postsPerPage: data.postsPerPage,
  };
};
