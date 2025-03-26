import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Featured Section */
export const sectionFeatured = defineType({
  name: 'sectionFeatured',
  title: 'Featured Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'callToAction',
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
