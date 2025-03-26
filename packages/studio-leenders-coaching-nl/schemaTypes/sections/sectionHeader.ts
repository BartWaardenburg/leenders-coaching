import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Header Section */
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Header Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'primaryCta',
      title: 'Primary Call to Action',
      type: 'callToAction',
    },
    {
      name: 'secondaryCta',
      title: 'Secondary Call to Action',
      type: 'callToAction',
    },
  ],
});
