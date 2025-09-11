import { defineDocuments, defineLocations } from 'sanity/presentation';

/**
 * Presentation Tool resolver configuration
 * Maps Sanity documents to their corresponding frontend routes
 */

// Configures the "Used on x pages" banner
export const locations = {
  // Map home page documents to frontend routes
  homePage: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Home',
          href: '/',
        },
      ],
    }),
  }),

  // Map about page documents to frontend routes
  aboutPage: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'About',
          href: '/over-mij',
        },
      ],
    }),
  }),

  // Map coaching page documents to frontend routes
  coachingPage: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Coaching',
          href: '/coaching',
        },
      ],
    }),
  }),

  // Map contact page documents to frontend routes
  contactPage: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Contact',
          href: '/contact',
        },
      ],
    }),
  }),

  // Map approach page documents to frontend routes
  approachPage: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Approach',
          href: '/aanpak',
        },
      ],
    }),
  }),

  // Map blog page documents to frontend routes
  blogPage: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Blog',
          href: '/blog',
        },
      ],
    }),
  }),

  // Map blog post documents to frontend routes
  post: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Blog Post',
          href: `/blog/${doc?.slug || ''}`,
        },
        {
          title: 'Blog Index',
          href: '/blog',
        },
      ],
    }),
  }),

  // Map category documents to frontend routes
  category: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Category',
          href: `/blog/category/${doc?.slug || ''}`,
        },
        {
          title: 'Blog Index',
          href: '/blog',
        },
      ],
    }),
  }),

  // Map header documents to frontend routes (appears on all pages)
  header: defineLocations({
    select: { title: 'about.title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Header',
          href: '/',
        },
      ],
    }),
  }),

  // Map footer documents to frontend routes (appears on all pages)
  footer: defineLocations({
    select: { title: 'copyright' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Footer',
          href: '/',
        },
      ],
    }),
  }),

  // Map configuration documents to frontend routes (global settings)
  configuration: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Configuration',
          href: '/',
        },
      ],
    }),
  }),
};

// Configures documents presentation tool should open by default when navigating to a URL
export const mainDocuments = defineDocuments([
  {
    route: '/',
    filter: `_type == "homePage"`,
  },
  {
    route: '/over-mij',
    filter: `_type == "aboutPage"`,
  },
  {
    route: '/coaching',
    filter: `_type == "coachingPage"`,
  },
  {
    route: '/contact',
    filter: `_type == "contactPage"`,
  },
  {
    route: '/aanpak',
    filter: `_type == "approachPage"`,
  },
  {
    route: '/blog',
    filter: `_type == "blogPage"`,
  },
  {
    route: '/blog/:slug',
    filter: `_type == "post" && slug.current == $slug`,
  },
  {
    route: '/blog/category/:slug',
    filter: `_type == "category" && slug.current == $slug`,
  },
]);
