import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Calendar Section */
export const sectionCalendar = defineType({
  name: 'sectionCalendar',
  title: 'Kalender sectie',
  type: 'document',
  description:
    'Een sectie voor het tonen van een interactieve kalender met optionele titel en beschrijving',
  fields: [
    ...baseSectionFields,
    {
      name: 'settings',
      title: 'Kalender instellingen',
      type: 'calendarSettings',
      description: 'Configureer de kalender weergave en beschikbaarheid',
      validation: (Rule: any) => Rule.required(),
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
        title: title || 'Kalender sectie',
        subtitle: subtitle,
        media: <SectionPreview variant={background} title="Kalender sectie" />,
      };
    },
  },
});
