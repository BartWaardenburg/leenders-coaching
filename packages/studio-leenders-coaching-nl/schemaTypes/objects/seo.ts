import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'keywords',
      title: 'Global Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Default keywords that apply to all pages',
    }),
    defineField({
      name: 'defaultMetaImage',
      title: 'Default Social Sharing Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'altText',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility and SEO',
        }),
      ],
      description:
        'Default image for social media sharing when no specific image is set (recommended size: 1200x630)',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
