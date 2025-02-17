import { defineType, defineField } from 'sanity';

/* Form Configuration Object */
export const formConfiguration = defineType({
  name: 'formConfiguration',
  title: 'Form Configuration',
  type: 'object',
  fields: [
    defineField({
      name: 'emailTo',
      title: 'Email To',
      type: 'string',
      description: 'Email address to send form submissions to',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'emailSubject',
      title: 'Email Subject',
      type: 'string',
      description: 'Subject line for form submission emails',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [{ type: 'formField' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
