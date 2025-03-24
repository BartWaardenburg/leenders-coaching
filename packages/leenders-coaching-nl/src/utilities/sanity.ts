import {
  createClient,
  QueryParams,
  defineQuery as nextSanityDefineQuery,
} from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

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

/**
 * Create a Sanity client with the configuration
 * This is the primary client for all operations
 */
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  token: isServer ? sanityConfig.apiToken : undefined, // Only include token on server
});

/* Create an image URL builder */
const builder = imageUrlBuilder(client);

/**
 * Helper function to build image URLs from Sanity image references
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

/**
 * Helper function to create a typed GROQ query using next-sanity's defineQuery
 * This allows TypeGen to discover and generate types for GROQ queries
 */
export const defineQuery = nextSanityDefineQuery;

/**
 * Helper function to execute a GROQ query with type safety
 * @param query - The GROQ query, preferably created with defineQuery
 * @param params - Query parameters
 * @returns A promise resolving to the typed result
 */
export const groq = <T>(
  query: string | ReturnType<typeof defineQuery>,
  params?: QueryParams,
): Promise<T> => {
  // Handle both string and defineQuery result
  const queryString =
    typeof query === 'string' ? query : (query as { query: string }).query;
  return client.fetch<T>(queryString, params || {});
};

/**
 * Common GROQ queries that can be reused throughout the application
 */
export const queries = {
  // Get a page by type (e.g., homePage, aboutPage)
  getPageByType: (type: string) => defineQuery(`*[_type == "${type}"][0]`),

  // Get multiple items of a specific type
  getDocumentsByType: (type: string) => defineQuery(`*[_type == "${type}"]`),

  // Get site settings
  getSiteSettings: defineQuery(`*[_type == "siteSettings"][0]`),

  // Get navigation
  getNavigation: defineQuery(`*[_type == "navigation"][0]`),

  // Get footer
  getFooter: defineQuery(`*[_type == "footer"][0]`),

  // Get global data (navigation, footer, site settings)
  getGlobalData: defineQuery(`{
    "navigation": *[_type == "navigation"][0],
    "footer": *[_type == "footer"][0],
    "siteSettings": *[_type == "siteSettings"][0]
  }`),
};
