# GROQ Queries

This directory contains all GROQ queries used throughout the application for fetching data from Sanity.

## Usage

Import query functions from this directory. These functions include built-in caching and draft mode support:

```typescript
import {
  getHomePage,
  getBlogPosts,
  getBlogPostBySlug,
} from '@/utilities/groq-queries';

// Fetch data with automatic caching and draft mode support
const homePage = await getHomePage();
const posts = await getBlogPosts();
const post = await getBlogPostBySlug('my-post-slug');
```

## Type System

The types for these queries are defined in `@/types/sanity/groq.ts` and utilize the Sanity schema types that are automatically generated in `@/types/sanity/schema.ts`.

To update the schema types when your Sanity schema changes:

```bash
# Run from the frontend package
pnpm run update-types
```

## Features

- **Automatic Caching**: All queries include ISR cache tags for optimal performance
- **Draft Mode Support**: Automatically switches between published and draft content
- **Type Safety**: Full TypeScript support with generated types
- **Error Handling**: Built-in error handling and fallbacks

## Available Functions

- `getPage(type)` - Get any page by type (homePage, aboutPage, etc.)
- `getHomePage()` - Get the home page
- `getBlogPosts()` - Get all blog posts
- `getBlogPostBySlug(slug)` - Get a single blog post
- `getCategories()` - Get all categories
- `getPostsByCategory(categoryId)` - Get posts by category
- `getGlobalData()` - Get navigation, footer, and site settings

## Design Principles

1. **Explicit Projections**: Always specify which fields to include rather than using `...` to avoid overfetching.
2. **Strong Typing**: All queries have corresponding TypeScript types.
3. **Reusability**: Queries are designed to be reusable across the application.
4. **Performance**: Use projections and filters to minimize data transfer.
5. **Caching**: Built-in ISR cache tags for optimal performance.
