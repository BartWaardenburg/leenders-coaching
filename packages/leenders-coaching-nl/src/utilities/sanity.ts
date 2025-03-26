import { createClient } from '@sanity/client';
import type { QueryParams } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

/* Check if we're running on the server or client */
const isServer = typeof window === 'undefined';

/* Validate required environment variables */
const validateEnv = () => {
  // Only check for SANITY_API_TOKEN on the server
  if (isServer && !process.env.SANITY_API_TOKEN) {
    throw new Error('SANITY_API_TOKEN is required');
  }

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required');
  }

  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error('NEXT_PUBLIC_SANITY_DATASET is required');
  }
};

/* Initialize environment */
validateEnv();

/* Sanity configuration */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  apiToken: isServer ? (process.env.SANITY_API_TOKEN as string) : '',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-14',
  useCdn: process.env.NODE_ENV === 'production',
};

/* Create Sanity client */
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  token: isServer ? sanityConfig.apiToken : undefined, // Only include token on server
});

/* Create image URL builder instance */
const imageBuilder = imageUrlBuilder(client);

/**
 * Get image URL for a Sanity image reference
 */
export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};

/**
 * Helper to define a GROQ query with proper typing
 * @param query The GROQ query string
 * @returns The query string with type information
 */
export const defineQuery = <ResultType>(
  query: string,
): string & { _type?: ResultType } => query as string & { _type?: ResultType };

/**
 * Helper function to execute a GROQ query with type safety
 * @param query - The GROQ query, preferably created with defineQuery
 * @param params - Query parameters
 * @returns A promise resolving to the typed result
 */
export const groq = <ResultType>(
  query: string | ReturnType<typeof defineQuery>,
  params?: QueryParams,
): Promise<ResultType> => {
  const queryString = typeof query === 'string' ? query : query;
  return client.fetch<ResultType>(queryString, params || {});
};
