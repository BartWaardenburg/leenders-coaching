import { GraphQLClient } from 'graphql-request';

if (!process.env.SANITY_API_TOKEN) {
  throw new Error('SANITY_API_TOKEN is required');
}

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required');
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('NEXT_PUBLIC_SANITY_DATASET is required');
}

const apiUrl = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/default`;

/* Create a GraphQL client instance for Sanity */
export const graphqlClient = new GraphQLClient(apiUrl, {
  headers: {
    authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
  },
});
