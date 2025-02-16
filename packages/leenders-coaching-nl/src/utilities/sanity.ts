import { GraphQLClient } from 'graphql-request';

/* Validate required environment variables */
const validateEnv = () => {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error('SANITY_API_TOKEN is required');
  }

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required');
  }

  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error('NEXT_PUBLIC_SANITY_DATASET is required');
  }
};

/* Sanity configuration */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  apiToken: process.env.SANITY_API_TOKEN as string,
  apiVersion: '2024-02-14', // Current API version
};

/* Construct the Sanity GraphQL API URL */
const apiUrl = `https://${sanityConfig.projectId}.api.sanity.io/v1/graphql/${sanityConfig.dataset}/default`;

/* Initialize environment */
validateEnv();

/* Create a GraphQL client instance for Sanity */
export const sanityClient = new GraphQLClient(apiUrl, {
  headers: {
    authorization: `Bearer ${sanityConfig.apiToken}`,
  },
});
