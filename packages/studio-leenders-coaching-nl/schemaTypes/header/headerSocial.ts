import { defineType } from 'sanity';

export const headerSocial = defineType({
  name: 'headerSocial',
  title: 'Header Social',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
});
