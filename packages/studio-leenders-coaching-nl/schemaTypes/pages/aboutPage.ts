import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* About Page */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Over Mij',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
  preview: {
    select: {
      title: 'title',
    },
  },
});
