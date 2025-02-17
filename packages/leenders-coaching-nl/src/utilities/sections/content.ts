import type { ComponentProps } from 'react';
import type { SectionContent } from '@/components/sections/SectionContent';
import type { PastelColor } from '@/components/ui/Section';
import type { PortableTextBlock } from '@portabletext/react';

/* Sanity data type */
export interface SanityContentSection extends Record<string, unknown> {
  _type: 'sectionContent';
  title?: string;
  displayTitle?: string;
  showBorder?: boolean;
  background?: PastelColor;
  border?: boolean;
  contentRaw?: PortableTextBlock[];
  maxWidth?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
}

/**
 * Type guard for content section
 */
export const isContentSection = (
  data: Record<string, unknown>,
): data is SanityContentSection => {
  return data._type === 'sectionContent';
};

/**
 * Transform content section data to component props
 */
export const transformContentSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionContent> => {
  if (!isContentSection(data)) {
    throw new Error('Invalid content section data');
  }

  return {
    title: data.displayTitle || undefined,
    showBorder: data.showBorder,
    background: data.background,
    border: data.border,
    contentRaw: data.contentRaw,
    maxWidth: data.maxWidth,
  };
};
