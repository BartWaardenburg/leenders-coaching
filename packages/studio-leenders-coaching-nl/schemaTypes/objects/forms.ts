import { defineType, defineField } from 'sanity';

export const formMessages = defineType({
  name: 'formMessages',
  title: 'Formulier berichten',
  type: 'object',
  fields: [
    defineField({
      name: 'required',
      title: 'Verplicht veld',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'invalid',
      title: 'Ongeldig formaat',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'success',
      title: 'Succes bericht',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'error',
      title: 'Fout bericht',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const forms = defineType({
  name: 'forms',
  title: 'Formulieren',
  type: 'object',
  fields: [
    defineField({
      name: 'messages',
      title: 'Formulier berichten',
      type: 'formMessages',
    }),
  ],
});
