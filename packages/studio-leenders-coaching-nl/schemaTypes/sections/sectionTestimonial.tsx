import React from 'react';
import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Testimonial Section */
export const sectionTestimonial = defineType({
  name: 'sectionTestimonial',
  title: 'Getuigenissen sectie',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'testimonials',
      title: 'Getuigenissen',
      type: 'array',
      description: 'Voeg getuigenissen toe om te tonen in de carousel',
      of: [{ type: 'testimonial' }],
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
        title: title || 'Getuigenissen sectie',
        subtitle: subtitle,
        media: (
          <SectionPreview variant={background} title="Getuigenissen sectie" />
        ),
      };
    },
  },
});
