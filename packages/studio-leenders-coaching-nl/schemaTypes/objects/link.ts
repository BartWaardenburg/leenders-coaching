import { defineType, defineField } from 'sanity';

/* Link Object */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  description: 'A link with text and URL',
  fields: [
    defineField({
      name: 'text',
      title: 'Link Text',
      type: 'string',
      description: 'The text to display for the link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The URL the link points to (internal or external)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https', 'tel', 'mailto'],
        }),
    }),
  ],
});
