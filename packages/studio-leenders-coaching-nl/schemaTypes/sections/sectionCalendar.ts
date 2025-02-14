import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Calendar Section */
export const sectionCalendar = defineType({
  name: 'sectionCalendar',
  title: 'Calendar Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'settings',
      title: 'Calendar Settings',
      type: 'calendarSettings',
    },
  ],
});
