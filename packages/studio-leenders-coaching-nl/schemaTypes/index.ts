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
  formConfiguration,
  timeSlot,
  calendarSettings,
  testimonial,
} from './objects';

import { navigation, navigationItem } from './navigation';

import {
  footer,
  footerContact,
  socialLink,
  menuFooter,
  menuFooterAbout,
  menuFooterContact,
  menuFooterEnquiry,
  menuFooterSocial,
} from './footer';

import { siteSettings, metadata } from './settings';

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
  formConfiguration,
  timeSlot,
  calendarSettings,
  testimonial,

  // Navigation & Menus
  navigation,
  navigationItem,
  footer,
  footerContact,
  socialLink,
  menuFooter,
  menuFooterAbout,
  menuFooterContact,
  menuFooterEnquiry,
  menuFooterSocial,

  // Settings & Metadata
  siteSettings,
  metadata,
];

export * from './sections';
export * from './pages';
export * from './navigation';
export * from './footer';
export * from './settings';
export * from './objects';
export * from './documents';
