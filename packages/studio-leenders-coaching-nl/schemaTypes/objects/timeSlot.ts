import { defineType, Rule } from 'sanity';

/* Time Slot Object */
export const timeSlot = defineType({
  name: 'timeSlot',
  title: 'Tijdslot',
  type: 'object',
  description: 'Definieer een tijdslot met dag van de week en begintijd',
  fields: [
    {
      name: 'dayOfWeek',
      title: 'Dag van de week',
      type: 'number',
      description:
        'Dag van de week (0 = Zondag, 1 = Maandag, ..., 6 = Zaterdag)',
      options: {
        list: [
          { title: 'Zondag', value: 0 },
          { title: 'Maandag', value: 1 },
          { title: 'Dinsdag', value: 2 },
          { title: 'Woensdag', value: 3 },
          { title: 'Donderdag', value: 4 },
          { title: 'Vrijdag', value: 5 },
          { title: 'Zaterdag', value: 6 },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'startTime',
      title: 'Begintijd',
      type: 'string',
      description: 'Begintijd in HH:MM formaat (bijv. 10:00, 13:30)',
      validation: (Rule: Rule) =>
        Rule.required()
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            name: 'time',
            invert: false,
          })
          .error('Voer een geldige tijd in (HH:MM formaat)'),
    },
    {
      name: 'duration',
      title: 'Duur (minuten)',
      type: 'number',
      description: 'Duur van het tijdslot in minuten',
      initialValue: 60,
      validation: (Rule: Rule) => Rule.required().min(15).max(480),
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
