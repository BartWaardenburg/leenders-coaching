import { defineType } from 'sanity';

/* Timeline Event Object */
export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'date', type: 'string', title: 'Date' },
    { name: 'description', type: 'text', title: 'Description' },
  ],
});
