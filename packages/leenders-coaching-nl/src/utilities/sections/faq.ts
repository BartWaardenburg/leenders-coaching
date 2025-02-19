import type { ComponentProps } from 'react';
import type { SectionFAQ } from '@/components/sections/SectionFAQ';
import type { PastelColor } from '@/components/ui/Section';
import type { FAQItem } from '@/components/ui/FAQ';

/* Sanity data type */
export interface SanityFAQSection extends Record<string, unknown> {
  _type: 'sectionFAQ';
  title?: string;
  displayTitle?: string;
  description?: string;
  items: FAQItem[];
  background?: PastelColor;
  border?: boolean;
}

/**
 * Type guard for FAQ section
 */
export const isFAQSection = (
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
  if (!isFAQSection(data)) {
    throw new Error('Invalid FAQ section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    items: data.items,
    background: data.background,
    border: data.border,
  };
};

type FAQSectionData = {
  title?: string;
  description?: string;
  items: FAQItem[];
  background?: PastelColor;
  border?: boolean;
};

export const mapFAQSection = (data: FAQSectionData) => {
  return {
    title: data.title,
    description: data.description,
    items: data.items,
    background: data.background,
    border: data.border,
  };
};
