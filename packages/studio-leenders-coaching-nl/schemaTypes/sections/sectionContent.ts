import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Content Section */
export const sectionContent = defineType({
  name: 'sectionContent',
  title: 'Content Section',
  type: 'document',
  description: 'A section for rich text content with optional title',
  fields: [
    ...baseSectionFields,
    {
      name: 'content',
      title: 'Content',
      type: 'richText',
      description:
        'The main content of the section. You can use text formatting, headings, and add images.',
      validation: (Rule) => Rule.required(),
    },
  ],
});
