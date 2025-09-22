import { defineType, Rule } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Timeline Section */
export const sectionTimeline = defineType({
  name: 'sectionTimeline',
  title: 'Timeline sectie',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'steps',
      title: 'Timeline stappen',
      type: 'array',
      description: 'Voeg timeline stappen toe om te tonen',
      of: [{ type: 'timelineEvent' }],
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
        title: title || 'Timeline sectie',
        subtitle: subtitle,
        media: <SectionPreview variant={background} title="Timeline sectie" />,
      };
    },
  },
});
