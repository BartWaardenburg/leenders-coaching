import { defineType } from 'sanity';

/* Link Object */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    { name: 'text', type: 'string', title: 'Link Text' },
    { name: 'url', type: 'string', title: 'URL' },
  ],
});
