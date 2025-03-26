import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Calendar Section */
export const sectionCalendar = defineType({
  name: 'sectionCalendar',
  title: 'Calendar Section',
  type: 'document',
  description:
    'A section for displaying an interactive calendar with optional title and description',
  fields: [
    ...baseSectionFields,
    {
      name: 'settings',
      title: 'Calendar Settings',
      type: 'calendarSettings',
      description: 'Configure the calendar display and availability',
      validation: (Rule: any) => Rule.required(),
    },
  ],
});
