import { postType } from './postType';
import { navigation } from './navigation';
import { footer } from './footer';
import { menuFooter } from './menuFooter';
import { siteSettings } from './siteSettings';
import { navigationItem } from './navigationItem';
import { footerContact } from './footerContact';
import { socialLink } from './socialLink';
import { menuFooterAbout } from './menuFooterAbout';
import { menuFooterContact } from './menuFooterContact';
import { menuFooterEnquiry } from './menuFooterEnquiry';
import { metadata } from './metadata';
import {
  homePage,
  aboutPage,
  coachingPage,
  approachPage,
  blogPage,
  contactPage,
} from './pages';
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
  featureItem,
  pricingCard,
  faqItem,
  timelineEvent,
  formField,
  card,
  testimonial,
  timeSlot,
  calendarSettings,
  formConfiguration,
} from './objects';
import { menuFooterSocial } from './menuFooterSocial';

export const schemaTypes = [
  // Pages
  homePage,
  aboutPage,
  coachingPage,
  approachPage,
  blogPage,
  contactPage,

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
  featureItem,
  pricingCard,
  faqItem,
  timelineEvent,
  formField,
  card,
  testimonial,
  timeSlot,
  calendarSettings,
  formConfiguration,

  // Content Types
  postType,

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
