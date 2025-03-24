import type { ComponentProps } from 'react';
import type { SectionFeatured } from '@/components/sections/SectionFeatured';
import type { PastelColor } from '@/components/ui/Section';

export interface CallToAction {
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
}

/* Sanity data type */
export interface SanityFeaturedSection extends Record<string, unknown> {
  _type: 'sectionFeatured';
  title?: string;
  displayTitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  cta?: CallToAction;
  background?: PastelColor;
  border?: boolean;
  reverse?: boolean;
}

/* Type guard for featured section */
const isSanityFeaturedSection = (
  data: Record<string, unknown>,
): data is SanityFeaturedSection => {
  return data._type === 'sectionFeatured';
};

/**
 * Transform featured section data to component props
 */
export const transformFeaturedSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionFeatured> => {
  if (!isSanityFeaturedSection(data)) {
    throw new Error('Invalid featured section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    image: data.image || '',
    imageAlt: data.imageAlt || '',
    cta: data.cta
      ? {
          href: data.cta.link,
          label: data.cta.text,
          variant: data.cta.variant,
        }
      : undefined,
    background: data.background,
    border: data.border,
    reverse: data.reverse,
  };
};
