/**
 * Blog utilities for shared logic between blog-related pages
 *
 * This module contains reusable utilities for:
 * - Blog post data transformation
 * - Common blog-related type definitions
 */

// Export all blog utilities from blog.ts
export * from './blog';

// Re-export blog metadata functions for convenience
export {
  generateBlogPostMetadata,
  generateBlogCategoryMetadata,
  type ResolvedBlogPost,
} from '@/utilities/metadata';
