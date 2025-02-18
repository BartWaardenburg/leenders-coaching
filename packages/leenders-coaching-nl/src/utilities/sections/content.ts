import type { ComponentProps } from 'react';
import type { SectionContent } from '@/components/sections/SectionContent';
import type { PastelColor } from '@/components/ui/Section';
import type { PortableTextBlock } from '@portabletext/react';

/* Sanity data type */
export interface SanityContentSection extends Record<string, unknown> {
  _type: 'sectionContent';
  title?: string;
  displayTitle?: string;
  contentRaw?: PortableTextBlock[];
  background?: PastelColor;
  border?: boolean;
  showBorder?: boolean;
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
    contentRaw: data.contentRaw,
    background: data.background,
    border: data.border,
    showBorder: data.showBorder,
  };
};

type ContentSectionData = {
  title?: string;
  showBorder?: boolean;
  background?: PastelColor;
  border?: boolean;
  contentRaw?: PortableTextBlock[];
};

export const mapContentSection = (data: ContentSectionData) => {
  return {
    title: data.title,
    showBorder: data.showBorder,
    background: data.background,
    border: data.border,
    contentRaw: data.contentRaw,
  };
};
