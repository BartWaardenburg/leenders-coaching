'use client';

import { preconnect } from 'react-dom';

/**
 * PreconnectResources component that establishes early connections to important third-party origins.
 * This improves performance by resolving DNS, establishing TCP connections, and performing TLS handshakes
 * before the browser actually needs to fetch resources from these origins.
 *
 * Based on Next.js documentation recommendations for App Router.
 *
 * @returns {null} This component doesn't render anything visible
 */
export const PreconnectResources = (): null => {
  preconnect('https://vercel.live', { crossOrigin: 'anonymous' });
  preconnect('https://challenges.cloudflare.com', {
    crossOrigin: 'anonymous',
  });
  preconnect('https://cdn.sanity.io', { crossOrigin: 'anonymous' });

  return null;
};
