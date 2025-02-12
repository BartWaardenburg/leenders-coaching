import { defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {
      name: 'general',
      title: 'General Settings',
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'general',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'keywords',
      title: 'Global Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      description: 'Default keywords that apply to all pages',
    },
    {
      name: 'defaultMetaImage',
      title: 'Default Social Sharing Image',
      type: 'image',
      group: 'seo',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'altText',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility and SEO',
        },
      ],
      description:
        'Default image for social media sharing when no specific image is set (recommended size: 1200x630)',
      validation: (Rule) => Rule.required(),
    },
  ],
});
