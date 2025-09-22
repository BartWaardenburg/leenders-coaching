import { defineType, defineField } from 'sanity';

/* Blog labels for UI text configuration */
export const blogLabels = defineType({
  name: 'blogLabels',
  title: 'Blog labels',
  type: 'object',
  description: 'Configureer tekst labels gebruikt in de blog sectie',
  fields: [
    defineField({
      name: 'featured',
      title: 'Uitgelicht label',
      type: 'string',
      description: 'Tekst om te tonen voor uitgelichte posts',
      validation: (Rule) => Rule.required(),
      initialValue: 'Uitgelicht',
    }),
    defineField({
      name: 'readArticle',
      title: 'Lees artikel',
      type: 'string',
      description: 'Tekst voor de lees artikel knop',
      validation: (Rule) => Rule.required(),
      initialValue: 'Lees artikel',
    }),
  ],
});

/* Blog URL path configuration */
export const blogPaths = defineType({
  name: 'blogPaths',
  title: 'Blog URL paden',
  type: 'object',
  description: 'Configureer URL paden voor de blog sectie',
  fields: [
    defineField({
      name: 'blog',
      title: 'Blog pad',
      type: 'string',
      description: 'Het URL pad voor de blog sectie (bijv. "/blog")',
      validation: (Rule) => Rule.required(),
      initialValue: '/blog',
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
      title: 'URL paden',
      type: 'blogPaths',
    }),
  ],
});
