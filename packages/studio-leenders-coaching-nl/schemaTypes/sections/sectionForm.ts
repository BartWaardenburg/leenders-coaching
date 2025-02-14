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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'form',
      title: 'Form Configuration',
      type: 'formConfiguration',
    },
  ],
});
