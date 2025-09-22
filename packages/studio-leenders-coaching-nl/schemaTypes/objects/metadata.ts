import { defineType, defineField } from 'sanity';

/**
 * Open Graph image schema for social media sharing.
 * Defines image settings with dimensions and accessibility.
 */
export const openGraphImage = defineType({
  name: 'openGraphImage',
  title: 'Open Graph afbeelding',
  type: 'object',
  description: 'Afbeelding instellingen voor social media sharing',
  fields: [
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'accessibleImage',
      description: 'Optionele aangepaste afbeelding voor social media',
    }),
    defineField({
      name: 'width',
      title: 'Breedte',
      type: 'number',
      description: 'Breedte van de afbeelding in pixels',
      initialValue: 1200,
      validation: (Rule) => Rule.required().min(200).max(5000),
    }),
    defineField({
      name: 'height',
      title: 'Hoogte',
      type: 'number',
      description: 'Hoogte van de afbeelding in pixels',
      initialValue: 630,
      validation: (Rule) => Rule.required().min(200).max(5000),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
      width: 'width',
      height: 'height',
    },
    prepare({ title, media, width, height }) {
      return {
        title: title || 'Open Graph afbeelding',
        media,
        subtitle: width && height ? `${width}×${height}px` : 'Geen afmetingen',
      };
    },
  },
});

/**
 * Open Graph metadata schema for social media sharing.
 * Configures how content appears when shared on social platforms.
 */
export const openGraph = defineType({
  name: 'openGraph',
  title: 'Open Graph',
  type: 'object',
  description: 'Instellingen voor social media sharing',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Titel voor social media sharing (max 60 tekens)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      description: 'Beschrijving voor social media sharing (max 155 tekens)',
      validation: (Rule) => Rule.max(155),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Het type inhoud',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Artikel', value: 'article' },
        ],
      },
      initialValue: 'website',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'De canonieke URL van de pagina',
    }),
    defineField({
      name: 'siteName',
      title: 'Site naam',
      type: 'string',
      description: 'De naam van de website',
      initialValue: 'Leenders Coaching',
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'openGraphImage',
      description: 'Optionele aangepaste afbeelding voor social media',
    }),
  ],
});

/**
 * Twitter-specific image schema for Twitter cards.
 * Handles image display in Twitter sharing previews.
 */
export const twitterImage = defineType({
  name: 'twitterImage',
  title: 'Twitter afbeelding',
  type: 'object',
  description: 'Afbeelding instellingen voor Twitter cards',
  fields: [
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'accessibleImage',
      description: 'Optionele aangepaste Twitter afbeelding',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Twitter afbeelding',
        media,
        subtitle: 'Twitter Card',
      };
    },
  },
});

/**
 * Twitter card configuration schema.
 * Defines how content appears when shared on Twitter.
 */
export const twitter = defineType({
  name: 'twitter',
  title: 'Twitter Card',
  type: 'object',
  description: 'Instellingen voor Twitter sharing',
  fields: [
    defineField({
      name: 'card',
      title: 'Card type',
      type: 'string',
      options: {
        list: [
          { title: 'Samenvatting', value: 'summary' },
          {
            title: 'Samenvatting met grote afbeelding',
            value: 'summary_large_image',
          },
        ],
      },
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'site',
      title: 'Site account',
      type: 'string',
      description: '@gebruikersnaam van website (zonder @)',
      validation: (Rule) =>
        Rule.custom((username) => {
          if (!username) return true;
          if (username.startsWith('@')) return 'Verwijder het @ symbool';
          return true;
        }),
    }),
    defineField({
      name: 'creator',
      title: 'Maker account',
      type: 'string',
      description: '@gebruikersnaam van content maker (zonder @)',
      validation: (Rule) =>
        Rule.custom((username) => {
          if (!username) return true;
          if (username.startsWith('@')) return 'Verwijder het @ symbool';
          return true;
        }),
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
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
  title: 'Google Bot instellingen',
  type: 'object',
  fields: [
    defineField({
      name: 'index',
      title: 'Google indexering toestaan',
      type: 'boolean',
      description: 'Sta Google toe om deze pagina te indexeren',
      initialValue: true,
    }),
    defineField({
      name: 'follow',
      title: 'Google links volgen toestaan',
      type: 'boolean',
      description: 'Sta Google toe om links op deze pagina te volgen',
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
  title: 'Zoekmachine instellingen',
  type: 'object',
  description: 'Beheer hoe zoekmachines met deze pagina omgaan',
  fields: [
    defineField({
      name: 'index',
      title: 'Indexering toestaan',
      type: 'boolean',
      description: 'Sta zoekmachines toe om deze pagina te indexeren',
      initialValue: true,
    }),
    defineField({
      name: 'follow',
      title: 'Links volgen toestaan',
      type: 'boolean',
      description: 'Sta zoekmachines toe om links op deze pagina te volgen',
      initialValue: true,
    }),
    defineField({
      name: 'googleBot',
      title: 'Google-specifieke instellingen',
      type: 'object',
      description: "Speciale instellingen voor Google's crawler",
      fields: [
        defineField({
          name: 'index',
          title: 'Google indexering toestaan',
          type: 'boolean',
          description: 'Sta Google toe om deze pagina te indexeren',
          initialValue: true,
        }),
        defineField({
          name: 'follow',
          title: 'Google links volgen toestaan',
          type: 'boolean',
          description: 'Sta Google toe om links op deze pagina te volgen',
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
      name: 'keywords',
      title: 'Sleutelwoorden',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Sleutelwoorden om zoekmachines te helpen de inhoud te begrijpen (optioneel)',
    }),
    defineField({
      name: 'openGraph',
      title: 'Social media sharing',
      type: 'openGraph',
      description: 'Instellingen voor social media sharing previews',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter instellingen',
      type: 'twitter',
      description: 'Specifieke instellingen voor Twitter sharing',
    }),
    defineField({
      name: 'robots',
      title: 'Zoekmachine instellingen',
      type: 'robots',
      description: 'Beheer hoe zoekmachines met deze pagina omgaan',
    }),
  ],
});
