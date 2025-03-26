import { defineType, Rule } from 'sanity';

/* Time Slot Object */
export const timeSlot = defineType({
  name: 'timeSlot',
  title: 'Time Slot',
  type: 'object',
  description: 'Define a time slot with start and end times',
  fields: [
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'datetime',
      description: 'The start time of the slot',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'datetime',
      description: 'The end time of the slot',
      validation: (Rule: Rule) =>
        Rule.required().min(Rule.valueOfField('startTime')),
    },
    {
      name: 'isAvailable',
      title: 'Available',
      type: 'boolean',
      description: 'Whether this time slot is available for booking',
      initialValue: true,
    },
  ],
});
