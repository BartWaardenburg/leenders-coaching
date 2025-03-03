import { createClient } from '@sanity/client';
import { config } from 'dotenv';

// Load environment variables
config();

/**
 * Type for Sanity document
 */
export type SanityDocument = {
  _id: string;
  _type: string;
  [key: string]: any;
};

/**
 * Create a Sanity client
 */
export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: false,
  apiVersion: '2023-12-01',
  token: process.env.EDITOR_SANITY_AUTH_TOKEN,
});

/**
 * Create or update a document in Sanity
 * @param document - The document to create or update
 */
export const createOrUpdateDocument = async (
  document: SanityDocument,
): Promise<void> => {
  const { _id, _type } = document;
  const exists = await client.fetch('*[_id == $id][0]', { id: _id });

  if (!exists) {
    console.log(`Creating ${_type} document with ID: ${_id}...`);
    await client.create(document);
    console.log(`Created ${_type} successfully!`);
  } else {
    console.log(`Updating ${_type} document with ID: ${_id}...`);
    await client.createOrReplace(document);
    console.log(`Updated ${_type} successfully!`);
  }
};

/**
 * Delete a document from Sanity by ID
 * @param id - The ID of the document to delete
 */
export const deleteDocument = async (id: string): Promise<void> => {
  console.log(`Deleting document with ID: ${id}...`);
  await client.delete(id);
  console.log(`Deleted document with ID: ${id} successfully!`);
};
