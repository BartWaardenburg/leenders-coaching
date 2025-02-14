import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* Home Page */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
});
