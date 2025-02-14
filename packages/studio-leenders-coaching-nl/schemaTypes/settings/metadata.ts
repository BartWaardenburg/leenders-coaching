import { defineType } from 'sanity';

export const metadata = defineType({
  name: 'metadata',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description:
        'Title for search engines and social sharing (50-60 characters recommended)',
      validation: (rule) =>
        rule
          .max(60)
          .warning('Longer titles may be truncated by search engines'),
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Description for search engines and social sharing (150-160 characters recommended)',
      validation: (rule) =>
        rule
          .max(160)
          .warning('Longer descriptions may be truncated by search engines'),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for search engines (optional)',
    },
    {
      name: 'image',
      title: 'Social Sharing Image',
      type: 'image',
      description:
        'Image for social media sharing (recommended size: 1200x630)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'noindex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description:
        'If checked, this page will not be indexed by search engines',
      initialValue: false,
    },
  ],
});
