import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* FAQ Section */
export const sectionFAQ = defineType({
  name: 'sectionFAQ',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [{ type: 'faqItem' }],
    },
  ],
});
