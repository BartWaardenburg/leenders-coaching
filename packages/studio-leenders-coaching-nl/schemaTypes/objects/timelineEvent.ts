import { defineType } from 'sanity';

/* Timeline Event Object */
export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline evenement',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'De titel van de timeline stap',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Beschrijving',
      description: 'De beschrijving van de timeline stap',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      type: 'string',
      title: 'Datum of label',
      description: 'Optionele datum of label voor deze stap',
    },
    {
      name: 'variant',
      type: 'colorVariant',
      title: 'Kleurvariant',
      description: 'Optionele kleuroverride voor deze stap',
    },
  ],
});
