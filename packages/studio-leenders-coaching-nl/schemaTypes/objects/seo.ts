import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'Global SEO Settings',
  type: 'object',
  description: 'Default SEO settings for the entire website',
  fields: [
    defineField({
      name: 'title',
      title: 'Default Title',
      type: 'string',
      description:
        'Default title template for all pages. Use {page} to insert the page title.',
      initialValue: '{page} | Leenders Coaching',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Default Description',
      type: 'text',
      description:
        "Default meta description for pages that don't specify their own",
      validation: (Rule) => Rule.required().max(155),
    }),
    defineField({
      name: 'keywords',
      title: 'Default Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: "Default keywords for pages that don't specify their own",
    }),
    defineField({
      name: 'openGraph',
      title: 'Default Social Media Settings',
      type: 'openGraph',
      description: 'Default social media sharing settings',
    }),
    defineField({
      name: 'twitter',
      title: 'Default Twitter Settings',
      type: 'twitter',
      description: 'Default Twitter card settings',
    }),
    defineField({
      name: 'robots',
      title: 'Default Search Engine Settings',
      type: 'robots',
      description: 'Default search engine behavior settings',
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Site Verification',
      type: 'string',
      description: 'Google Search Console verification code',
    }),
    defineField({
      name: 'bingSiteVerification',
      title: 'Bing Site Verification',
      type: 'string',
      description: 'Bing Webmaster Tools verification code',
    }),
  ],
});
