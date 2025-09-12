import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Featured Section */
export const sectionFeatured = defineType({
  name: 'sectionFeatured',
  title: 'Featured Section',
  type: 'document',
  description: 'A section with image and content in a 50/50 layout',
  fields: [
    ...baseSectionFields,
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'The main image for the featured section',
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
          validation: (Rule) => Rule.required().min(3),
        },
      ],
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'callToAction',
      description: 'Optional call-to-action button',
    },
    {
      name: 'reverse',
      title: 'Reverse Layout',
      type: 'boolean',
      description: 'Reverse the order of content and image',
      initialValue: false,
    },
  ],
});
