/**
 * Re-export utilities from specialized modules
 */

// Sanity client and document operations
export {
  client,
  createOrUpdateDocument,
  deleteDocument,
} from './sanity-client.js';
export type { SanityDocument } from './sanity-client.js';

// Section operations
export {
  addSectionsToPage,
  replaceSectionsOnPage,
  clearSectionsFromPage,
} from './section-operations.js';
export type { SectionBase } from './section-operations.js';

// Page utilities
export { isDryRun, handlePageCreationError } from './page-utils.js';
export type { PageCreationOptions, PageMetadata } from './page-utils.js';

// Image utilities
export {
  uploadImageFromFile,
  uploadImageFromUrl,
  assetExists,
  deleteAsset,
} from './assets.js';
export type { ImageReference } from './assets.js';

// Page creator utilities
export { createOrUpdatePage, updatePageSections } from './page-creator.js';
