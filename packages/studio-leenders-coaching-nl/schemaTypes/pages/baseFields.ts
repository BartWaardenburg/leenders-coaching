import { Rule } from 'sanity';

/**
 * Reusable array of all available section types
 * Used for both creating new sections and referencing existing ones
 */
export const sectionTypes = [
  'sectionHeader',
  'sectionBlog',
  'sectionPricing',
  'sectionFAQ',
  'sectionTimeline',
  'sectionCalendar',
  'sectionFeatured',
  'sectionForm',
  'sectionContent',
  'sectionCards',
  'sectionTestimonial',
] as const;

/* Define base page fields that all pages will share */
export const basePageFields = [
  {
    name: 'title',
    title: 'Pagina titel',
    type: 'string',
    group: 'content',
    validation: (rule: Rule) => rule.required(),
  },
  {
    name: 'slug',
    title: 'URL-pad',
    type: 'slug',
    group: 'content',
    validation: (rule: Rule) => rule.required(),
    options: {
      source: 'title',
    },
  },
  {
    name: 'sections',
    title: 'Pagina secties',
    type: 'array',
    group: 'content',
    of: [
      {
        type: 'reference',
        title: 'Sectie',
        options: {
          /**
           * Filter out sections that are already referenced in the document's sections array.
           * This prevents selecting the same section multiple times.
           */
          filter: ({ document }) => {
            const usedSectionRefs: string[] = Array.isArray(document?.sections)
              ? document.sections
                  .map((section: { _ref?: string }) => section?._ref)
                  .filter((ref): ref is string => typeof ref === 'string')
              : [];

            if (usedSectionRefs.length === 0) {
              return {};
            }

            return {
              filter: `!(_id in $excludedRefs)`,
              params: { excludedRefs: usedSectionRefs },
            };
          },
        },
        to: sectionTypes.map((sectionType) => ({
          type: sectionType,
        })),
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
    title: 'Inhoud',
    default: true,
  },
  {
    name: 'seo',
    title: 'SEO & Metadata',
  },
];
