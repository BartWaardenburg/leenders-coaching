import { defineType } from 'sanity';

/* Time Slot Object */
export const timeSlot = defineType({
  name: 'timeSlot',
  title: 'Time Slot',
  type: 'object',
  fields: [
    { name: 'startTime', type: 'string', title: 'Start Time' },
    { name: 'endTime', type: 'string', title: 'End Time' },
  ],
});
