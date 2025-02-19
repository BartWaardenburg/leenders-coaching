import type { ComponentProps } from 'react';
import type { SectionTestimonial } from '@/components/sections/SectionTestimonial';
import type { PastelColor } from '@/components/ui/Section';

/* Sanity data type */
export interface SanityTestimonialSection extends Record<string, unknown> {
  _type: 'sectionTestimonial';
  title?: string;
  displayTitle?: string;
  description?: string;
  testimonials: Array<{
    quote: string;
    name: string;
    role?: string;
    image?: {
      asset?: {
        url?: string;
      };
    };
  }>;
  background?: PastelColor;
  border?: boolean;
}

/**
 * Type guard for testimonial section
 */
export const isTestimonialSection = (
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
  if (!isTestimonialSection(data)) {
    throw new Error('Invalid testimonial section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    testimonials: data.testimonials.map((testimonial) => ({
      quote: testimonial.quote,
      name: testimonial.name,
      role: testimonial.role,
      image: testimonial.image?.asset?.url || '',
    })),
    background: data.background,
    border: data.border,
  };
};

export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  image?: string;
};

type TestimonialSectionData = {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
  background?: PastelColor;
  border?: boolean;
};

export const mapTestimonialSection = (data: TestimonialSectionData) => {
  return {
    title: data.title,
    description: data.description,
    testimonials: data.testimonials,
    background: data.background,
    border: data.border,
  };
};
