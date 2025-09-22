import { defineType } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social media link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Twitter', value: 'twitter' },
        ],
      },
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
    },
  },
});
