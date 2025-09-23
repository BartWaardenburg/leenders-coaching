import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* Voorwaarden (Terms & Conditions) Page */
export const voorwaardenPage = defineType({
  name: 'voorwaardenPage',
  title: 'Voorwaarden',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
  preview: {
    select: {
      title: 'title',
    },
  },
});
