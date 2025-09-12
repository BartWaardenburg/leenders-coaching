import type { ComponentProps } from 'react';
import type { SectionFeatured } from '@/components/sections/SectionFeatured';
import type { SectionFeatured as SanitySectionFeatured } from '@/types/sanity/schema';

/* Type guard for featured section */
const isSanitySectionFeatured = (
  data: Record<string, unknown>
): data is SanitySectionFeatured => {
  return data._type === 'sectionFeatured';
};

/**
 * Transform featured section data to component props
 */
export const transformFeaturedSection = (
  data: Record<string, unknown>
): ComponentProps<typeof SectionFeatured> => {
  if (!isSanitySectionFeatured(data)) {
    throw new Error('Invalid featured section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    image: data.image || null,
    cta: data.cta
      ? {
          href: data.cta.href || '',
          label: data.cta.label || '',
          variant: data.cta.variant,
        }
      : undefined,
    background: data.background,
    border: data.border,
    reverse: data.reverse,
  };
};
