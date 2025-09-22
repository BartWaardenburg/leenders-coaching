import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Form Section */
export const sectionForm = defineType({
  name: 'sectionForm',
  title: 'Contactformulier sectie',
  type: 'document',
  description:
    'Een sectie met een contactformulier met optionele titel en beschrijving',
  fields: [
    ...baseSectionFields,
    {
      name: 'form',
      title: 'Formulier configuratie',
      type: 'formConfiguration',
      description: 'Configureer email instellingen en verzendknop tekst',
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
        title: title || 'Contactformulier sectie',
        subtitle: subtitle,
        media: (
          <SectionPreview
            variant={background}
            title="Contactformulier sectie"
          />
        ),
      };
    },
  },
});
