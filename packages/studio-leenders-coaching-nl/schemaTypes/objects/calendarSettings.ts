import { defineType } from 'sanity';

/* Calendar Settings Object */
export const calendarSettings = defineType({
  name: 'calendarSettings',
  title: 'Calendar Settings',
  type: 'object',
  fields: [
    {
      name: 'availableDays',
      title: 'Available Days',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
    },
    {
      name: 'availableTimeSlots',
      title: 'Available Time Slots',
      type: 'array',
      of: [{ type: 'timeSlot' }],
    },
    {
      name: 'excludedDates',
      title: 'Excluded Dates',
      type: 'array',
      of: [{ type: 'date' }],
    },
  ],
});
