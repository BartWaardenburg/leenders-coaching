import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Cards Section */
export const sectionCards = defineType({
  name: 'sectionCards',
  title: 'Cards Section',
  type: 'document',
  description:
    'A section for displaying a grid of cards with optional title and description',
  fields: [
    ...baseSectionFields,
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      description: 'Add cards to display in the grid',
      validation: (Rule: any) => Rule.required().min(1),
      of: [{ type: 'card' }],
    },
  ],
});
