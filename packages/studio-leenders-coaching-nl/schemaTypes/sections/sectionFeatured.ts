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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'items',
      title: 'Featured Items',
      type: 'array',
      of: [{ type: 'featureItem' }],
    },
  ],
});
