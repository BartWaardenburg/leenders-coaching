import { defineType } from 'sanity';

export const menuFooter = defineType({
  name: 'menuFooter',
  title: 'Menu Footer',
  type: 'document',
  fields: [
    {
      name: 'about',
      title: 'About Section',
      type: 'menuFooterAbout',
    },
    {
      name: 'social',
      title: 'Social Section',
      type: 'menuFooterSocial',
    },
    {
      name: 'contact',
      title: 'Contact Section',
      type: 'menuFooterContact',
    },
  ],
});
