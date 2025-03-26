import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Testimonial Section */
export const sectionTestimonial = defineType({
  name: 'sectionTestimonial',
  title: 'Testimonial Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      description: 'Add testimonials to display in the carousel',
      of: [{ type: 'testimonial' }],
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
});
