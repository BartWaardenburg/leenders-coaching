import { SectionBase, replaceSectionsOnPage } from './section-operations.js';
import { createOrUpdateDocument } from './sanity-client.js';
import { isDryRun, PageCreationOptions } from './page-utils.js';

/**
 * Create or update a page document with the given options
 * @param options - Options for creating/updating the page
 */
export const createOrUpdatePage = async (
  options: PageCreationOptions,
): Promise<void> => {
  const { pageId, pageType, title, slug, metadata } = options;

  // Skip actual API calls in dry run mode
  if (isDryRun) {
    console.log(
      `🔍 DRY RUN MODE: Would create/update ${pageType} document with the following properties:`,
    );
    console.log(`  ID: ${pageId}`);
    console.log(`  Type: ${pageType}`);
    console.log(`  Title: ${title}`);
    console.log(`  Slug: ${slug}`);
    console.log(`  Metadata: Title and description for SEO`);
    return;
  }

  await createOrUpdateDocument({
    _id: pageId,
    _type: pageType,
    title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    metadata: {
      _type: 'metadata',
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        _type: 'openGraph',
        title: metadata.openGraphTitle || metadata.title,
        description: metadata.openGraphDescription || metadata.description,
      },
    },
  });
};

/**
 * Replace sections on a page with the given sections
 * @param pageId - The ID of the page to update
 * @param sections - The sections to set on the page
 */
export const updatePageSections = async (
  pageId: string,
  sections: SectionBase[],
): Promise<void> => {
  if (isDryRun) {
    console.log(
      `🔍 DRY RUN MODE: Would replace sections on ${pageId} with the following sections:`,
    );
    sections.forEach((section, index) => {
      console.log(`${index + 1}. ${section.title}`);
    });
    console.log('✨ Dry run completed successfully!');
    return;
  }

  await replaceSectionsOnPage(pageId, sections);
  console.log(`✨ Successfully updated sections on ${pageId}!`);
};
