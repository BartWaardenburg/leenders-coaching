import { defineType, defineField } from 'sanity';

/**
 * Herbruikbaar image object met alt-tekst voor toegankelijkheid.
 *
 * Gebaseerd op Sanity best practices:
 * - Composition pattern in plaats van inheritance
 * - Consistente field definities
 * - Proper alt-tekst validatie
 * - Nederlands/Engels consistentie
 *
 * Gebruik dit type voor alle afbeeldingen die alt-tekst nodig hebben.
 */
export const accessibleImage = defineType({
  name: 'accessibleImage',
  title: 'Toegankelijke Afbeelding',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
        metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt-tekst',
      type: 'string',
      description:
        'Beschrijving van de afbeelding voor mensen met visuele beperkingen',
      validation: (Rule) =>
        Rule.warning(
          'Alt-tekst verbetert de toegankelijkheid. Voeg een beschrijving toe van wat er op de afbeelding te zien is.'
        ).max(150),
    }),
    defineField({
      name: 'caption',
      title: 'Bijschrift',
      type: 'string',
      description:
        'Optioneel bijschrift dat onder de afbeelding wordt weergegeven',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
      subtitle: 'caption',
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title || 'Afbeelding zonder alt-tekst',
        media,
        subtitle: subtitle || 'Geen bijschrift',
      };
    },
  },
});

/**
 * Image object voor social media met specifieke metadata.
 * Gebaseerd op accessibleImage met social media specifieke velden.
 */
export const socialImage = defineType({
  name: 'socialImage',
  title: 'Social Media Afbeelding',
  type: 'object',
  description: 'Afbeelding geoptimaliseerd voor social media sharing',
  fields: [
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
        metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt-tekst',
      type: 'string',
      description: 'Beschrijving van de afbeelding voor toegankelijkheid',
      validation: (Rule) =>
        Rule.warning(
          'Alt-tekst is essentieel voor social media toegankelijkheid'
        )
          .required()
          .max(125),
    }),
    defineField({
      name: 'caption',
      title: 'Bijschrift',
      type: 'string',
      description: 'Tekst die samen met de afbeelding wordt gedeeld',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Twitter/X', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'OpenGraph', value: 'opengraph' },
        ],
      },
      description: 'Platform waar deze afbeelding voor geoptimaliseerd is',
      initialValue: 'opengraph',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
      platform: 'platform',
      caption: 'caption',
    },
    prepare({ title, media, platform, caption }) {
      return {
        title: title || 'Social media afbeelding',
        media,
        subtitle: platform
          ? `${platform}${caption ? ` - ${caption}` : ''}`
          : 'Geen platform',
      };
    },
  },
});

/**
 * Herbruikbare alt-tekst field definitie.
 * Gebruik dit voor consistent alt-tekst velden in custom image types.
 */
export const altTextField = defineField({
  name: 'alt',
  title: 'Alt-tekst',
  type: 'string',
  description: 'Beschrijving van de afbeelding voor toegankelijkheid',
  validation: (Rule) =>
    Rule.warning(
      'Alt-tekst verbetert de toegankelijkheid voor mensen met visuele beperkingen'
    ).max(150),
});

/**
 * Herbruikbare caption field definitie.
 * Gebruik dit voor consistent caption velden in image types.
 */
export const captionField = defineField({
  name: 'caption',
  title: 'Bijschrift',
  type: 'string',
  description: 'Optioneel bijschrift dat onder de afbeelding wordt weergegeven',
});
