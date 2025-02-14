import { defineType } from 'sanity';

/* Card Object */
export const card = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'link', type: 'link', title: 'Link' },
  ],
});
