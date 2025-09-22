import { defineType, defineField } from 'sanity';

export const configuration = defineType({
  name: 'configuration',
  title: 'Configuratie',
  type: 'document',
  groups: [
    { name: 'general', title: 'Algemene Instellingen' },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'accessibility', title: 'Toegankelijkheid' },
    { name: 'interface', title: 'Interface' },
    { name: 'blog', title: 'Blog' },
    { name: 'forms', title: 'Formulieren' },
  ],
  fields: [
    /* General Settings */
    defineField({
      name: 'title',
      title: 'Site titel',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site beschrijving',
      type: 'text',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),

    /* SEO & Metadata Settings */
    defineField({
      name: 'seo',
      title: 'SEO instellingen',
      type: 'seo',
      group: 'seo',
    }),

    /* Accessibility Settings */
    defineField({
      name: 'accessibility',
      title: 'Toegankelijkheid',
      type: 'accessibility',
      group: 'accessibility',
    }),

    /* Interface Settings */
    defineField({
      name: 'interface',
      title: 'Interface',
      type: 'uiInterface',
      group: 'interface',
    }),

    /* Blog Settings */
    defineField({
      name: 'blog',
      title: 'Blog',
      type: 'blog',
      group: 'blog',
    }),

    /* Form Settings */
    defineField({
      name: 'forms',
      title: 'Formulieren',
      type: 'forms',
      group: 'forms',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
