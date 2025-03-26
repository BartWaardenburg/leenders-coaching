import { defineType, Rule } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Timeline Section */
export const sectionTimeline = defineType({
  name: 'sectionTimeline',
  title: 'Timeline Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'steps',
      title: 'Timeline Steps',
      type: 'array',
      description: 'Add timeline steps to display',
      of: [{ type: 'timelineEvent' }],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
  ],
});
