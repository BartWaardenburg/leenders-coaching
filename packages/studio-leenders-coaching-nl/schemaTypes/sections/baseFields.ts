import { Rule } from 'sanity';

/* Base section fields that all sections will share */
export const baseSectionFields = [
  {
    name: 'title',
    title: 'Internal Title',
    type: 'string',
    description: 'Title for internal reference only',
    validation: (rule: Rule) => rule.required(),
  },
  {
    name: 'displayTitle',
    title: 'Display Title',
    type: 'string',
    description: 'Title that will be displayed on the website (optional)',
  },
  {
    name: 'subtitle',
    title: 'Subtitle',
    type: 'string',
  },
  {
    name: 'background',
    title: 'Background Color',
    type: 'string',
    options: {
      list: [
        { title: 'Blue', value: 'blue' },
        { title: 'Purple', value: 'purple' },
        { title: 'Green', value: 'green' },
        { title: 'Pink', value: 'pink' },
        { title: 'Yellow', value: 'yellow' },
        { title: 'Teal', value: 'teal' },
      ],
    },
  },
  {
    name: 'showBorder',
    title: 'Show Border Under Title',
    type: 'boolean',
    initialValue: false,
  },
];
