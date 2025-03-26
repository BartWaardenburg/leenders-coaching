import { defineType, defineField } from 'sanity';

/* Blog labels for UI text configuration */
export const blogLabels = defineType({
  name: 'blogLabels',
  title: 'Blog Labels',
  type: 'object',
  description: 'Configure text labels used in the blog section',
  fields: [
    defineField({
      name: 'featured',
      title: 'Featured Label',
      type: 'string',
      description: 'Text to show for featured posts',
      validation: (Rule) => Rule.required(),
      initialValue: 'Uitgelicht',
    }),
    defineField({
      name: 'readArticle',
      title: 'Read Article',
      type: 'string',
      description: 'Text for the read article button',
      validation: (Rule) => Rule.required(),
      initialValue: 'Lees artikel',
    }),
  ],
});

/* Blog URL path configuration */
export const blogPaths = defineType({
  name: 'blogPaths',
  title: 'Blog URL Paths',
  type: 'object',
  description: 'Configure URL paths for the blog section',
  fields: [
    defineField({
      name: 'blog',
      title: 'Blog Path',
      type: 'string',
      description: 'The URL path for the blog section (e.g., "/blog")',
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
      title: 'URL Paths',
      type: 'blogPaths',
    }),
  ],
});
