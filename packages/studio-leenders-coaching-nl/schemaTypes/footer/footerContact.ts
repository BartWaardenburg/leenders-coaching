import { defineType } from 'sanity';

export const footerContact = defineType({
  name: 'footerContact',
  title: 'Footer contact',
  type: 'object',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    },
    {
      name: 'phone',
      title: 'Telefoon',
      type: 'string',
    },
  ],
});
