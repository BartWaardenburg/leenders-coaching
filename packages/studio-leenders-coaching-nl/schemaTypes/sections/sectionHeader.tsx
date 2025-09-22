import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Header Section */
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Header sectie',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'ctas',
      title: 'Actieknoppen',
      type: 'array',
      description: 'Voeg tot 2 call-to-action knoppen toe (optioneel)',
      of: [{ type: 'callToAction' }],
      validation: (Rule) => Rule.max(2),
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
        title: title || 'Header sectie',
        subtitle: subtitle,
        media: <SectionPreview variant={background} title="Header sectie" />,
      };
    },
  },
});
