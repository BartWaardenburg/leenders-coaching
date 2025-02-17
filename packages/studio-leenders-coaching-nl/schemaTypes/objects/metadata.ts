import { defineType, defineField } from 'sanity';

export const openGraphImage = defineType({
  name: 'openGraphImage',
  title: 'Open Graph Image',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      description: 'Width of the image in pixels',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      description: 'Height of the image in pixels',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
    }),
  ],
});

export const openGraph = defineType({
  name: 'openGraph',
  title: 'Open Graph',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title for social media sharing',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description for social media sharing',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'The type of content (e.g., website, article)',
      initialValue: 'website',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The canonical URL of the page',
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of the website',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'openGraphImage',
    }),
  ],
});

export const twitterImage = defineType({
  name: 'twitterImage',
  title: 'Twitter Image',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
    }),
  ],
});

export const twitter = defineType({
  name: 'twitter',
  title: 'Twitter',
  type: 'object',
  fields: [
    defineField({
      name: 'card',
      title: 'Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary', value: 'summary' },
          { title: 'Summary with Large Image', value: 'summary_large_image' },
        ],
      },
    }),
    defineField({
      name: 'site',
      title: 'Site Account',
      type: 'string',
      description: '@username of website',
    }),
    defineField({
      name: 'creator',
      title: 'Creator Account',
      type: 'string',
      description: '@username of content creator',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'twitterImage',
    }),
  ],
});

export const googleBot = defineType({
  name: 'googleBot',
  title: 'Google Bot Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'index',
      title: 'Allow Google Indexing',
      type: 'boolean',
      description: 'Allow Google to index this page',
      initialValue: true,
    }),
    defineField({
      name: 'follow',
      title: 'Allow Google Following Links',
      type: 'boolean',
      description: 'Allow Google to follow links on this page',
      initialValue: true,
    }),
  ],
});

export const robots = defineType({
  name: 'robots',
  title: 'Robots',
  type: 'object',
  fields: [
    defineField({
      name: 'index',
      title: 'Allow Indexing',
      type: 'boolean',
      description: 'Allow search engines to index this page',
      initialValue: true,
    }),
    defineField({
      name: 'follow',
      title: 'Allow Following Links',
      type: 'boolean',
      description: 'Allow search engines to follow links on this page',
      initialValue: true,
    }),
    defineField({
      name: 'googleBot',
      title: 'Google Bot Settings',
      type: 'googleBot',
    }),
  ],
});

export const metadata = defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title that appears in search engines and browser tabs',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the page for search engines',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords that help search engines understand the content',
    }),
    defineField({
      name: 'openGraph',
      title: 'Open Graph',
      type: 'openGraph',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter',
      type: 'twitter',
    }),
    defineField({
      name: 'robots',
      title: 'Robots',
      type: 'robots',
    }),
  ],
});
