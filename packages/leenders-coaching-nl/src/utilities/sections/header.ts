import type { PastelColor } from '@/components/ui/Section';
import type { ComponentProps } from 'react';
import type { SectionHeader } from '@/components/sections/SectionHeader';

/* Sanity data type */
export interface SanityHeaderSection extends Record<string, unknown> {
  _type: 'sectionHeader';
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: PastelColor;
  cta?: {
    text: string;
    link: string;
    variant?:
      | 'black'
      | 'transparent'
      | 'blue'
      | 'purple'
      | 'green'
      | 'pink'
      | 'yellow'
      | 'teal';
  };
}

/* Type guard for SanityHeaderSection */
const isSanityHeaderSection = (
  data: Record<string, unknown>,
): data is SanityHeaderSection => {
  return data._type === 'sectionHeader';
};

/**
 * Transform header section data to component props
 */
export const transformHeaderSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionHeader> => {
  if (!isSanityHeaderSection(data)) {
    throw new Error('Invalid header section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.subtitle,
    background: data.background,
    primaryCta: data.cta
      ? {
          href: data.cta.link,
          label: data.cta.text,
          variant: data.cta.variant,
        }
      : undefined,
  };
};
