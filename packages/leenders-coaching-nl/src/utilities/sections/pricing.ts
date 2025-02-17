import type { ComponentProps } from 'react';
import type { SectionPricing } from '@/components/sections/SectionPricing';

/* Sanity data type */
export interface SanityPricingSection extends Record<string, unknown> {
  _type: 'sectionPricing';
  title: string;
  description: string;
  packages: Array<{
    title: string;
    description: string;
    price: string;
    features: Array<{ text: string }>;
    isPopular?: boolean;
    ctaLabel: string;
    variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  }>;
}

/**
 * Type guard for pricing section
 */
export const isPricingSection = (
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
  if (!isPricingSection(data)) {
    throw new Error('Invalid pricing section data');
  }

  return {
    title: data.title,
    description: data.description,
    packages: data.packages,
    onBooking: () => {
      // Handle booking action here
      console.log('Booking requested');
    },
  };
};
