import { defineType, defineField } from 'sanity';

export const mobileMenu = defineType({
  name: 'mobileMenu',
  title: 'Mobiel menu',
  type: 'object',
  fields: [
    defineField({
      name: 'toggleButton',
      title: 'Toggle knop',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'menuLabel',
      title: 'Menu label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'closeButton',
      title: 'Sluit knop',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const themeToggle = defineType({
  name: 'themeToggle',
  title: 'Thema toggle',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Toggle label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const buttonLabels = defineType({
  name: 'buttonLabels',
  title: 'Knop labels',
  type: 'object',
  fields: [
    defineField({
      name: 'loadMore',
      title: 'Laad meer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readMore',
      title: 'Lees meer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submit',
      title: 'Verstuur',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'close',
      title: 'Sluiten',
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
      title: 'Mobiel menu',
      type: 'mobileMenu',
    }),
    defineField({
      name: 'themeToggle',
      title: 'Thema toggle',
      type: 'themeToggle',
    }),
    defineField({
      name: 'buttons',
      title: 'Knop labels',
      type: 'buttonLabels',
    }),
  ],
});
