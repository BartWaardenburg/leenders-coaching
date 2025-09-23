import type { ComponentProps } from 'react';
import type { SectionContent } from '@/components/sections/SectionContent';
import type { SectionContent as SanitySectionContent } from '@/types/sanity/schema';
import type { PortableTextBlock } from '@portabletext/types';

/**
 * Type guard to check if data is a valid Sanity content section.
 * @param data - The data to check.
 * @returns True if data is a valid SanitySectionContent.
 */
const isSanitySectionContent = (
  data: Record<string, unknown>
): data is SanitySectionContent => {
  return data._type === 'sectionContent' && Array.isArray(data.content);
};

/**
 * Transform content section data to component props.
 * @param data - The raw section data from Sanity.
 * @returns Transformed props for the SectionContent component.
 * @throws Error if data is not a valid content section.
 */
export const transformContentSection = (
  data: Record<string, unknown>
): ComponentProps<typeof SectionContent> => {
  if (!isSanitySectionContent(data)) {
    throw new Error('Invalid content section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || undefined,
    /* Cast content to PortableTextBlock[] since Sanity's type is compatible but TypeScript does not recognize it. */
    content: (data.content || []) as PortableTextBlock[],
    background: data.background,
    border: data.border,
  };
};
