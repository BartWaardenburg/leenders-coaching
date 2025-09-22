import { defineType, defineField } from 'sanity';

export const closeButtons = defineType({
  name: 'closeButtons',
  title: 'Sluitknop labels',
  type: 'object',
  fields: [
    defineField({
      name: 'toast',
      title: 'Toast notificatie',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modal',
      title: 'Modal dialoog',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const calendarNavigation = defineType({
  name: 'calendarNavigation',
  title: 'Kalender navigatie',
  type: 'object',
  fields: [
    defineField({
      name: 'previousMonth',
      title: 'Vorige maand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nextMonth',
      title: 'Volgende maand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const accessibility = defineType({
  name: 'accessibility',
  title: 'Toegankelijkheid',
  type: 'object',
  fields: [
    defineField({
      name: 'closeButtons',
      title: 'Sluitknop labels',
      type: 'closeButtons',
    }),
    defineField({
      name: 'calendar',
      title: 'Kalender navigatie',
      type: 'calendarNavigation',
    }),
  ],
});
