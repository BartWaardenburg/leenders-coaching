import { defineType, defineField } from 'sanity';

export const closeButtons = defineType({
  name: 'closeButtons',
  title: 'Close Button Labels',
  type: 'object',
  fields: [
    defineField({
      name: 'toast',
      title: 'Toast Notification',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modal',
      title: 'Modal Dialog',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const calendarNavigation = defineType({
  name: 'calendarNavigation',
  title: 'Calendar Navigation',
  type: 'object',
  fields: [
    defineField({
      name: 'previousMonth',
      title: 'Previous Month',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nextMonth',
      title: 'Next Month',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const accessibility = defineType({
  name: 'accessibility',
  title: 'Accessibility',
  type: 'object',
  fields: [
    defineField({
      name: 'closeButtons',
      title: 'Close Button Labels',
      type: 'closeButtons',
    }),
    defineField({
      name: 'calendar',
      title: 'Calendar Navigation',
      type: 'calendarNavigation',
    }),
  ],
});
