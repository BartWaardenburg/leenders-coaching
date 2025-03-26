import { defineType } from 'sanity';

/* Call to Action Object */
export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Button Text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'href',
      type: 'string',
      title: 'Button Link',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Button Variant',
      options: {
        list: [
          { title: 'Black', value: 'black' },
          { title: 'Transparent', value: 'transparent' },
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Green', value: 'green' },
          { title: 'Pink', value: 'pink' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Teal', value: 'teal' },
        ],
      },
      initialValue: 'black',
    },
    {
      name: 'isExternal',
      type: 'boolean',
      title: 'Open in New Tab',
      description: 'If checked, the link will open in a new tab',
      initialValue: false,
    },
  ],
});
