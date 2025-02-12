import { defineType } from 'sanity';

export const menuFooterSocial = defineType({
  name: 'menuFooterSocial',
  title: 'Menu Footer Social',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
});
