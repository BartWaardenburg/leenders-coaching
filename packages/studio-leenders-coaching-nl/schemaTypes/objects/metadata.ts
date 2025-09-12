import { defineType, defineField } from 'sanity';

/**
 * Open Graph image schema for social media sharing.
 * Defines image settings with dimensions and accessibility.
 */
export const openGraphImage = defineType({
  name: 'openGraphImage',
  title: 'Open Graph Image',
  type: 'object',
  description: 'Image settings for social media sharing',
  fields: [
    defineField({
      name: 'url',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Recommended size: 1200x630 pixels',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      description: 'Width of the image in pixels',
      initialValue: 1200,
      validation: (Rule) => Rule.required().min(200).max(5000),
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      description: 'Height of the image in pixels',
      initialValue: 630,
      validation: (Rule) => Rule.required().min(200).max(5000),
    }),
  ],
});

/**
 * Open Graph metadata schema for social media sharing.
 * Configures how content appears when shared on social platforms.
 */
export const openGraph = defineType({
  name: 'openGraph',
  title: 'Open Graph',
  type: 'object',
  description: 'Settings for social media sharing',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title for social media sharing (max 60 characters)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description for social media sharing (max 155 characters)',
      validation: (Rule) => Rule.max(155),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'The type of content',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Article', value: 'article' },
        ],
      },
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
      initialValue: 'Leenders Coaching',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'openGraphImage',
      description: 'Image for social media sharing',
    }),
  ],
});

/**
 * Twitter-specific image schema for Twitter cards.
 * Handles image display in Twitter sharing previews.
 */
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

/**
 * Twitter card configuration schema.
 * Defines how content appears when shared on Twitter.
 */
export const twitter = defineType({
  name: 'twitter',
  title: 'Twitter Card',
  type: 'object',
  description: 'Settings for Twitter sharing',
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
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'site',
      title: 'Site Account',
      type: 'string',
      description: '@username of website (without @)',
      validation: (Rule) =>
        Rule.custom((username) => {
          if (!username) return true;
          if (username.startsWith('@')) return 'Please remove the @ symbol';
          return true;
        }),
    }),
    defineField({
      name: 'creator',
      title: 'Creator Account',
      type: 'string',
      description: '@username of content creator (without @)',
      validation: (Rule) =>
        Rule.custom((username) => {
          if (!username) return true;
          if (username.startsWith('@')) return 'Please remove the @ symbol';
          return true;
        }),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'twitterImage',
    }),
  ],
});

/**
 * Google Bot specific settings schema.
 * Controls Google crawler behavior for indexing and following links.
 */
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

/**
 * Search engine robots configuration schema.
 * Controls how search engines interact with pages and content.
 */
export const robots = defineType({
  name: 'robots',
  title: 'Search Engine Settings',
  type: 'object',
  description: 'Control how search engines interact with this page',
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
      title: 'Google-specific Settings',
      type: 'object',
      description: "Special settings for Google's crawler",
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
    }),
  ],
});

/**
 * Complete metadata schema for SEO and social sharing.
 * Combines all metadata fields including OpenGraph, Twitter, and robots settings.
 */
export const metadata = defineType({
  name: 'metadata',
  title: 'SEO & Metadata',
  type: 'object',
  description: 'Search engine optimization and social sharing settings',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description: 'Page title for search engines (max 60 characters)',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      description: 'Brief description for search results (max 155 characters)',
      validation: (Rule) => Rule.required().max(155),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Keywords to help search engines understand the content (optional)',
    }),
    defineField({
      name: 'openGraph',
      title: 'Social Media Sharing',
      type: 'openGraph',
      description: 'Settings for social media sharing previews',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter Settings',
      type: 'twitter',
      description: 'Specific settings for Twitter sharing',
    }),
    defineField({
      name: 'robots',
      title: 'Search Engine Settings',
      type: 'robots',
      description: 'Control how search engines handle this page',
    }),
  ],
});
