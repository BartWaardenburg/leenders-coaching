import {
  homePage,
  aboutPage,
  coachingPage,
  approachPage,
  blogPage,
  contactPage,
  voorwaardenPage,
  privacyPage,
} from './pages';

import { postType, categoryType } from './documents';

import {
  sectionHeader,
  sectionBlog,
  sectionPricing,
  sectionFAQ,
  sectionTimeline,
  sectionCalendar,
  sectionFeatured,
  sectionForm,
  sectionContent,
  sectionCards,
  sectionTestimonial,
} from './sections';

import {
  callToAction,
  block,
  link,
  card,
  featureItem,
  pricingCard,
  faqItem,
  timelineEvent,
  formField,
  formFieldOption,
  formConfiguration,
  timeSlot,
  calendarSettings,
  testimonial,
  metadata,
  seo,
  accessibility,
  closeButtons,
  calendarNavigation,
  uiInterface,
  mobileMenu,
  themeToggle,
  buttonLabels,
  blog,
  blogLabels,
  blogPaths,
  forms,
  formMessages,
  colorVariant,
  accessibleImage,
  socialImage,
} from './objects';

import { footer, footerContact, socialLink } from './footer';

import { configuration } from './configuration';

import {
  header,
  headerAbout,
  headerSocial,
  headerContact,
  headerEnquiry,
  navigationItem,
} from './header';

/**
 * Complete collection of all schema types for the Sanity Studio.
 * Includes pages, documents, sections, objects, and configuration schemas.
 */
export const schemaTypes = [
  /* Pages. */
  homePage,
  aboutPage,
  coachingPage,
  approachPage,
  blogPage,
  contactPage,
  voorwaardenPage,
  privacyPage,

  /* Documents. */
  postType,
  categoryType,

  /* Sections. */
  sectionHeader,
  sectionBlog,
  sectionPricing,
  sectionFAQ,
  sectionTimeline,
  sectionCalendar,
  sectionFeatured,
  sectionForm,
  sectionContent,
  sectionCards,
  sectionTestimonial,

  /* Objects. */
  callToAction,
  block,
  link,
  card,
  featureItem,
  pricingCard,
  faqItem,
  timelineEvent,
  formField,
  formFieldOption,
  formConfiguration,
  timeSlot,
  calendarSettings,
  testimonial,
  metadata,
  seo,
  accessibility,
  closeButtons,
  calendarNavigation,
  uiInterface,
  mobileMenu,
  themeToggle,
  buttonLabels,
  blog,
  blogLabels,
  blogPaths,
  forms,
  formMessages,
  colorVariant,
  accessibleImage,
  socialImage,

  /* Footer. */
  footer,
  footerContact,
  socialLink,

  /* Configuration. */
  configuration,

  /* Header. */
  header,
  headerAbout,
  headerSocial,
  headerContact,
  headerEnquiry,
  navigationItem,
];

export * from './sections';
export * from './pages';
export * from './footer';
export * from './objects';
export * from './documents';
