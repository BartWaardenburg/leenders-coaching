import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* Approach Page */
export const approachPage = defineType({
  name: 'approachPage',
  title: 'Aanpak',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
});
