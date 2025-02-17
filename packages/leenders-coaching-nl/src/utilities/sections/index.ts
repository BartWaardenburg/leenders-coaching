import type { ComponentProps } from 'react';

import { transformHeaderSection } from './header';
import { transformBlogSection } from './blog';
import { transformCalendarSection } from './calendar';
import { transformCardsSection } from './cards';
import { transformContentSection } from './content';
import { transformFAQSection } from './faq';
import { transformFeaturedSection } from './featured';
import { transformFormSection } from './form';
import { transformPricingSection } from './pricing';
import { transformTestimonialSection } from './testimonial';
import { transformTimelineSection } from './timeline';

import { SectionBlog } from '@/components/sections/SectionBlog/SectionBlog';
import { SectionCalendar } from '@/components/sections/SectionCalendar/SectionCalendar';
import { SectionCards } from '@/components/sections/SectionCards/SectionCards';
import { SectionContent } from '@/components/sections/SectionContent/SectionContent';
import { SectionFAQ } from '@/components/sections/SectionFAQ/SectionFAQ';
import { SectionFeatured } from '@/components/sections/SectionFeatured/SectionFeatured';
import { SectionForm } from '@/components/sections/SectionForm/SectionForm';
import { SectionHeader } from '@/components/sections/SectionHeader/SectionHeader';
import { SectionPricing } from '@/components/sections/SectionPricing/SectionPricing';
import { SectionTestimonial } from '@/components/sections/SectionTestimonial/SectionTestimonial';
import { SectionTimeline } from '@/components/sections/SectionTimeline/SectionTimeline';

/**
 * Registry of all section components
 */
export const sectionRegistry = {
  sectionBlog: SectionBlog,
  sectionCalendar: SectionCalendar,
  sectionCards: SectionCards,
  sectionContent: SectionContent,
  sectionFAQ: SectionFAQ,
  sectionFeatured: SectionFeatured,
  sectionForm: SectionForm,
  sectionHeader: SectionHeader,
  sectionPricing: SectionPricing,
  sectionTestimonial: SectionTestimonial,
  sectionTimeline: SectionTimeline,
} as const;

/* Types */
export type SectionType = keyof typeof sectionRegistry;
export type SectionComponent<T extends SectionType> =
  (typeof sectionRegistry)[T];
export type SectionProps<T extends SectionType> = ComponentProps<
  SectionComponent<T>
>;

/**
 * Section data transformers
 */
export const sectionTransformers: {
  [K in SectionType]: (
    data: Record<string, unknown>,
  ) => ComponentProps<SectionComponent<K>>;
} = {
  sectionHeader: transformHeaderSection,
  sectionBlog: transformBlogSection,
  sectionCalendar: transformCalendarSection,
  sectionCards: transformCardsSection,
  sectionContent: transformContentSection,
  sectionFAQ: transformFAQSection,
  sectionFeatured: transformFeaturedSection,
  sectionForm: transformFormSection,
  sectionPricing: transformPricingSection,
  sectionTestimonial: transformTestimonialSection,
  sectionTimeline: transformTimelineSection,
};

/**
 * Type guard to check if a section type exists in registry
 */
export const isSectionType = (type: string): type is SectionType =>
  type in sectionRegistry;
