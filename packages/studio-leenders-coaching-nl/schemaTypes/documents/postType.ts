import { defineField, defineType } from 'sanity';

/**
 * Blog post document type definition for Sanity Studio.
 * Includes fields for title, description, content, categories, and SEO metadata.
 */
export const postType = defineType({
  name: 'post',
  title: 'Blogpost',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Inhoud',
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-pad',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Gepubliceerd op',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categorieën',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hoofdafbeelding',
      type: 'accessibleImage',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Uitgelichte post',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'variant',
      title: 'Kleurvariant',
      type: 'colorVariant',
    }),
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normaal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Citaat', value: 'blockquote' },
          ],
          lists: [
            { title: 'Opsommingstekens', value: 'bullet' },
            { title: 'Genummerd', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Vetgedrukt', value: 'strong' },
              { title: 'Cursief', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'accessibleImage',
        },
      ],
    }),
    defineField({
      name: 'metadata',
      title: 'SEO & Metadata',
      type: 'metadata',
      group: 'seo',
      description:
        'Aangepaste metadata voor deze post. Als niet ingesteld, wordt de standaard site metadata gebruikt.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      description: 'description',
    },
  },
});
