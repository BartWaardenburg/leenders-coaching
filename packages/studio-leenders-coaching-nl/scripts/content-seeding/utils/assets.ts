import fs from 'fs';
import path from 'path';
import { client } from './sanity-client.js';
import { isDryRun } from './page-utils.js';

/**
 * Image Reference Type
 */
export type ImageReference = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

/**
 * Upload an image to Sanity from a local file
 * @param filePath - Path to the local file
 * @returns The Sanity image reference object
 */
export const uploadImageFromFile = async (
  filePath: string,
): Promise<ImageReference> => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileName = path.basename(filePath);
  console.log(`Uploading image: ${fileName}...`);

  // Read the file as a buffer
  const fileBuffer = fs.readFileSync(filePath);

  // Upload the file to Sanity
  const asset = await client.assets.upload('image', fileBuffer, {
    filename: fileName,
  });

  // Return the image reference
  return {
    _type: 'image',
    asset: {
      _ref: asset._id,
      _type: 'reference',
    },
  };
};

/**
 * Upload an image to Sanity from a URL
 * @param url - URL of the image to upload
 * @returns The Sanity image reference object
 */
export const uploadImageFromUrl = async (
  url: string,
): Promise<ImageReference> => {
  console.log(`Uploading image from URL: ${url}...`);

  // In dry run mode, just log and return a mock reference
  if (isDryRun) {
    console.log(`🔍 DRY RUN MODE: Would upload image from URL: ${url}`);
    return {
      _type: 'image',
      asset: {
        _ref: 'image-mock-reference-dry-run',
        _type: 'reference',
      },
    };
  }

  try {
    // Fetch the image data using the global fetch API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${url}`);
    }

    // Convert to buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = url.split('/').pop() || 'image.jpg';

    // Upload the file to Sanity from the buffer
    const asset = await client.assets.upload('image', buffer, {
      filename,
    });

    // Return the image reference
    return {
      _type: 'image',
      asset: {
        _ref: asset._id,
        _type: 'reference',
      },
    };
  } catch (_error) {
    console.warn(
      `Warning: Could not fetch image from URL: ${url}. Using mock image reference.`,
    );

    // Return a mock image reference to allow the script to continue
    return {
      _type: 'image',
      asset: {
        _ref: 'image-mock-reference-fallback',
        _type: 'reference',
      },
    };
  }
};

/**
 * Check if an asset exists in Sanity
 * @param assetId - The ID of the asset to check
 * @returns Boolean indicating if the asset exists
 */
export const assetExists = async (assetId: string): Promise<boolean> => {
  try {
    const asset = await client.fetch('*[_id == $id][0]', { id: assetId });
    return !!asset;
  } catch (_error) {
    return false;
  }
};

/**
 * Delete an asset from Sanity
 * @param assetId - The ID of the asset to delete
 */
export const deleteAsset = async (assetId: string): Promise<void> => {
  console.log(`Deleting asset with ID: ${assetId}...`);
  await client.delete(assetId);
  console.log(`Deleted asset with ID: ${assetId} successfully!`);
};
