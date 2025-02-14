import { defineType } from 'sanity';

/* Call to Action Object */
export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  fields: [
    { name: 'text', type: 'string', title: 'Button Text' },
    { name: 'link', type: 'string', title: 'Button Link' },
    {
      name: 'variant',
      type: 'string',
      title: 'Button Variant',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Text', value: 'text' },
        ],
      },
    },
  ],
});
