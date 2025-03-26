import { defineType, Rule } from 'sanity';
import { baseSectionFields } from './baseFields';

/* FAQ Section */
export const sectionFAQ = defineType({
  name: 'sectionFAQ',
  title: 'FAQ Section',
  type: 'document',
  description: 'A section for displaying frequently asked questions',
  fields: [
    ...baseSectionFields,
    {
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      description: 'List of questions and answers to display',
      of: [{ type: 'faqItem' }],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
  ],
});
