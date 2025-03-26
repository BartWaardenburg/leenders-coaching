import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Pricing Section */
export const sectionPricing = defineType({
  name: 'sectionPricing',
  title: 'Pricing Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'packages',
      title: 'Pricing Packages',
      type: 'array',
      description: 'Add pricing packages to display',
      of: [{ type: 'pricingCard' }],
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
});
