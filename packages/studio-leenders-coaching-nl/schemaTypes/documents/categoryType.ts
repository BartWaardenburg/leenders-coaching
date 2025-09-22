import { defineField, defineType } from 'sanity';

/**
 * Category document type definition for Sanity Studio.
 * Used for organizing blog posts with color variants and SEO metadata.
 */
export const categoryType = defineType({
  name: 'category',
  title: 'Categorie',
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
      name: 'color',
      title: 'Kleur',
      type: 'colorVariant',
      group: 'content',
    }),
    defineField({
      name: 'header',
      title: 'Header sectie',
      type: 'sectionHeader',
      group: 'content',
      description:
        'Optionele header sectie voor de categorie pagina. Als niet ingesteld, wordt een standaard header gebruikt.',
    }),
    defineField({
      name: 'metadata',
      title: 'SEO & Metadata',
      type: 'metadata',
      group: 'seo',
      description:
        'Aangepaste metadata voor deze categorie. Als niet ingesteld, wordt de standaard site metadata gebruikt.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
  },
});
