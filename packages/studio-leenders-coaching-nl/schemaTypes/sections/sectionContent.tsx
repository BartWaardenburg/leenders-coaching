import React from 'react';
import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Content Section */
export const sectionContent = defineType({
  name: 'sectionContent',
  title: 'Inhoud sectie',
  type: 'document',
  description: 'Een sectie voor rijke tekst inhoud met optionele titel',
  fields: [
    ...baseSectionFields,
    {
      name: 'content',
      title: 'Inhoud',
      type: 'richText',
      description:
        'De hoofdininhoud van de sectie. Je kunt tekst opmaak, koppen gebruiken en afbeeldingen toevoegen.',
      validation: (Rule) => Rule.required(),
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
        title: title || 'Inhoud sectie',
        subtitle: subtitle,
        media: <SectionPreview variant={background} title="Inhoud sectie" />,
      };
    },
  },
});
