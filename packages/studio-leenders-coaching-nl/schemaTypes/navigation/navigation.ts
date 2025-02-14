import { defineType } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'navigationItem' }],
    },
  ],
});
