/**
 * Script to seed all pages
 *
 * This script runs all page creation scripts in sequence.
 */

import { config } from 'dotenv';
import { isDryRun } from './utils/index.js';
import { createHomePage } from './create-home-page.js';
import { createAboutPage } from './create-about-page.js';
import { createCoachingPage } from './create-coaching-page.js';
import { createApproachPage } from './create-approach-page.js';
import { createContactPage } from './create-contact-page.js';
import { createBlogPage } from './create-blog-page.js';

// Load environment variables
config();

/**
 * Run all page creation scripts in sequence
 */
const seedAllPages = async (): Promise<void> => {
  console.log(
    `🌱 Starting to seed all pages${isDryRun ? ' (DRY RUN)' : ''}...`,
  );
  console.log('----------------------------------------');

  try {
    // Create Home Page
    console.log('\n1. Creating Home Page...');
    await createHomePage();

    // Create About Page
    console.log('\n2. Creating About Page...');
    await createAboutPage();

    // Create Coaching Page
    console.log('\n3. Creating Coaching Page...');
    await createCoachingPage();

    // Create Approach Page
    console.log('\n4. Creating Approach Page...');
    await createApproachPage();

    // Create Contact Page
    console.log('\n5. Creating Contact Page...');
    await createContactPage();

    // Create Blog Page
    console.log('\n6. Creating Blog Page...');
    await createBlogPage();

    console.log('\n✅ All pages seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding all pages:', error);
    process.exit(1);
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAllPages();
}

// Export for use in other modules
export { seedAllPages };
