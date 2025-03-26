import { defineType } from 'sanity';

/* Color variant options used across multiple schemas */
export const colorVariant = defineType({
  name: 'colorVariant',
  title: 'Color Variant',
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
});
