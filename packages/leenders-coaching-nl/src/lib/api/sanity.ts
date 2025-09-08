import { createClient } from 'next-sanity';
import type { QueryParams } from '@sanity/client';

/**
 * Sanity client configuration for Next.js with cache tag support
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-14',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Enhanced fetch function with cache tags for ISR
 * @param query - The GROQ query string
 * @param params - Query parameters
 * @param tags - Cache tags for revalidation
 * @returns Promise resolving to the typed result
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  tags?: string[]
): Promise<T> {
  return client.fetch<T>(query, params, {
    cache: 'force-cache',
    next: {
      tags: tags || ['sanity'],
    },
  });
}

/**
 * Fetch function for draft mode (no caching)
 * @param query - The GROQ query string
 * @param params - Query parameters
 * @returns Promise resolving to the typed result
 */
export async function sanityFetchDraft<T>(
  query: string,
  params: QueryParams = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    cache: 'no-store',
    perspective: 'drafts',
  });
}
