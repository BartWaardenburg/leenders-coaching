import type { ComponentProps } from 'react';
import type { SectionFAQ } from '@/components/sections/SectionFAQ';
import type { PastelColor } from '@/components/ui/Section';
import type { PortableTextBlock } from '@portabletext/react';

export interface FAQItem {
  _key: string;
  question: string;
  answer: PortableTextBlock[];
}

/* Sanity data type */
export interface SanityFAQSection extends Record<string, unknown> {
  _type: 'sectionFAQ';
  title?: string;
  displayTitle?: string;
  description?: string;
  items?: FAQItem[];
  background?: PastelColor;
  border?: boolean;
}

/* Type guard for FAQ section */
const isSanityFAQSection = (
  data: Record<string, unknown>,
): data is SanityFAQSection => {
  return data._type === 'sectionFAQ';
};

/**
 * Transform FAQ section data to component props
 */
export const transformFAQSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionFAQ> => {
  if (!isSanityFAQSection(data)) {
    throw new Error('Invalid FAQ section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    items:
      data.items?.filter((item): item is FAQItem =>
        Boolean(item.question && item.answer),
      ) || [],
    background: data.background,
    border: data.border,
  };
};
