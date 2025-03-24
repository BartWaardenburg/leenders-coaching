import type { ComponentProps } from 'react';
import type { SectionBlog } from '@/components/sections/SectionBlog';
import type { PastelColor } from '@/components/ui/Section';

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  categories: string[];
  image: string;
  featured?: boolean;
  variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
}

/* Sanity data type */
export interface SanityBlogSection extends Record<string, unknown> {
  _type: 'sectionBlog';
  title?: string;
  displayTitle?: string;
  description?: string;
  posts?: BlogPost[];
  postsPerPage?: number;
  background?: PastelColor;
  border?: boolean;
}

/* Type guard for blog section */
const isSanityBlogSection = (
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
  if (!isSanityBlogSection(data)) {
    throw new Error('Invalid blog section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    posts: data.posts || [],
    postsPerPage: data.postsPerPage,
    background: data.background,
    border: data.border,
  };
};
