import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Header Section */
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Header Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'callToAction',
    },
  ],
});
