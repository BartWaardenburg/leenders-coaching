import { defineType, defineField } from 'sanity';

export const blogLabels = defineType({
  name: 'blogLabels',
  title: 'Blog Labels',
  type: 'object',
  fields: [
    defineField({
      name: 'featured',
      title: 'Featured Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readArticle',
      title: 'Read Article',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const blogPaths = defineType({
  name: 'blogPaths',
  title: 'URL Paths',
  type: 'object',
  fields: [
    defineField({
      name: 'blog',
      title: 'Blog Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const blog = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'object',
  fields: [
    defineField({
      name: 'labels',
      title: 'Labels',
      type: 'blogLabels',
    }),
    defineField({
      name: 'paths',
      title: 'URL Paths',
      type: 'blogPaths',
    }),
  ],
});
