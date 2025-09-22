import { defineType } from 'sanity';

/* Reusable rich text block configuration */
export const block = defineType({
  name: 'richText',
  title: 'Rijke tekst',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
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
                validation: (Rule) => Rule.required(),
              },
              {
                name: 'isExternal',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: false,
              },
            ],
          },
        ],
      },
    },
    {
      type: 'accessibleImage',
      title: 'Afbeelding',
      description: 'Voeg een afbeelding toe aan je content',
    },
  ],
});
