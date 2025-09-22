import {
  getDraftModeStatus,
  executeQuery,
  GENERIC_SECTION_FRAGMENT,
} from './common';

/**
 * Query to get a page by type with cache tags
 * @param type - The page type (e.g. "homePage", "aboutPage")
 * @returns The page data or null
 */
export const getPage = async (type: string) => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "${type}"][0] {
    ...,
    ${GENERIC_SECTION_FRAGMENT}
  }`;

  const result = await executeQuery(query, isDraftMode, [
    'pages',
    type.toLowerCase(),
  ]);

  return result;
};

/**
 * Query to get the home page with cache tags
 * @returns The home page data or null
 */
export const getHomePage = async () => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "homePage"][0] {
    ...,
    ${GENERIC_SECTION_FRAGMENT}
  }`;

  return executeQuery(query, isDraftMode, ['pages', 'home']);
};
