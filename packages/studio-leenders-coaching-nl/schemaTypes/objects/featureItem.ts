import { defineType } from 'sanity';

/* Feature Item Object */
export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature Item',
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
  ],
});
