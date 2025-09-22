import { defineType, defineField } from 'sanity';

/* Feature Item Object */
export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature item',
  type: 'object',
  description:
    'Een feature item met titel, beschrijving, afbeelding en optionele link',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'De titel van de feature',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      description: 'Een korte beschrijving van de feature',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'accessibleImage',
      description: 'Illustratieve afbeelding voor de feature',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description: 'Optionele link voor dit feature item',
    }),
  ],
});
