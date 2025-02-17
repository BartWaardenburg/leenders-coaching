import {
  homePage,
  aboutPage,
  coachingPage,
  approachPage,
  blogPage,
  contactPage,
} from './pages';

import { postType } from './documents';

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
  openGraph,
  openGraphImage,
  twitter,
  twitterImage,
  robots,
  googleBot,
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
} from './objects';

import { footer, footerContact, socialLink } from './footer';

import configuration from './configuration';

import {
  header,
  headerAbout,
  headerSocial,
  headerContact,
  headerEnquiry,
  navigationItem,
} from './header';

export const schemaTypes = [
  // Pages
  homePage,
  aboutPage,
  coachingPage,
  approachPage,
  blogPage,
  contactPage,

  // Documents
  postType,

  // Sections
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

  // Objects
  callToAction,
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
  openGraph,
  openGraphImage,
  twitter,
  twitterImage,
  robots,
  googleBot,
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

  // Footer
  footer,
  footerContact,
  socialLink,

  // Configuration
  configuration,

  // Header
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
