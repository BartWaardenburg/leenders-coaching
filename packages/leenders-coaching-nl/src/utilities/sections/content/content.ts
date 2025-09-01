import type { ComponentProps } from 'react';
import type { SectionContent } from '@/components/sections/SectionContent';
import type { SectionContent as SanitySectionContent } from '@/types/sanity/schema';
import type { PortableTextBlock } from '@portabletext/types';

/* Type guard for content section */
const isSanitySectionContent = (
  data: Record<string, unknown>
): data is SanitySectionContent => {
  return data._type === 'sectionContent' && Array.isArray(data.content);
};

/**
 * Transform content section data to component props
 */
export const transformContentSection = (
  data: Record<string, unknown>
): ComponentProps<typeof SectionContent> => {
  if (!isSanitySectionContent(data)) {
    throw new Error('Invalid content section data');
  }

  return {
    title: data.displayTitle || undefined,
    // Cast content to PortableTextBlock[] since Sanity's type is compatible but TypeScript doesn't recognize it
    content: (data.content || []) as PortableTextBlock[],
    background: data.background,
    border: data.border,
  };
};
