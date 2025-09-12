import { defineField, defineType } from 'sanity';

/**
 * Category document type definition for Sanity Studio.
 * Used for organizing blog posts with color variants and SEO metadata.
 */
export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'colorVariant',
      group: 'content',
    }),
    defineField({
      name: 'metadata',
      title: 'SEO & Metadata',
      type: 'metadata',
      group: 'seo',
      description:
        'Custom metadata for this category. If not set, default site metadata will be used.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
  },
});
