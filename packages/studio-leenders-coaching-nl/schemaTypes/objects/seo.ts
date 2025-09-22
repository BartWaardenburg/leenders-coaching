import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'Globale SEO instellingen',
  type: 'object',
  description: 'Standaard SEO instellingen voor de hele website',
  fields: [
    defineField({
      name: 'title',
      title: 'Standaard titel',
      type: 'string',
      description:
        "Standaard titel template voor alle pagina's. Gebruik {page} om de pagina titel in te voegen.",
      initialValue: '{page} | Leenders Coaching',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Standaard beschrijving',
      type: 'text',
      description:
        "Standaard meta beschrijving voor pagina's die hun eigen niet specificeren",
      validation: (Rule) => Rule.required().max(155),
    }),
    defineField({
      name: 'keywords',
      title: 'Standaard sleutelwoorden',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        "Standaard sleutelwoorden voor pagina's die hun eigen niet specificeren",
    }),
    defineField({
      name: 'openGraph',
      title: 'Standaard social media instellingen',
      type: 'openGraph',
      description: 'Standaard social media sharing instellingen',
    }),
    defineField({
      name: 'twitter',
      title: 'Standaard Twitter instellingen',
      type: 'twitter',
      description: 'Standaard Twitter card instellingen',
    }),
    defineField({
      name: 'robots',
      title: 'Standaard zoekmachine instellingen',
      type: 'robots',
      description: 'Standaard zoekmachine gedrag instellingen',
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google site verificatie',
      type: 'string',
      description: 'Google Search Console verificatie code',
    }),
    defineField({
      name: 'bingSiteVerification',
      title: 'Bing site verificatie',
      type: 'string',
      description: 'Bing Webmaster Tools verificatie code',
    }),
  ],
});
