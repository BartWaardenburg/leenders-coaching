import { createHomePage } from '../create-home-page.js';
import { createAboutPage } from '../create-about-page.js';
import { createCoachingPage } from '../create-coaching-page.js';
import { createApproachPage } from '../create-approach-page.js';
import { createContactPage } from '../create-contact-page.js';
import { createBlogPage } from '../create-blog-page.js';

/**
 * Seeds all pages with content
 * @param options - Configuration options for seeding
 */
const seedAllPages = async ({
  dryRun = false,
  pages = ['home', 'about', 'coaching', 'approach', 'contact', 'blog'],
}: {
  dryRun?: boolean;
  pages?: string[];
}): Promise<void> => {
  // Set dry run mode if specified in command line or function call
  const isDryRun = dryRun || process.argv.includes('--dry-run');

  if (isDryRun) {
    console.log('🔍 DRY RUN MODE: No changes will be made to the database');
  }

  // Override the global isDryRun flag for all scripts
  if (isDryRun) {
    process.env.DRY_RUN = 'true';
  }

  console.log(
    `🌱 Starting to seed ${pages.length} page${pages.length !== 1 ? 's' : ''}...`,
  );
  console.log('--------------------------------');

  const startTime = Date.now();
  let completedPages = 0;
  const failedPages: string[] = [];

  // Process each page type
  for (const page of pages) {
    try {
      switch (page.toLowerCase()) {
        case 'home':
          console.log(
            `📄 (${completedPages + 1}/${pages.length}) Processing Home page...`,
          );
          await createHomePage();
          break;
        case 'about':
          console.log(
            `📄 (${completedPages + 1}/${pages.length}) Processing About page...`,
          );
          await createAboutPage();
          break;
        case 'coaching':
          console.log(
            `📄 (${completedPages + 1}/${pages.length}) Processing Coaching page...`,
          );
          await createCoachingPage();
          break;
        case 'approach':
          console.log(
            `📄 (${completedPages + 1}/${pages.length}) Processing Approach page...`,
          );
          await createApproachPage();
          break;
        case 'contact':
          console.log(
            `📄 (${completedPages + 1}/${pages.length}) Processing Contact page...`,
          );
          await createContactPage();
          break;
        case 'blog':
          console.log(
            `📄 (${completedPages + 1}/${pages.length}) Processing Blog page...`,
          );
          await createBlogPage();
          break;
        default:
          console.warn(`⚠️ Unknown page type: ${page}. Skipping.`);
          continue;
      }
      completedPages++;
      console.log(`✅ Completed ${page} page`);
      console.log('--------------------------------');
    } catch (error) {
      console.error(
        `❌ Failed to process ${page} page: ${error instanceof Error ? error.message : String(error)}`,
      );
      failedPages.push(page);
      console.log('--------------------------------');
    }
  }

  const endTime = Date.now();
  const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);

  console.log('📊 Content Seeding Summary:');
  console.log(`⏱️  Total time: ${durationSeconds} seconds`);
  console.log(
    `✅ Successfully processed: ${completedPages}/${pages.length} pages`,
  );

  if (failedPages.length > 0) {
    console.log(`❌ Failed pages: ${failedPages.join(', ')}`);
  }

  if (isDryRun) {
    console.log('🔍 DRY RUN COMPLETED: No changes were made to the database');
  } else {
    console.log('🎉 Content seeding completed!');
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Check if specific pages were requested
  const requestedPages: string[] = [];
  process.argv.forEach((arg) => {
    if (arg.startsWith('--page=')) {
      requestedPages.push(arg.split('=')[1]);
    }
  });

  // Run with pages specified in command line or all pages if none specified
  seedAllPages({
    pages: requestedPages.length > 0 ? requestedPages : undefined,
    dryRun: process.argv.includes('--dry-run'),
  });
}

// Export for use in other modules
export { seedAllPages };
