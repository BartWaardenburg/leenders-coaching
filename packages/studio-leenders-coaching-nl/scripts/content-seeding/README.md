# Content Seeding Scripts

This directory contains scripts for seeding content in the Sanity CMS for Leenders Coaching. These scripts allow you to quickly populate your CMS with structured content for all page types.

## Directory Structure

```
scripts/content-seeding/
├── README.md
├── create-home-page.ts       # Home page seeding script
├── create-about-page.ts      # About page seeding script
├── create-coaching-page.ts   # Coaching page seeding script
├── create-approach-page.ts   # Approach page seeding script
├── create-contact-page.ts    # Contact page seeding script
├── create-blog-page.ts       # Blog page seeding script
├── create-blog-post.ts       # Blog post creation script
├── utils/                    # Utility functions and tools
│   ├── page-creator.ts       # Page creation utilities
│   ├── section-creator.ts    # Section creation utilities
│   ├── seed-all-pages.ts     # Master seeding script
│   ├── assets.ts             # Asset handling utilities
│   ├── section-types.ts      # Type definitions
│   └── index.ts              # Core utilities
└── archive/                  # Archived/older scripts
    └── add-home-sections.ts  # Legacy home sections script
```

## Available Scripts

### Page Creation Scripts

Each script creates or updates a specific page type with appropriate sections:

- **Home Page**: `create-home-page.ts`
- **About Page**: `create-about-page.ts`
- **Coaching Page**: `create-coaching-page.ts`
- **Approach Page**: `create-approach-page.ts`
- **Contact Page**: `create-contact-page.ts`
- **Blog Page**: `create-blog-page.ts`
- **Blog Post**: `create-blog-post.ts` (for creating individual blog posts)

### Master Seeding Script

- **Seed All Pages**: `utils/seed-all-pages.ts` - Seeds all page types at once

### Utility Scripts

- `utils/page-creator.ts` - Functions for creating and updating pages
- `utils/section-creator.ts` - Functions for creating different section types
- `utils/assets.ts` - Utilities for managing assets and images
- `utils/section-types.ts` - TypeScript type definitions for sections
- `utils/index.ts` - Core utilities and helper functions

## Usage

All scripts support a "dry run" mode that shows what would be created without making actual changes to the database.

### Running Scripts via npm

#### Individual Page Scripts

```bash
# Normal mode
npm run seed:create-home-page
npm run seed:create-about-page
npm run seed:create-coaching-page
npm run seed:create-approach-page
npm run seed:create-contact-page
npm run seed:create-blog-page

# Dry run mode (preview without making changes)
npm run seed:create-home-page:dry-run
npm run seed:create-about-page:dry-run
npm run seed:create-coaching-page:dry-run
npm run seed:create-approach-page:dry-run
npm run seed:create-contact-page:dry-run
npm run seed:create-blog-page:dry-run
```

#### Master Seeding Script

```bash
# Seed all pages
npm run seed:all

# Seed all pages in dry run mode
npm run seed:all:dry-run

# Seed specific pages
npm run seed:all -- --page=home --page=about

# Seed specific pages in dry run mode
npm run seed:all:dry-run -- --page=home --page=about
```

### Running Scripts Directly

You can also run the scripts directly using Node.js:

```bash
# Normal mode
node --loader ts-node/esm scripts/content-seeding/create-home-page.ts

# Dry run mode
node --loader ts-node/esm scripts/content-seeding/create-home-page.ts --dry-run

# Seed all pages
node --loader ts-node/esm scripts/content-seeding/utils/seed-all-pages.ts

# Seed specific pages
node --loader ts-node/esm scripts/content-seeding/utils/seed-all-pages.ts --page=home --page=blog
```

## Section Types

The scripts use various section types to structure content:

- **Header Section**: Page headers with title, description, and optional CTA
- **Content Section**: Rich text content with formatting
- **Testimonial Section**: Client testimonials
- **Cards Section**: Grid of cards with text and links
- **Featured Section**: Feature highlights with descriptions
- **Form Section**: Contact or inquiry forms
- **FAQ Section**: Frequently asked questions with answers
- **Timeline Section**: Chronological events or process steps
- **Blog Section**: Latest blog posts with filtering options

## Customization

You can customize each script to modify the content according to your needs:

1. Edit the script file directly
2. Modify the section parameters (titles, descriptions, etc.)
3. Add or remove sections as needed

## Best Practices

- Always test changes with the dry run mode first
- Back up your production data before running seeding scripts
- Use descriptive titles and high-quality content
- Keep SEO metadata up to date
- Customize the scripts to match your brand voice
