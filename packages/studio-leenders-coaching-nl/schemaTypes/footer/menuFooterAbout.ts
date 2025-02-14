import { defineType } from 'sanity';

export const menuFooterAbout = defineType({
  name: 'menuFooterAbout',
  title: 'Menu Footer About',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
});
