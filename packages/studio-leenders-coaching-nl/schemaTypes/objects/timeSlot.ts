import { defineType, Rule } from 'sanity';

/* Time Slot Object */
export const timeSlot = defineType({
  name: 'timeSlot',
  title: 'Tijdslot',
  type: 'object',
  description: 'Definieer een tijdslot met begin- en eindtijd',
  fields: [
    {
      name: 'startTime',
      title: 'Begintijd',
      type: 'datetime',
      description: 'De begintijd van het slot',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'endTime',
      title: 'Eindtijd',
      type: 'datetime',
      description: 'De eindtijd van het slot',
      validation: (Rule: Rule) =>
        Rule.required().min(Rule.valueOfField('startTime')),
    },
    {
      name: 'isAvailable',
      title: 'Beschikbaar',
      type: 'boolean',
      description: 'Of dit tijdslot beschikbaar is voor boeking',
      initialValue: true,
    },
  ],
});
