import { defineType } from 'sanity';

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'href',
      title: 'Link',
      type: 'string',
      validation: (rule) => rule.required(),
    },
  ],
});
