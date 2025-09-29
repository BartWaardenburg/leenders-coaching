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
    type.toLowerCase(),
    type,
    'post',
    'posts',
    'blog',
    'category',
    'categories',
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

  return executeQuery(query, isDraftMode, [
    'homePage',
    'homepage',
    'home',
    'post',
    'posts',
    'blog',
    'category',
    'categories',
  ]);
};

/**
 * Query to get all static pages for sitemap generation
 * @returns All static pages with slugs for sitemap
 */
export const getStaticPagesForSitemap = async (): Promise<
  Array<{
    _id: string;
    slug: { current: string };
    _updatedAt: string;
  }>
> => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type in ["homePage", "aboutPage", "coachingPage", "contactPage", "approachPage", "privacyPage", "voorwaardenPage", "blogPage"] && defined(slug)] {
    _id,
    slug,
    _updatedAt
  }`;

  return executeQuery(query, isDraftMode, ['pages', 'sitemap']);
};
