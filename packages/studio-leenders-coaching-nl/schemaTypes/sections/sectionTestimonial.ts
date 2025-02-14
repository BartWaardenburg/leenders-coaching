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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'testimonial' }],
    },
  ],
});
