import { sanityFetch, sanityFetchDraft } from '@/lib/api/sanity';
import { draftMode } from 'next/headers';
import type { GLOBAL_DATA_QUERYResult } from '@/types/sanity/groq';

/**
 * Enhanced query functions with cache tag support for ISR
 */

/**
 * Query to get a page by type with cache tags
 * @param type - The page type (e.g. "homePage", "aboutPage")
 * @returns The page data or null
 */
export const getPage = async (type: string) => {
  const { isEnabled } = await draftMode();

  const query = `*[_type == "${type}"][0] {
    ...,
    sections[] {
      ...,
      image {
        asset-> {
          ...,
          metadata {
            lqip
          }
        },
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
          categories[]-> {
            _id,
            title,
            slug,
            color
          },
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
  }`;

  if (isEnabled) {
    return sanityFetchDraft(query);
  }

  return sanityFetch(query, {}, ['pages', type.toLowerCase()]);
};

/**
 * Query to get the home page with cache tags
 * @returns The home page data or null
 */
export const getHomePage = async () => {
  const { isEnabled } = await draftMode();

  const query = `*[_type == "homePage"][0] {
    ...,
    sections[] {
      ...,
      image {
        asset-> {
          ...,
          metadata {
            lqip
          }
        },
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
          categories[]-> {
            _id,
            title,
            slug,
            color
          },
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
  }`;

  if (isEnabled) {
    return sanityFetchDraft(query);
  }

  return sanityFetch(query, {}, ['pages', 'home']);
};

/**
 * Query to get global data with cache tags
 * @returns Global data including navigation, footer and site settings
 */
export const getGlobalData = async (): Promise<GLOBAL_DATA_QUERYResult> => {
  const { isEnabled } = await draftMode();

  const query = `{
    "navigation": *[_type == "header"][0] {
      navigation[] {
        _key,
        label,
        href
      },
      about {
        title,
        description
      },
      social {
        title,
        links[] {
          _key,
          platform,
          url
        }
      },
      contact {
        title,
        projectEnquiry {
          label,
          href,
          linkText
        },
        generalEnquiry {
          label,
          href,
          linkText
        }
      }
    },
    "footer": *[_type == "footer"][0] {
      copyright,
      contact {
        email,
        phone
      },
      socialLinks[] {
        _key,
        platform,
        url
      }
    },
    "siteSettings": *[_type == "configuration"][0] {
      accessibility {
        closeButtons {
          toast,
          modal
        },
        calendar {
          previousMonth,
          nextMonth
        }
      },
      interface {
        mobileMenu {
          toggleButton,
          menuLabel,
          closeButton
        },
        themeToggle {
          label
        },
        buttons {
          loadMore,
          readMore,
          submit,
          close
        }
      },
      blog {
        labels {
          featured,
          readArticle
        },
        paths {
          blog
        }
      },
      forms {
        messages {
          required,
          invalid,
          success,
          error
        }
      }
    }
  }`;

  if (isEnabled) {
    return sanityFetchDraft<GLOBAL_DATA_QUERYResult>(query);
  }

  return sanityFetch<GLOBAL_DATA_QUERYResult>(query, {}, [
    'global',
    'navigation',
    'footer',
    'settings',
  ]);
};

/**
 * Query to get all blog posts with cache tags
 * @returns All blog posts ordered by publishedAt desc
 */
export const getBlogPosts = async () => {
  const { isEnabled } = await draftMode();

  const query = `*[_type == "post" && defined(title) && defined(slug)] | order(publishedAt desc) {
    ...,
    "image": image.asset->url,
    categories[]-> {
      _id,
      title,
      slug,
      color
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
  }`;

  if (isEnabled) {
    return sanityFetchDraft(query);
  }

  return sanityFetch(query, {}, ['posts', 'blog']);
};

/**
 * Query to get a single blog post by slug with cache tags
 * @param slug - The blog post slug
 * @returns The blog post or null
 */
export const getBlogPostBySlug = async (slug: string) => {
  const { isEnabled } = await draftMode();

  const query = `*[_type == "post" && slug.current == "${slug}" && defined(title)][0] {
    ...,
    "image": image.asset->url,
    categories[]-> {
      _id,
      title,
      slug,
      color
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
  }`;

  if (isEnabled) {
    return sanityFetchDraft(query);
  }

  return sanityFetch(query, {}, ['posts', 'blog', `post-${slug}`]);
};

/**
 * Query to get all categories with cache tags
 * @returns All categories ordered by title
 */
export const getCategories = async () => {
  const { isEnabled } = await draftMode();

  const query = `*[_type == "category"] | order(title asc) {
    ...
  }`;

  if (isEnabled) {
    return sanityFetchDraft(query);
  }

  return sanityFetch(query, {}, ['categories']);
};

/**
 * Query to get posts by category ID with cache tags
 * @param categoryId - The category ID
 * @returns Posts that reference the category, ordered by publishedAt desc
 */
export const getPostsByCategory = async (categoryId: string) => {
  const { isEnabled } = await draftMode();

  const query = `*[_type == "post" && references("${categoryId}")] | order(publishedAt desc) {
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
  }`;

  if (isEnabled) {
    return sanityFetchDraft(query);
  }

  return sanityFetch(query, {}, [
    'posts',
    'blog',
    'categories',
    `category-${categoryId}`,
  ]);
};
