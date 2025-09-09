import { createClient } from 'next-sanity';
import type { QueryParams } from '@sanity/client';

/**
 * Returns true if the hostname matches 'chromatic.com' or is a subdomain of 'chromatic.com'.
 */
function isChromaticHost(hostname: string): boolean {
  if (!hostname) return false;
  return (
    hostname === 'chromatic.com' ||
    (hostname.endsWith('.chromatic.com') &&
      hostname.length > '.chromatic.com'.length)
  );
}

/* Check if we're in a Storybook, test, or mock environment */
const isNonProductionEnvironment = () => {
  // Check for test environments (Jest, Vitest)
  if (typeof process !== 'undefined' && process.env) {
    if (
      process.env.NODE_ENV === 'test' ||
      process.env.VITEST === 'true' ||
      process.env.JEST_WORKER_ID !== undefined ||
      process.env.STORYBOOK === 'true'
    ) {
      return true;
    }
  }

  // Check for browser-based Storybook/Chromatic environments
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    const href = window.location.href;

    // Use explicit check function for chromatic hostnames
    return (
      isChromaticHost(hostname) ||
      hostname === 'capture-loopback.chromatic.com' ||
      href.includes('iframe.html') || // Storybook iframe
      (hostname === 'localhost' && window.parent !== window) // Storybook localhost
    );
  }

  return false;
};

/* Default fallback values for non-production environments */
const FALLBACK_CONFIG = {
  projectId: 'storybook-fallback',
  dataset: 'production',
  apiVersion: '2024-02-14',
} as const;

/* Sanity client configuration for Next.js with cache tag support and fallbacks */
export const client = createClient({
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    (isNonProductionEnvironment() ? FALLBACK_CONFIG.projectId : ''),
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    (isNonProductionEnvironment() ? FALLBACK_CONFIG.dataset : ''),
  apiVersion:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || FALLBACK_CONFIG.apiVersion,
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
