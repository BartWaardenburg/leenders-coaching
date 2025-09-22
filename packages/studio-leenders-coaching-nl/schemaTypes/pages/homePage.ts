import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* Home Page */
export const homePage = defineType({
  name: 'homePage',
  title: 'Homepagina',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
  preview: {
    select: {
      title: 'title',
    },
  },
});
