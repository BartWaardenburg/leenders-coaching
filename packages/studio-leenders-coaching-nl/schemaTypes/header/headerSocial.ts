import { defineType } from 'sanity';

export const headerSocial = defineType({
  name: 'headerSocial',
  title: 'Header social',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'links',
      title: 'Social links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    },
  ],
});
