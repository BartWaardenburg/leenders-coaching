import {
  getDraftModeStatus,
  executeQuery,
  NAVIGATION_FRAGMENT,
  FOOTER_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
} from './common';
import type { GLOBAL_DATA_QUERYResult } from '@/types/sanity/groq';

/**
 * Query to get global data with cache tags
 * @returns Global data including navigation, footer and site settings
 */
export const getGlobalData = async (): Promise<GLOBAL_DATA_QUERYResult> => {
  const isDraftMode = await getDraftModeStatus();

  const query = `{
    "navigation": *[_type == "header"][0] {
      ${NAVIGATION_FRAGMENT}
    },
    "footer": *[_type == "footer"][0] {
      ${FOOTER_FRAGMENT}
    },
    "siteSettings": *[_type == "configuration"][0] {
      ${SITE_SETTINGS_FRAGMENT}
    }
  }`;

  return executeQuery<GLOBAL_DATA_QUERYResult>(query, isDraftMode, [
    'header',
    'footer',
    'configuration',
    'global',
    'navigation',
    'settings',
  ]);
};

/**
 * Query to get site settings (title, description) for metadata
 * @returns Site settings including title and description
 */
export const getSiteSettings = async (): Promise<{
  title?: string;
  description?: string;
} | null> => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "configuration"][0] {
    title,
    description
  }`;

  return executeQuery<{
    title?: string;
    description?: string;
  } | null>(query, isDraftMode, ['configuration', 'settings']);
};
