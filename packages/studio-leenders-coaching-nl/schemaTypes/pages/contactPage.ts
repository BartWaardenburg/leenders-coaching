import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* Contact Page */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
});
