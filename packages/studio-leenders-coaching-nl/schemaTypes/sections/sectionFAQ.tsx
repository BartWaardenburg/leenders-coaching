import { defineType, Rule } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* FAQ Section */
export const sectionFAQ = defineType({
  name: 'sectionFAQ',
  title: 'FAQ sectie',
  type: 'document',
  description: 'Een sectie voor het tonen van veelgestelde vragen',
  fields: [
    ...baseSectionFields,
    {
      name: 'items',
      title: 'FAQ items',
      type: 'array',
      description: 'Lijst van vragen en antwoorden om te tonen',
      of: [{ type: 'faqItem' }],
      validation: (Rule: Rule) => Rule.required().min(1),
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
        title: title || 'FAQ sectie',
        subtitle: subtitle,
        media: <SectionPreview variant={background} title="FAQ sectie" />,
      };
    },
  },
});
