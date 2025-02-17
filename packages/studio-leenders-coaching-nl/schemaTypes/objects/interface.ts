import { defineType, defineField } from 'sanity';

export const mobileMenu = defineType({
  name: 'mobileMenu',
  title: 'Mobile Menu',
  type: 'object',
  fields: [
    defineField({
      name: 'toggleButton',
      title: 'Toggle Button',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'menuLabel',
      title: 'Menu Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'closeButton',
      title: 'Close Button',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const themeToggle = defineType({
  name: 'themeToggle',
  title: 'Theme Toggle',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Toggle Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const buttonLabels = defineType({
  name: 'buttonLabels',
  title: 'Button Labels',
  type: 'object',
  fields: [
    defineField({
      name: 'loadMore',
      title: 'Load More',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readMore',
      title: 'Read More',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submit',
      title: 'Submit',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'close',
      title: 'Close',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const uiInterface = defineType({
  name: 'uiInterface',
  title: 'Interface',
  type: 'object',
  fields: [
    defineField({
      name: 'mobileMenu',
      title: 'Mobile Menu',
      type: 'mobileMenu',
    }),
    defineField({
      name: 'themeToggle',
      title: 'Theme Toggle',
      type: 'themeToggle',
    }),
    defineField({
      name: 'buttons',
      title: 'Button Labels',
      type: 'buttonLabels',
    }),
  ],
});
