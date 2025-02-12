import { defineType } from 'sanity';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'footerContact',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    },
  ],
});
