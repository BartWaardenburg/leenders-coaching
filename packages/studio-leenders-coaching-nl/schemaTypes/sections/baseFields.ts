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
    name: 'maxWidth',
    title: 'Content Max Width',
    type: 'string',
    options: {
      list: [
        { title: 'Small', value: 'sm' },
        { title: 'Medium', value: 'md' },
        { title: 'Large', value: 'lg' },
        { title: 'Extra Large', value: 'xl' },
        { title: '2XL', value: '2xl' },
        { title: '3XL', value: '3xl' },
        { title: '4XL', value: '4xl' },
        { title: '5XL', value: '5xl' },
        { title: '6XL', value: '6xl' },
        { title: '7XL', value: '7xl' },
      ],
    },
    initialValue: '3xl',
  },
  {
    name: 'showBorder',
    title: 'Show Border Under Title',
    type: 'boolean',
    initialValue: false,
  },
];
