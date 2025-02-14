import { defineType } from 'sanity';
import { baseGroups, basePageFields } from './baseFields';

/* Coaching Page */
export const coachingPage = defineType({
  name: 'coachingPage',
  title: 'Coaching',
  type: 'document',
  groups: baseGroups,
  fields: [...basePageFields],
});
