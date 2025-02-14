import { defineType } from 'sanity';

/* Pricing Card Object */
export const pricingCard = defineType({
  name: 'pricingCard',
  title: 'Pricing Card',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'price', type: 'string', title: 'Price' },
    { name: 'description', type: 'text', title: 'Description' },
    {
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [{ type: 'string' }],
    },
    {
      name: 'isPopular',
      type: 'boolean',
      title: 'Is Popular Package',
      initialValue: false,
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Color Variant',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Green', value: 'green' },
          { title: 'Pink', value: 'pink' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Teal', value: 'teal' },
        ],
      },
    },
    { name: 'cta', type: 'callToAction', title: 'Call to Action' },
  ],
});
