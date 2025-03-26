import { defineType } from 'sanity';

/* Calendar Settings Object */
export const calendarSettings = defineType({
  name: 'calendarSettings',
  title: 'Calendar Settings',
  type: 'object',
  description: 'Configure the calendar display and availability settings',
  fields: [
    {
      name: 'initialDate',
      title: 'Initial Selected Date',
      type: 'date',
      description:
        'Optional initial date to display (defaults to current date if not set)',
    },
    {
      name: 'disabledDates',
      title: 'Disabled Dates Configuration',
      type: 'object',
      description: 'Configure which dates should be disabled in the calendar',
      fields: [
        {
          name: 'daysOfWeek',
          title: 'Disabled Days of Week',
          type: 'array',
          description:
            'Select which days of the week should be disabled (0 = Sunday, 6 = Saturday)',
          of: [{ type: 'number' }],
          validation: (Rule) =>
            Rule.custom((numbers: number[]) => {
              if (!numbers) return true;
              return numbers.every((n) => n >= 0 && n <= 6)
                ? true
                : 'Days must be between 0 (Sunday) and 6 (Saturday)';
            }),
        },
        {
          name: 'dates',
          title: 'Specific Disabled Dates',
          type: 'array',
          description: 'Add specific dates that should be disabled',
          of: [{ type: 'date' }],
        },
        {
          name: 'ranges',
          title: 'Disabled Date Ranges',
          type: 'array',
          description: 'Add date ranges that should be disabled',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'start',
                  title: 'Start Date',
                  type: 'date',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'end',
                  title: 'End Date',
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
                    : 'End date must be after or equal to start date';
                }),
            },
          ],
        },
        {
          name: 'before',
          title: 'Disable Before Date',
          type: 'date',
          description: 'Disable all dates before this date',
        },
        {
          name: 'after',
          title: 'Disable After Date',
          type: 'date',
          description: 'Disable all dates after this date',
        },
      ],
    },
  ],
});
