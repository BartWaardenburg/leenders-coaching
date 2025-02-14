import { defineType } from 'sanity';

/* Form Field Object */
export const formField = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', title: 'Label' },
    {
      name: 'type',
      title: 'Field Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Textarea', value: 'textarea' },
        ],
      },
    },
    { name: 'required', type: 'boolean', title: 'Required' },
  ],
});
