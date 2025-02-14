import { defineType } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Media Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
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
});
