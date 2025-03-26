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
    name: 'description',
    title: 'Description',
    type: 'string',
    description: 'Description for the section',
  },
  {
    name: 'background',
    title: 'Background Color',
    type: 'colorVariant',
    description: 'Background color for the section',
  },
  {
    name: 'border',
    title: 'Show Border',
    type: 'boolean',
    initialValue: false,
    description: 'Whether to show a border around the section',
  },
];
