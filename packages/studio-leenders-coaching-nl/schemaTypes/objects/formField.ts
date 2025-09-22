import { defineType, defineField } from 'sanity';

/* Form Field Option Object */
export const formFieldOption = defineType({
  name: 'formFieldOption',
  title: 'Formulier veld optie',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Waarde',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

/* Form Field Object */
export const formField = defineType({
  name: 'formField',
  title: 'Formulier veld',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Veld type',
      type: 'string',
      options: {
        list: [
          { title: 'Tekst', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Textarea', value: 'textarea' },
          { title: 'Selecteer', value: 'select' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'required',
      title: 'Verplicht',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'options',
      title: 'Opties',
      type: 'array',
      of: [{ type: 'formFieldOption' }],
      hidden: ({ parent }) => parent?.type !== 'select',
    }),
  ],
});
