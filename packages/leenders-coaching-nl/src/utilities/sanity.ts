import { GraphQLClient } from 'graphql-request';
import { createClient } from 'next-sanity';
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
  apiVersion: '2024-02-14', // Current API version
  useCdn: true,
};

/* Construct the Sanity GraphQL API URL */
const apiUrl = `https://${sanityConfig.projectId}.api.sanity.io/v1/graphql/${sanityConfig.dataset}/default`;

/* Create a GraphQL client instance for Sanity */
export const sanityClient = new GraphQLClient(apiUrl, {
  headers:
    isServer && sanityConfig.apiToken
      ? { authorization: `Bearer ${sanityConfig.apiToken}` }
      : {}, // Only include auth headers on server
});

/* Create a Sanity client for image handling */
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
