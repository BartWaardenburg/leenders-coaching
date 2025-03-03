/**
 * Check if dry-run flag is present
 */
export const isDryRun = process.argv.includes('--dry-run');

/**
 * Interface for page metadata
 */
export interface PageMetadata {
  title: string;
  description: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
}

/**
 * Interface for page creation options
 */
export interface PageCreationOptions {
  pageId: string;
  pageType: string;
  title: string;
  slug: string;
  metadata: PageMetadata;
}

/**
 * Handle errors in page creation, with special handling for dry-run mode
 * @param error - The error that occurred
 * @param message - A custom message to display
 */
export const handlePageCreationError = (
  error: unknown,
  message: string,
): void => {
  if (isDryRun) {
    console.log(
      '🔍 DRY RUN MODE: Error occurred, but continuing with dry run:',
    );
    console.log(error);
    console.log('✨ Dry run completed (with errors)!');
  } else {
    console.error(`${message}:`, error);
    process.exit(1);
  }
};
