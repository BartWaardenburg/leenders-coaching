import { defineType, defineField } from 'sanity';

export const formMessages = defineType({
  name: 'formMessages',
  title: 'Form Messages',
  type: 'object',
  fields: [
    defineField({
      name: 'required',
      title: 'Required Field',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'invalid',
      title: 'Invalid Format',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'success',
      title: 'Success Message',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'error',
      title: 'Error Message',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const forms = defineType({
  name: 'forms',
  title: 'Forms',
  type: 'object',
  fields: [
    defineField({
      name: 'messages',
      title: 'Form Messages',
      type: 'formMessages',
    }),
  ],
});
