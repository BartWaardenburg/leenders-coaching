import { defineType, defineField } from 'sanity';

/**
 * Simplified metadata schema for SEO and social sharing.
 * Contains only essential fields: title, description, and image.
 */
export const metadata = defineType({
  name: 'metadata',
  title: 'SEO & Metadata',
  type: 'object',
  description: 'Zoekmachine optimalisatie en social sharing instellingen',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta titel',
      type: 'string',
      description: 'Paginatitel voor zoekmachines (max 60 tekens)',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Meta beschrijving',
      type: 'text',
      description: 'Korte beschrijving voor zoekresultaten (max 155 tekens)',
      validation: (Rule) => Rule.required().max(155),
    }),
    defineField({
      name: 'image',
      title: 'Social media afbeelding',
      type: 'accessibleImage',
      description: 'Optionele aangepaste afbeelding voor social media sharing',
    }),
  ],
});
