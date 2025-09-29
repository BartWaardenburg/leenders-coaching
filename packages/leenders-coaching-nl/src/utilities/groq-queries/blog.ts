import {
  getDraftModeStatus,
  executeQuery,
  BLOG_POST_FULL_FIELDS,
  BLOG_POST_LIST_FIELDS,
  CATEGORY_FULL_FIELDS,
  CATEGORIES_FRAGMENT,
  CATEGORIES_MINIMAL_FRAGMENT,
  CONTENT_FRAGMENT,
} from './common';

/**
 * Query to get all blog posts with cache tags
 * @returns All blog posts ordered by publishedAt desc
 */
export const getBlogPosts = async () => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "post" && defined(title) && defined(slug) && defined(image)] | order(publishedAt desc) {
    ${BLOG_POST_FULL_FIELDS}
  }`;

  return executeQuery(query, isDraftMode, ['post', 'posts', 'blog']);
};

/**
 * Query to get a single blog post by slug with cache tags
 * @param slug - The blog post slug
 * @returns The blog post or null
 */
export const getBlogPostBySlug = async (slug: string) => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "post" && slug.current == $slug && defined(title)][0] {
    ${BLOG_POST_FULL_FIELDS}
  }`;

  return executeQuery(query, isDraftMode, ['post', `post:${slug}`], { slug });
};

/**
 * Query to get all categories with cache tags
 * @param useDraft - Whether to use draft mode (defaults to checking draft mode in request context)
 * @returns All categories ordered by title
 */
export const getCategories = async (useDraft?: boolean) => {
  const isDraftMode = await getDraftModeStatus(useDraft);

  const query = `*[_type == "category"] | order(title asc) {
    ${CATEGORY_FULL_FIELDS}
  }`;

  return executeQuery(query, isDraftMode, ['category', 'categories']);
};

/**
 * Query to get a category by slug with cache tags
 * @param slug - The category slug
 * @returns The category or null
 */
export const getCategoryBySlug = async (slug: string) => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "category" && slug.current == $slug][0] {
    ${CATEGORY_FULL_FIELDS}
  }`;

  return executeQuery(query, isDraftMode, ['category', `category:${slug}`], {
    slug,
  });
};

/**
 * Query to get posts by category slug with cache tags
 * @param categorySlug - The category slug
 * @returns Posts that reference the category, ordered by publishedAt desc
 */
export const getPostsByCategorySlug = async (
  categorySlug: string,
  useDraft?: boolean
) => {
  const isDraftMode = await getDraftModeStatus(useDraft);

  const query = `*[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
    ${BLOG_POST_LIST_FIELDS},
    ${CATEGORIES_FRAGMENT},
    ${CONTENT_FRAGMENT}
  }`;

  return executeQuery(
    query,
    isDraftMode,
    ['posts', 'blog', 'categories', 'category', `category:${categorySlug}`],
    { categorySlug }
  );
};

/**
 * Query to get posts by category ID with cache tags
 * @param categoryId - The category ID
 * @returns Posts that reference the category, ordered by publishedAt desc
 */
export const getPostsByCategory = async (categoryId: string) => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "post" && references($categoryId)] | order(publishedAt desc) {
    ${BLOG_POST_LIST_FIELDS},
    ${CATEGORIES_MINIMAL_FRAGMENT}
  }`;

  return executeQuery(
    query,
    isDraftMode,
    ['posts', 'blog', 'categories', 'category', `category-${categoryId}`],
    { categoryId }
  );
};

/**
 * Query to get all blog posts for sitemap generation
 * Minimal fields needed for sitemap - no image requirement, just slug and dates
 * @returns All published blog posts with minimal fields for sitemap
 */
export const getBlogPostsForSitemap = async (): Promise<
  Array<{
    _id: string;
    slug: { current: string };
    publishedAt: string;
    _updatedAt: string;
  }>
> => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "post" && defined(slug) && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    slug,
    publishedAt,
    _updatedAt
  }`;

  return executeQuery(query, isDraftMode, ['posts', 'blog', 'sitemap']);
};

/**
 * Query to get all categories for sitemap generation
 * Minimal fields needed for sitemap - just slug and updated date
 * @returns All categories with minimal fields for sitemap
 */
export const getCategoriesForSitemap = async (): Promise<
  Array<{
    _id: string;
    slug: { current: string };
    _updatedAt: string;
  }>
> => {
  const isDraftMode = await getDraftModeStatus();

  const query = `*[_type == "category" && defined(slug)] | order(title asc) {
    _id,
    slug,
    _updatedAt
  }`;

  return executeQuery(query, isDraftMode, ['categories', 'sitemap']);
};
