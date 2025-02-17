import { defineType, defineField } from 'sanity';

const configuration = defineType({
  name: 'configuration',
  title: 'Configuration',
  type: 'document',
  groups: [
    { name: 'general', title: 'General Settings' },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'accessibility', title: 'Accessibility' },
    { name: 'interface', title: 'Interface' },
    { name: 'blog', title: 'Blog' },
    { name: 'forms', title: 'Forms' },
  ],
  fields: [
    /* General Settings */
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),

    /* SEO & Metadata Settings */
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),

    /* Accessibility Settings */
    defineField({
      name: 'accessibility',
      title: 'Accessibility',
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
      title: 'Forms',
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

export default configuration;
