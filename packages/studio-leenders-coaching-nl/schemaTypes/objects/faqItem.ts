import { defineType } from 'sanity';

/* FAQ Item Object */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  description: 'A question and answer pair for the FAQ section',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The question text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'richText',
      description: 'The answer content with rich text formatting',
      validation: (Rule) => Rule.required(),
      options: {
        // Override the default styles to only allow normal and h4
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H4', value: 'h4' },
        ],
      },
    },
  ],
});
