import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* Privacy Page */
export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
  preview: {
    select: {
      title: 'title',
    },
  },
});
