import { client } from './sanity-client.js';

/**
 * Type for section fields
 */
export type SectionBase = {
  _key?: string;
  _type: string;
  title: string;
  displayTitle?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  showBorder?: boolean;
};

/**
 * Add sections to a page
 * @param pageId - The ID of the page to update
 * @param sections - The sections to add
 */
export const addSectionsToPage = async (
  pageId: string,
  sections: SectionBase[],
): Promise<void> => {
  const page = await client.fetch('*[_id == $id][0]', { id: pageId });

  if (!page) {
    throw new Error(`Page with ID ${pageId} not found`);
  }

  const updatedSections = [...(page.sections || []), ...sections];

  await client.patch(pageId).set({ sections: updatedSections }).commit();

  console.log(`Added ${sections.length} sections to page with ID: ${pageId}`);
};

/**
 * Replace all sections on a page
 * @param pageId - The ID of the page to update
 * @param sections - The sections to set
 */
export const replaceSectionsOnPage = async (
  pageId: string,
  sections: SectionBase[],
): Promise<void> => {
  const page = await client.fetch('*[_id == $id][0]', { id: pageId });

  if (!page) {
    throw new Error(`Page with ID ${pageId} not found`);
  }

  await client.patch(pageId).set({ sections: sections }).commit();

  console.log(`Replaced sections on page with ID: ${pageId}`);
};

/**
 * Clear all sections from a page
 * @param pageId - The ID of the page to update
 */
export const clearSectionsFromPage = async (pageId: string): Promise<void> => {
  const page = await client.fetch('*[_id == $id][0]', { id: pageId });

  if (!page) {
    throw new Error(`Page with ID ${pageId} not found`);
  }

  await client.patch(pageId).set({ sections: [] }).commit();

  console.log(`Cleared all sections from page with ID: ${pageId}`);
};
