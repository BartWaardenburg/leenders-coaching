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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'pricingCards',
      title: 'Pricing Cards',
      type: 'array',
      of: [{ type: 'pricingCard' }],
    },
  ],
});
