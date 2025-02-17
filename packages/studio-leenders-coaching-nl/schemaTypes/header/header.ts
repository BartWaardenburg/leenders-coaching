import { defineType } from 'sanity';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [{ type: 'navigationItem' }],
    },
    {
      name: 'about',
      title: 'About Section',
      type: 'headerAbout',
    },
    {
      name: 'social',
      title: 'Social Section',
      type: 'headerSocial',
    },
    {
      name: 'contact',
      title: 'Contact Section',
      type: 'headerContact',
    },
  ],
});
