import { defineType } from 'sanity';

/* Pricing Card Object */
export const pricingCard = defineType({
  name: 'pricingCard',
  title: 'Pricing Card',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      type: 'string',
      title: 'Price',
      description: 'Price per session (e.g. "€75" or "Gratis")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'features',
      type: 'array',
      title: 'Features',
      description: 'List of features included in this package',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Feature Text',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isPopular',
      type: 'boolean',
      title: 'Is Popular Package',
      description: 'Highlight this as the most chosen package',
      initialValue: false,
    },
    {
      name: 'ctaLabel',
      type: 'string',
      title: 'Button Text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'variant',
      type: 'colorVariant',
      title: 'Color Variant',
      initialValue: 'blue',
    },
  ],
});
