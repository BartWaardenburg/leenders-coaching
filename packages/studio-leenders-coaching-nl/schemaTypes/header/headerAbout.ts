import { defineType } from 'sanity';

export const headerAbout = defineType({
  name: 'headerAbout',
  title: 'Header over',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
    },
  ],
});
