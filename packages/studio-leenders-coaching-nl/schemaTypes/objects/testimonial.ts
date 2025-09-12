import { defineType } from 'sanity';

/* Testimonial Object */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    {
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'The testimonial text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'name',
      type: 'string',
      title: 'Author Name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      title: 'Author Role/Title',
      description: 'Optional role or description of the person',
    },
    {
      name: 'image',
      title: 'Author Image',
      type: 'image',
      description:
        'Profile picture of the person giving the testimonial (optional)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            'Beschrijf de inhoud van de afbeelding (voor toegankelijkheid)',
          validation: (Rule: any) => Rule.required().min(3),
        },
      ],
    },
  ],
});
