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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'events',
      title: 'Timeline Events',
      type: 'array',
      of: [{ type: 'timelineEvent' }],
      validation: (rule: Rule) => rule.unique(),
    },
  ],
});
