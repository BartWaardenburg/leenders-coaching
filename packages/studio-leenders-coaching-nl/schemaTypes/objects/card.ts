import { defineType } from 'sanity';

/* Card Object */
export const card = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the card',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'The main content of the card',
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Whether this is a featured card',
      initialValue: false,
    },
    {
      name: 'date',
      type: 'string',
      title: 'Date',
      description: 'Optional date to display',
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      description: 'Optional categories to display',
      of: [{ type: 'string' }],
    },
    {
      name: 'slug',
      type: 'string',
      title: 'Link URL',
      description: 'Optional URL to link to (e.g., /blog/post-slug)',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'The card image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'variant',
      type: 'colorVariant',
      title: 'Color Variant',
      description: 'The color theme of the card',
      initialValue: 'blue',
    },
    {
      name: 'reverse',
      type: 'boolean',
      title: 'Reverse Layout',
      description: 'Whether to reverse the image and content layout',
      initialValue: false,
    },
    {
      name: 'border',
      type: 'boolean',
      title: 'Show Border',
      description: 'Whether to show a border around the card',
      initialValue: false,
    },
  ],
});
