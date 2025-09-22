import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Featured Section */
export const sectionFeatured = defineType({
  name: 'sectionFeatured',
  title: 'Uitgelichte sectie',
  type: 'document',
  description: 'Een sectie met afbeelding en inhoud in een 50/50 layout',
  fields: [
    ...baseSectionFields,
    {
      name: 'image',
      title: 'Afbeelding',
      type: 'accessibleImage',
      description: 'Hoofdafbeelding voor de uitgelichte sectie',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cta',
      title: 'Actieknop',
      type: 'callToAction',
      description: 'Optionele call-to-action knop',
    },
    {
      name: 'reverse',
      title: 'Layout omkeren',
      type: 'boolean',
      description: 'De volgorde van inhoud en afbeelding omkeren',
      initialValue: false,
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
        title: title || 'Uitgelichte sectie',
        subtitle: subtitle,
        media: (
          <SectionPreview variant={background} title="Uitgelichte sectie" />
        ),
      };
    },
  },
});
