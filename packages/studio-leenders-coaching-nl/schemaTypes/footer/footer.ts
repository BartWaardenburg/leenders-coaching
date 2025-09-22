import { defineType } from 'sanity';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'copyright',
      title: 'Copyright tekst',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'contact',
      title: 'Contact informatie',
      type: 'footerContact',
    },
    {
      name: 'socialLinks',
      title: 'Social media links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    },
  ],
  preview: {
    select: {
      title: 'copyright',
      subtitle: 'contact.email',
    },
  },
});
