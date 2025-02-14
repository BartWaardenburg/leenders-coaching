import { defineType } from 'sanity';

/* FAQ Item Object */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    { name: 'question', type: 'string', title: 'Question' },
    { name: 'answer', type: 'text', title: 'Answer' },
  ],
});
