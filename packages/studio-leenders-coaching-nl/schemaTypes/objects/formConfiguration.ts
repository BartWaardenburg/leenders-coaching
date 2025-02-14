import { defineType } from 'sanity';

/* Form Configuration Object */
export const formConfiguration = defineType({
  name: 'formConfiguration',
  title: 'Form Configuration',
  type: 'object',
  fields: [
    {
      name: 'submitLabel',
      type: 'string',
      title: 'Submit Button Label',
      initialValue: 'Verstuur bericht',
    },
    {
      name: 'successMessage',
      type: 'text',
      title: 'Success Message',
      initialValue:
        'Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.',
    },
    {
      name: 'errorMessage',
      type: 'text',
      title: 'Error Message',
      initialValue:
        'Er is iets misgegaan. Probeer het later opnieuw of neem contact op via email.',
    },
  ],
});
