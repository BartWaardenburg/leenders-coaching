import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Form Section */
export const sectionForm = defineType({
  name: 'sectionForm',
  title: 'Contact Form Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'form',
      title: 'Form Configuration',
      type: 'formConfiguration',
      description: 'Configure email settings and submit button text',
    },
  ],
});
