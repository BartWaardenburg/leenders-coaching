import { defineType } from 'sanity';

export const footerContact = defineType({
  name: 'footerContact',
  title: 'Footer Contact',
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
      title: 'Phone',
      type: 'string',
    },
  ],
});
