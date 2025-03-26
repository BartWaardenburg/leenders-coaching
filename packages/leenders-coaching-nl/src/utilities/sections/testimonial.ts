import type { ComponentProps } from 'react';
import type { SectionTestimonial } from '@/components/sections/SectionTestimonial';
import type { SectionTestimonial as SanitySectionTestimonial } from '@/types/sanity/schema';
import { urlForImage } from '@/utilities/sanity';

/* Type guard for testimonial section */
const isSanitySectionTestimonial = (
  data: Record<string, unknown>,
): data is SanitySectionTestimonial => {
  return data._type === 'sectionTestimonial';
};

/**
 * Transform testimonial section data to component props
 */
export const transformTestimonialSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionTestimonial> => {
  if (!isSanitySectionTestimonial(data)) {
    throw new Error('Invalid testimonial section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    testimonials:
      data.testimonials?.map((testimonial) => ({
        _key: testimonial._key,
        quote: testimonial.quote || '',
        name: testimonial.name || '',
        role: testimonial.role,
        image: testimonial.image ? urlForImage(testimonial.image).url() : '',
      })) || [],
    background: data.background,
    border: data.border,
  };
};
