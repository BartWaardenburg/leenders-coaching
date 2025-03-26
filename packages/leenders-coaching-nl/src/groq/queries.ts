import { defineQuery } from '@/utilities/sanity';

/**
 * Query to get a page by type (e.g. "homePage", "aboutPage")
 * @returns The page data or null
 */
export const PAGE_QUERY = (type: string) =>
  defineQuery(`*[_type == "${type}"][0] {
    ...,
    sections[] {
      ...,
      image {
        asset->,
        hotspot,
        crop,
        alt
      },
      "posts": select(
        _type == "sectionBlog" => posts[]-> {
          title,
          description,
          slug,
          publishedAt,
          categories,
          "image": image.asset->url,
          featured,
          variant
        }
      ),
      testimonials[] {
        ...,
        image {
          asset->,
          hotspot,
          crop,
          alt
        }
      },
      content[] {
        ...,
        _type == "image" => {
          asset->,
          hotspot,
          crop,
          alt,
          caption
        }
      }
    }
  }`);

/**
 * Query to get the home page
 * @returns The home page data or null
 */
export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0] {
  ...,
  sections[] {
    ...,
    image {
      asset->,
      hotspot,
      crop,
      alt
    },
    "posts": select(
      _type == "sectionBlog" => posts[]-> {
        title,
        description,
        slug,
        publishedAt,
        categories,
        "image": image.asset->url,
        featured,
        variant
      }
    ),
    testimonials[] {
      ...,
      image {
        asset->,
        hotspot,
        crop,
        alt
      }
    },
    content[] {
      ...,
      _type == "image" => {
        asset->,
        hotspot,
        crop,
        alt,
        caption
      }
    }
  }
}`);

/**
 * Query to get the about page
 * @returns The about page data or null
 */
export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage"][0] {
  ...,
  sections[] {
    ...,
    image {
      asset->,
      hotspot,
      crop,
      alt
    },
    "posts": select(
      _type == "sectionBlog" => posts[]-> {
        title,
        description,
        slug,
        publishedAt,
        categories,
        "image": image.asset->url,
        featured,
        variant
      }
    ),
    testimonials[] {
      ...,
      image {
        asset->,
        hotspot,
        crop,
        alt
      }
    },
    content[] {
      ...,
      _type == "image" => {
        asset->,
        hotspot,
        crop,
        alt,
        caption
      }
    }
  }
}`);

/**
 * Query to get global data (navigation, footer, site settings)
 * @returns Global data including navigation, footer and site settings
 */
export const GLOBAL_DATA_QUERY = defineQuery(`{
  "navigation": *[_type == "header"][0] {
    ...
  },
  "footer": *[_type == "footer"][0] {
    ...
  },
  "siteSettings": *[_type == "siteSettings"][0] {
    ...
  }
}`);

/**
 * Query to get all blog posts
 * @returns All blog posts ordered by publishedAt desc
 */
export const BLOG_POSTS_QUERY =
  defineQuery(`*[_type == "post"] | order(publishedAt desc) {
    ...,
    "image": image.asset->url,
    content[] {
      ...,
      _type == "image" => {
        asset->,
        hotspot,
        crop,
        alt,
        caption
      }
    }
  }`);

/**
 * Query to get a single blog post by slug
 * @returns The blog post or null
 */
export const BLOG_POST_BY_SLUG_QUERY = (slug: string) =>
  defineQuery(`*[_type == "post" && slug.current == "${slug}"][0] {
    ...,
    "image": image.asset->url,
    content[] {
      ...,
      _type == "image" => {
        asset->,
        hotspot,
        crop,
        alt,
        caption
      }
    }
  }`);

/**
 * Query to get all categories
 * @returns All categories ordered by title
 */
export const CATEGORIES_QUERY =
  defineQuery(`*[_type == "category"] | order(title asc) {
    ...
  }`);

/**
 * Query to get posts by category ID
 * @returns Posts that reference the category, ordered by publishedAt desc
 */
export const POSTS_BY_CATEGORY_QUERY = (categoryId: string) =>
  defineQuery(`*[_type == "post" && references("${categoryId}")] | order(publishedAt desc) {
    ...,
    "image": image.asset->url,
    categories[]-> {
      _id,
      title
    },
    author-> {
      _id,
      name,
      image
    }
  }`);

/**
 * Get site settings
 */
export const getSiteSettings = `*[_type == "siteSettings"][0]`;

/**
 * Get navigation
 */
export const getNavigation = `*[_type == "navigation"][0]`;

/**
 * Get footer
 */
export const getFooter = `*[_type == "footer"][0]`;
