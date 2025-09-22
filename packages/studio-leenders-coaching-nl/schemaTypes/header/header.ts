import { defineType } from 'sanity';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'navigation',
      title: 'Navigatie',
      type: 'array',
      of: [{ type: 'navigationItem' }],
    },
    {
      name: 'about',
      title: 'Over sectie',
      type: 'headerAbout',
    },
    {
      name: 'social',
      title: 'Social sectie',
      type: 'headerSocial',
    },
    {
      name: 'contact',
      title: 'Contact sectie',
      type: 'headerContact',
    },
  ],
  preview: {
    select: {
      title: 'about.title',
      subtitle: 'about.description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Header',
        subtitle: subtitle || 'Navigatie & Layout',
      };
    },
  },
});
