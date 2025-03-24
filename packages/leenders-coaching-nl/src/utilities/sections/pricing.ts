import type { ComponentProps } from 'react';
import type { SectionPricing } from '@/components/sections/SectionPricing';
import type { PastelColor } from '@/components/ui/Section';

interface PricingFeature {
  _key: string;
  text: string;
}

interface PricingPackage {
  _key: string;
  title: string;
  description: string;
  price: string;
  features: PricingFeature[];
  isPopular?: boolean;
  ctaLabel: string;
  variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
}

/* Sanity data type */
export interface SanityPricingSection extends Record<string, unknown> {
  _type: 'sectionPricing';
  title?: string;
  displayTitle?: string;
  description?: string;
  packages?: PricingPackage[];
  background?: PastelColor;
  border?: boolean;
}

/* Type guard for pricing section */
const isSanityPricingSection = (
  data: Record<string, unknown>,
): data is SanityPricingSection => {
  return data._type === 'sectionPricing';
};

/**
 * Transform pricing section data to component props
 */
export const transformPricingSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionPricing> => {
  if (!isSanityPricingSection(data)) {
    throw new Error('Invalid pricing section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    packages: data.packages || [],
    background: data.background,
    border: data.border,
  };
};
