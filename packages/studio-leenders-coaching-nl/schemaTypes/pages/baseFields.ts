import { Rule } from 'sanity';

/* Define base page fields that all pages will share */
export const basePageFields = [
  {
    name: 'title',
    title: 'Page Title',
    type: 'string',
    group: 'content',
    validation: (rule: Rule) => rule.required(),
  },
  {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    group: 'content',
    validation: (rule: Rule) => rule.required(),
    options: {
      source: 'title',
    },
  },
  {
    name: 'sections',
    title: 'Page Sections',
    type: 'array',
    group: 'content',
    of: [
      /* Allow creating new sections */
      { type: 'sectionHeader' },
      { type: 'sectionBlog' },
      { type: 'sectionPricing' },
      { type: 'sectionFAQ' },
      { type: 'sectionTimeline' },
      { type: 'sectionCalendar' },
      { type: 'sectionFeatured' },
      { type: 'sectionForm' },
      { type: 'sectionContent' },
      { type: 'sectionCards' },
      { type: 'sectionTestimonial' },
      /* Allow referencing existing sections */
      {
        type: 'reference',
        title: 'Existing Section',
        to: [
          { type: 'sectionHeader' },
          { type: 'sectionBlog' },
          { type: 'sectionPricing' },
          { type: 'sectionFAQ' },
          { type: 'sectionTimeline' },
          { type: 'sectionCalendar' },
          { type: 'sectionFeatured' },
          { type: 'sectionForm' },
          { type: 'sectionContent' },
          { type: 'sectionCards' },
          { type: 'sectionTestimonial' },
        ],
      },
    ],
  },
  {
    name: 'metadata',
    title: 'SEO & Metadata',
    type: 'metadata',
    group: 'seo',
  },
];

/* Base groups that all pages will share */
export const baseGroups = [
  {
    name: 'content',
    title: 'Content',
    default: true,
  },
  {
    name: 'seo',
    title: 'SEO & Metadata',
  },
];
