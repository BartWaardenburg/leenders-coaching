import { sanityFetch, sanityFetchDraft } from '@/utilities/sanity';
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
            lqip,
            dimensions {
              width,
              height,
              aspectRatio
            },
            palette {
              dominant {
                background
              }
            }
          }
        },
        hotspot,
        crop,
        alt
      },
      "posts": select(
        _type == "sectionBlog" => posts[]-> {
          _id,
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
          image {
            asset->,
            hotspot,
            crop,
            alt
          },
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
            lqip,
            dimensions {
              width,
              height,
              aspectRatio
            },
            palette {
              dominant {
                background
              }
            }
          }
        },
        hotspot,
        crop,
        alt
      },
      "posts": select(
        _type == "sectionBlog" => posts[]-> {
          _id,
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
          image {
            asset->,
            hotspot,
            crop,
            alt
          },
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
      title,
      description,
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
 * Query to get site settings (title, description) for metadata
 * @returns Site settings including title and description
 */
export const getSiteSettings = async (): Promise<{
  title?: string;
  description?: string;
} | null> => {
  const { isEnabled } = await draftMode();

  const query = `*[_type == "configuration"][0] {
    title,
    description
  }`;

  if (isEnabled) {
    return sanityFetchDraft<{
      title?: string;
      description?: string;
    } | null>(query);
  }

  return sanityFetch<{
    title?: string;
    description?: string;
  } | null>(query, {}, ['settings']);
};

/**
 * Query to get all blog posts with cache tags
 * @returns All blog posts ordered by publishedAt desc
 */
export const getBlogPosts = async () => {
  const { isEnabled } = await draftMode();

  const query = `*[_type == "post" && defined(title) && defined(slug)] | order(publishedAt desc) {
    ...,
    image {
      asset-> {
        ...,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          },
          palette {
            dominant {
              background
            }
          }
        }
      },
      hotspot,
      crop,
      alt
    },
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
    image {
      asset-> {
        ...,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          },
          palette {
            dominant {
              background
            }
          }
        }
      },
      hotspot,
      crop,
      alt
    },
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
    image {
      asset->,
      hotspot,
      crop,
      alt
    },
    categories[]-> {
      _id,
      title
    },
    author-> {
      _id,
      name,
      image {
        asset->,
        hotspot,
        crop,
        alt
      }
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
