import type { ComponentProps } from 'react';
import type { SectionPricing } from '@/components/sections/SectionPricing';
import type { SectionPricing as SanitySectionPricing } from '@/types/sanity/schema';

/* Type guard for pricing section */
const isSanitySectionPricing = (
  data: Record<string, unknown>,
): data is SanitySectionPricing => {
  return data._type === 'sectionPricing';
};

/**
 * Transform pricing section data to component props
 */
export const transformPricingSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionPricing> => {
  if (!isSanitySectionPricing(data)) {
    throw new Error('Invalid pricing section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    packages:
      data.packages?.map((pkg) => ({
        _key: pkg._key,
        title: pkg.title || '',
        description: pkg.description || '',
        price: pkg.price || '',
        features:
          pkg.features?.map((feature) => ({
            _key: feature._key,
            text: feature.text || '',
          })) || [],
        isPopular: pkg.isPopular,
        ctaLabel: pkg.ctaLabel || '',
        variant: pkg.variant,
      })) || [],
    background: data.background,
    border: data.border,
  };
};
