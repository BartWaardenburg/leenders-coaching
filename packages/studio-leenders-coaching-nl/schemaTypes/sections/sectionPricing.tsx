import React from 'react';
import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Pricing Section */
export const sectionPricing = defineType({
  name: 'sectionPricing',
  title: 'Prijs sectie',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'packages',
      title: 'Prijs pakketten',
      type: 'array',
      description: 'Voeg prijs pakketten toe om te tonen',
      of: [{ type: 'pricingCard' }],
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      background: 'background',
    },
    prepare({ title, subtitle, background }) {
      return {
        title: title || 'Prijs sectie',
        subtitle: subtitle,
        media: <SectionPreview variant={background} title="Prijs sectie" />,
      };
    },
  },
});
