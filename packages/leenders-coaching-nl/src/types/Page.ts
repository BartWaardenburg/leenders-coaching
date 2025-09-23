import type {
  AboutPage as SanityAboutPage,
  ApproachPage as SanityApproachPage,
  BlogPage as SanityBlogPage,
  CoachingPage as SanityCoachingPage,
  ContactPage as SanityContactPage,
  HomePage as SanityHomePage,
  PrivacyPage as SanityPrivacyPage,
  VoorwaardenPage as SanityVoorwaardenPage,
  Metadata as SanityMetadata,
} from './sanity/schema';

/**
 * Base interface for all page types
 */
export interface BasePage {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
  title?: string;
  slug?: {
    current?: string;
  };
  metadata?: SanityMetadata;
  sections?: Record<string, unknown>[];
}

/**
 * Blog page type
 */
export type BlogPage = SanityBlogPage;

/**
 * Home page type
 */
export type HomePage = SanityHomePage;

/**
 * About page type
 */
export type AboutPage = SanityAboutPage;

/**
 * Approach page type
 */
export type ApproachPage = SanityApproachPage;

/**
 * Coaching page type
 */
export type CoachingPage = SanityCoachingPage;

/**
 * Contact page type
 */
export type ContactPage = SanityContactPage;

/**
 * Voorwaarden page type
 */
export type VoorwaardenPage = SanityVoorwaardenPage;

/**
 * Privacy page type
 */
export type PrivacyPage = SanityPrivacyPage;
