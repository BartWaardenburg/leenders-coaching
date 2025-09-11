/**
 * TypeScript definitions for GROQ query results
 *
 * This file contains type definitions for our GROQ queries based on the
 * automatically generated Sanity schema types from `schema.ts`.
 *
 * The schema types are generated using Sanity TypeGen with:
 * `pnpm run update-types`
 */

import type { BasePage } from '@/types/Page';

// Import types from the locally generated schema types
import type { Post, HomePage, AboutPage } from './schema';

// Types for specific GROQ queries
export type PAGE_QUERYResult<T extends BasePage = BasePage> = T | null;

export type HOME_PAGE_QUERYResult = HomePage | null;

export type ABOUT_PAGE_QUERYResult = AboutPage | null;

export type GLOBAL_DATA_QUERYResult = {
  navigation: {
    navigation?: Array<{
      _key: string;
      label?: string;
      href?: string;
    }> | null;
    about?: {
      title?: string;
      description?: string;
    } | null;
    social?: {
      title?: string;
      links?: Array<{
        _key: string;
        platform?: 'linkedin' | 'instagram' | 'facebook' | 'twitter';
        url?: string;
      }> | null;
    } | null;
    contact?: {
      title?: string;
      projectEnquiry?: {
        label?: string;
        href?: string;
        linkText?: string;
      } | null;
      generalEnquiry?: {
        label?: string;
        href?: string;
        linkText?: string;
      } | null;
    } | null;
  } | null;
  footer: {
    copyright?: string;
    contact?: {
      email?: string;
      phone?: string | null;
    } | null;
    socialLinks?: Array<{
      _key: string;
      platform?: 'instagram' | 'linkedin';
      url?: string;
    }> | null;
  } | null;
  siteSettings: {
    accessibility?: {
      closeButtons?: {
        toast?: string;
        modal?: string;
      } | null;
      calendar?: {
        previousMonth?: string;
        nextMonth?: string;
      } | null;
    } | null;
    interface?: {
      mobileMenu?: {
        toggleButton?: string;
        menuLabel?: string;
        closeButton?: string;
      } | null;
      themeToggle?: {
        label?: string;
      } | null;
      buttons?: {
        loadMore?: string;
        readMore?: string;
        submit?: string;
        close?: string;
      } | null;
    } | null;
    blog?: {
      labels?: {
        featured?: string;
        readArticle?: string;
      } | null;
      paths?: {
        blog?: string;
      } | null;
    } | null;
    forms?: {
      messages?: {
        required?: string;
        invalid?: string;
        success?: string;
        error?: string;
      } | null;
    } | null;
  } | null;
};

export type BLOG_POSTS_QUERYResult = Array<Post>;

export type BLOG_POST_BY_SLUG_QUERYResult = Post | null;

export type CATEGORIES_QUERYResult = Array<{
  _id: string;
  title?: string;
  description?: string;
}>;

export type POSTS_BY_CATEGORY_QUERYResult = Array<Post>;

// Re-export types from schema for convenience
export type { Post, HomePage, AboutPage } from './schema';
