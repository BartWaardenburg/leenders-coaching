import { defineType } from 'sanity';

/* Calendar Settings Object */
export const calendarSettings = defineType({
  name: 'calendarSettings',
  title: 'Kalender instellingen',
  type: 'object',
  description:
    'Configureer de kalender weergave en beschikbaarheidsinstellingen',
  fields: [
    {
      name: 'initialDate',
      title: 'Initiële geselecteerde datum',
      type: 'date',
      description:
        'Optionele initiële datum om te tonen (standaard huidige datum als niet ingesteld)',
    },
    {
      name: 'disabledDates',
      title: 'Uitgeschakelde datums configuratie',
      type: 'object',
      description:
        'Configureer welke datums uitgeschakeld moeten worden in de kalender',
      fields: [
        {
          name: 'daysOfWeek',
          title: 'Uitgeschakelde dagen van de week',
          type: 'array',
          description:
            'Selecteer welke dagen van de week uitgeschakeld moeten worden (0 = Zondag, 6 = Zaterdag)',
          of: [{ type: 'number' }],
          validation: (Rule) =>
            Rule.custom((numbers: number[]) => {
              if (!numbers) return true;
              return numbers.every((n) => n >= 0 && n <= 6)
                ? true
                : 'Dagen moeten tussen 0 (Zondag) en 6 (Zaterdag) zijn';
            }),
        },
        {
          name: 'dates',
          title: 'Specifieke uitgeschakelde datums',
          type: 'array',
          description:
            'Voeg specifieke datums toe die uitgeschakeld moeten worden',
          of: [{ type: 'date' }],
        },
        {
          name: 'ranges',
          title: 'Uitgeschakelde datum bereiken',
          type: 'array',
          description:
            'Voeg datum bereiken toe die uitgeschakeld moeten worden',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'start',
                  title: 'Start datum',
                  type: 'date',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'end',
                  title: 'Eind datum',
                  type: 'date',
                  validation: (Rule) =>
                    Rule.required().min(Rule.valueOfField('start')),
                },
              ],
              validation: (Rule) =>
                Rule.custom((range: { start: string; end: string }) => {
                  if (!range?.start || !range?.end) return true;
                  return new Date(range.end) >= new Date(range.start)
                    ? true
                    : 'Eind datum moet na of gelijk aan start datum zijn';
                }),
            },
          ],
        },
        {
          name: 'before',
          title: 'Uitschakelen voor datum',
          type: 'date',
          description: 'Schakel alle datums voor deze datum uit',
        },
        {
          name: 'after',
          title: 'Uitschakelen na datum',
          type: 'date',
          description: 'Schakel alle datums na deze datum uit',
        },
      ],
    },
  ],
});
