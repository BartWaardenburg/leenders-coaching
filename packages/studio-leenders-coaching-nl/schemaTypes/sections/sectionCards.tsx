import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Cards Section */
export const sectionCards = defineType({
  name: 'sectionCards',
  title: 'Kaarten sectie',
  type: 'document',
  description:
    'Een sectie voor het tonen van een raster van kaarten met optionele titel en beschrijving',
  fields: [
    ...baseSectionFields,
    {
      name: 'cards',
      title: 'Kaarten',
      type: 'array',
      description: 'Voeg kaarten toe om te tonen in het raster',
      validation: (Rule: any) => Rule.required().min(1),
      of: [{ type: 'card' }],
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
        title: title || 'Kaarten sectie',
        subtitle: subtitle,
        media: <SectionPreview variant={background} title="Kaarten sectie" />,
      };
    },
  },
});
