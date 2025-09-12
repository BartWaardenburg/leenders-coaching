import type { ComponentProps } from 'react';
import type { SectionTestimonial } from '@/components/sections/SectionTestimonial';
import type { SectionTestimonial as SanitySectionTestimonial } from '@/types/sanity/schema';

/**
 * Type guard to check if data is a valid Sanity testimonial section.
 * @param data - The data to check.
 * @returns True if data is a valid SanitySectionTestimonial.
 */
const isSanitySectionTestimonial = (
  data: Record<string, unknown>
): data is SanitySectionTestimonial => {
  return data._type === 'sectionTestimonial';
};

/**
 * Transform testimonial section data to component props.
 * @param data - The raw section data from Sanity.
 * @returns Transformed props for the SectionTestimonial component.
 * @throws Error if data is not a valid testimonial section.
 */
export const transformTestimonialSection = (
  data: Record<string, unknown>
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
        image: testimonial.image,
      })) || [],
    background: data.background,
    border: data.border,
  };
};
