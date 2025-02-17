import type { ComponentProps } from 'react';
import type { SectionFeatured } from '@/components/sections/SectionFeatured';
import type { PastelColor } from '@/components/ui/Section';
import { urlFor } from '@/utilities/sanity';

/* Sanity image type */
interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
  };
}

/* Sanity data type */
export interface SanityFeaturedSection extends Record<string, unknown> {
  _type: 'sectionFeatured';
  title?: string;
  displayTitle?: string;
  description?: string;
  image?: SanityImage;
  imageAlt?: string;
  cta?: {
    href: string;
    label: string;
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
  background?: PastelColor;
  border?: boolean;
  reverse?: boolean;
}

/**
 * Type guard for Sanity image
 */
const isSanityImage = (image: unknown): image is SanityImage => {
  return (
    typeof image === 'object' &&
    image !== null &&
    '_type' in image &&
    image._type === 'image' &&
    'asset' in image &&
    typeof image.asset === 'object' &&
    image.asset !== null &&
    '_ref' in image.asset &&
    typeof image.asset._ref === 'string'
  );
};

/**
 * Type guard for featured section
 */
export const isFeaturedSection = (
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
  if (!isFeaturedSection(data)) {
    throw new Error('Invalid featured section data');
  }

  /* Transform Sanity image to URL using the image URL builder */
  let imageUrl = '';
  if (data.image && isSanityImage(data.image)) {
    try {
      imageUrl = urlFor(data.image).width(1920).quality(80).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
    }
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    image: imageUrl,
    imageAlt: data.imageAlt || data.title || '',
    cta: data.cta,
    background: data.background,
    border: data.border,
    reverse: data.reverse,
  };
};
