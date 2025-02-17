import { defineType } from 'sanity';

export const headerAbout = defineType({
  name: 'headerAbout',
  title: 'Header About',
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
