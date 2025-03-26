import { defineType } from 'sanity';

/* Timeline Event Object */
export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the timeline step',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'The description of the timeline step',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      type: 'string',
      title: 'Date or Label',
      description: 'Optional date or label for this step',
    },
    {
      name: 'variant',
      type: 'colorVariant',
      title: 'Color Variant',
      description: 'Optional color override for this step',
    },
  ],
});
