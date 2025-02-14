import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Cards Section */
export const sectionCards = defineType({
  name: 'sectionCards',
  title: 'Cards Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'card' }],
    },
  ],
});
