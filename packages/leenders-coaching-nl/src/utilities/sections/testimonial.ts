import type { ComponentProps } from 'react';
import type { SectionTestimonial } from '@/components/sections/SectionTestimonial';
import type { PastelColor } from '@/components/ui/Section';

/* Sanity data type */
export interface SanityTestimonialSection extends Record<string, unknown> {
  _type: 'sectionTestimonial';
  title?: string;
  displayTitle?: string;
  description?: string;
  testimonials?: Array<{
    _key: string;
    quote: string;
    name: string;
    role?: string;
    image?: string;
  }>;
  background?: PastelColor;
  border?: boolean;
}

/* Type guard for testimonial section */
const isSanityTestimonialSection = (
  data: Record<string, unknown>,
): data is SanityTestimonialSection => {
  return data._type === 'sectionTestimonial';
};

/**
 * Transform testimonial section data to component props
 */
export const transformTestimonialSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionTestimonial> => {
  if (!isSanityTestimonialSection(data)) {
    throw new Error('Invalid testimonial section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    testimonials:
      data.testimonials?.map((testimonial) => ({
        quote: testimonial.quote,
        name: testimonial.name,
        role: testimonial.role,
        image: testimonial.image || '',
      })) || [],
    background: data.background,
    border: data.border,
  };
};
