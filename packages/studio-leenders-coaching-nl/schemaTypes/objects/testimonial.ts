import { defineType } from 'sanity';

/* Testimonial Object */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    { name: 'quote', type: 'text', title: 'Quote' },
    { name: 'name', type: 'string', title: 'Author Name' },
    { name: 'role', type: 'string', title: 'Author Role/Title' },
    {
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
});
