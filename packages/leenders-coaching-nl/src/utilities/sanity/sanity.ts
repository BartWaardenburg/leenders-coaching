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

/* Check if we're running on the server or client */
const isServer = typeof window === 'undefined';

/**
 * Validate required environment variables for Sanity configuration
 * @throws Error if required environment variables are missing
 */
const validateEnv = () => {
  /* Only check for SANITY_API_TOKEN on the server */
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

/**
 * Check if we're in a Storybook, test, or mock environment
 * @returns True if running in a non-production environment
 */
const isNonProductionEnvironment = () => {
  /* Check for test environments (Jest, Vitest) */
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

  /* Check for browser-based Storybook/Chromatic environments */
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    const href = window.location.href;

    /* Use explicit check function for chromatic hostnames */
    return (
      isChromaticHost(hostname) ||
      hostname === 'capture-loopback.chromatic.com' ||
      href.includes('iframe.html') /* Storybook iframe */ ||
      (hostname === 'localhost' &&
        window.parent !== window) /* Storybook localhost */
    );
  }

  return false;
};

/* Initialize environment - skip validation in non-production environments */
if (!isNonProductionEnvironment()) {
  validateEnv();
}

/* Default fallback values for non-production environments */
const FALLBACK_CONFIG = {
  projectId: 'storybook-fallback',
  dataset: 'production',
  apiVersion: '2024-02-14',
} as const;

/* Sanity configuration with fallbacks for non-production environments */
export const sanityConfig = {
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    (isNonProductionEnvironment() ? FALLBACK_CONFIG.projectId : ''),
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    (isNonProductionEnvironment() ? FALLBACK_CONFIG.dataset : ''),
  apiToken: isServer ? process.env.SANITY_API_TOKEN || '' : '',
  apiVersion:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || FALLBACK_CONFIG.apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
};

/**
 * Create Sanity client with graceful fallbacks for non-production environments
 * @returns Configured Sanity client
 * @throws Error if client creation fails in production
 */
const createSanityClient = () => {
  try {
    return createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: sanityConfig.useCdn,
      token: isServer
        ? process.env.SANITY_VIEWER_TOKEN || sanityConfig.apiToken
        : undefined /* Use viewer token for draft mode */,
      stega: {
        studioUrl:
          process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
          (process.env.NODE_ENV === 'development'
            ? 'http://localhost:3333'
            : 'https://studio.leenders-coaching.nl'),
      },
    });
  } catch (error) {
    /* In non-production environments, create a fallback client if the real one fails */
    if (isNonProductionEnvironment()) {
      return createClient({
        projectId: FALLBACK_CONFIG.projectId,
        dataset: FALLBACK_CONFIG.dataset,
        apiVersion: FALLBACK_CONFIG.apiVersion,
        useCdn: false,
        stega: {
          studioUrl: 'http://localhost:3333',
        },
      });
    }
    throw error;
  }
};

export const client = createSanityClient();

/**
 * Helper to define a GROQ query with proper typing
 * @param query The GROQ query string
 * @returns The query string with type information
 */
export const defineQuery = <ResultType>(
  query: string
): string & { _type?: ResultType } => query as string & { _type?: ResultType };

/**
 * Helper function to execute a GROQ query with type safety
 * @param query - The GROQ query, preferably created with defineQuery
 * @param params - Query parameters
 * @returns A promise resolving to the typed result
 */
export const groq = <ResultType>(
  query: string | ReturnType<typeof defineQuery>,
  params?: QueryParams
): Promise<ResultType> => {
  const queryString = typeof query === 'string' ? query : query;
  return client.fetch<ResultType>(queryString, params || {});
};
