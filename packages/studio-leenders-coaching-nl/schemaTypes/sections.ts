import { defineType, Rule } from 'sanity';

/* Base section fields that all sections will share */
const baseSectionFields = [
  {
    name: 'title',
    title: 'Internal Title',
    type: 'string',
    description: 'Title for internal reference only',
    validation: (rule: Rule) => rule.required(),
  },
  {
    name: 'displayTitle',
    title: 'Display Title',
    type: 'string',
    description: 'Title that will be displayed on the website (optional)',
  },
  {
    name: 'subtitle',
    title: 'Subtitle',
    type: 'string',
  },
  {
    name: 'background',
    title: 'Background Color',
    type: 'string',
    options: {
      list: [
        { title: 'Blue', value: 'blue' },
        { title: 'Purple', value: 'purple' },
        { title: 'Green', value: 'green' },
        { title: 'Pink', value: 'pink' },
        { title: 'Yellow', value: 'yellow' },
        { title: 'Teal', value: 'teal' },
      ],
    },
  },
  {
    name: 'maxWidth',
    title: 'Content Max Width',
    type: 'string',
    options: {
      list: [
        { title: 'Small', value: 'sm' },
        { title: 'Medium', value: 'md' },
        { title: 'Large', value: 'lg' },
        { title: 'Extra Large', value: 'xl' },
        { title: '2XL', value: '2xl' },
        { title: '3XL', value: '3xl' },
        { title: '4XL', value: '4xl' },
        { title: '5XL', value: '5xl' },
        { title: '6XL', value: '6xl' },
        { title: '7XL', value: '7xl' },
      ],
    },
    initialValue: '3xl',
  },
  {
    name: 'showBorder',
    title: 'Show Border Under Title',
    type: 'boolean',
    initialValue: false,
  },
];

/* Header Section */
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Header Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'callToAction',
    },
  ],
});

/* Blog Section */
export const sectionBlog = defineType({
  name: 'sectionBlog',
  title: 'Blog Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'postsToShow',
      title: 'Number of Posts to Show',
      type: 'number',
      initialValue: 3,
    },
    {
      name: 'showFeaturedOnly',
      title: 'Show Featured Posts Only',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'string',
      options: {
        list: [
          { title: 'Newest First', value: 'newest' },
          { title: 'Oldest First', value: 'oldest' },
        ],
      },
      initialValue: 'newest',
    },
  ],
});

/* Pricing Section */
export const sectionPricing = defineType({
  name: 'sectionPricing',
  title: 'Pricing Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'pricingCards',
      title: 'Pricing Cards',
      type: 'array',
      of: [{ type: 'pricingCard' }],
    },
  ],
});

/* FAQ Section */
export const sectionFAQ = defineType({
  name: 'sectionFAQ',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [{ type: 'faqItem' }],
    },
  ],
});

/* Timeline Section */
export const sectionTimeline = defineType({
  name: 'sectionTimeline',
  title: 'Timeline Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'events',
      title: 'Timeline Events',
      type: 'array',
      of: [{ type: 'timelineEvent' }],
      validation: (rule: Rule) => rule.unique(),
    },
  ],
});

/* Calendar Section */
export const sectionCalendar = defineType({
  name: 'sectionCalendar',
  title: 'Calendar Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'settings',
      title: 'Calendar Settings',
      type: 'calendarSettings',
    },
  ],
});

/* Featured Section */
export const sectionFeatured = defineType({
  name: 'sectionFeatured',
  title: 'Featured Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'items',
      title: 'Featured Items',
      type: 'array',
      of: [{ type: 'featureItem' }],
    },
  ],
});

/* Form Section */
export const sectionForm = defineType({
  name: 'sectionForm',
  title: 'Contact Form Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'form',
      title: 'Form Configuration',
      type: 'formConfiguration',
    },
  ],
});

/* Content Section */
export const sectionContent = defineType({
  name: 'sectionContent',
  title: 'Content Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'content',
      title: 'Content',
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
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
});

/* Cards Section */
export const sectionCards = defineType({
  name: 'sectionCards',
  title: 'Cards Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'card' }],
    },
  ],
});

/* Testimonial Section */
export const sectionTestimonial = defineType({
  name: 'sectionTestimonial',
  title: 'Testimonial Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'testimonial' }],
    },
  ],
});
