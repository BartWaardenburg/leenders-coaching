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
      title: 'Email Subject Template',
      type: 'string',
      description:
        'Subject line template for form submission emails. Use {subject} to include the submitted subject.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit Button Label',
      type: 'string',
      description: 'Text to display on the submit button',
      initialValue: 'Verstuur bericht',
    }),
  ],
});
