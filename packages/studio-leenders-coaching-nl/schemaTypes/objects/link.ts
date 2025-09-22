import { defineType, defineField } from 'sanity';

/* Link Object */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  description: 'Een link met tekst en URL',
  fields: [
    defineField({
      name: 'text',
      title: 'Link tekst',
      type: 'string',
      description: 'De tekst om te tonen voor de link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'De URL waar de link naar verwijst (intern of extern)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https', 'tel', 'mailto'],
        }),
    }),
  ],
});
