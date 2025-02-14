import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* Blog Page */
export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
});
