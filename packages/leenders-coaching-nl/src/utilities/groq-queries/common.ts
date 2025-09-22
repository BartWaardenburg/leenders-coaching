import { sanityFetch, sanityFetchDraft } from '@/utilities/sanity';
import { draftMode } from 'next/headers';

/**
 * Common GROQ query fragments and helper functions
 */

/**
 * Helper to check if draft mode is enabled
 * @param useDraft - Optional override for draft mode (useful outside request scope)
 * @returns Whether draft mode is enabled
 */
export const getDraftModeStatus = async (
  useDraft?: boolean
): Promise<boolean> => {
  try {
    const { isEnabled } = await draftMode();
    return isEnabled;
  } catch {
    // If draftMode() fails (e.g., called outside request scope), use the provided parameter or default to false
    return useDraft ?? false;
  }
};

/**
 * Execute a GROQ query based on draft mode status
 * @param query - The GROQ query string
 * @param isDraftMode - Whether draft mode is enabled
 * @param cacheTags - Cache tags for ISR
 * @returns Query result
 */
export const executeQuery = async <T>(
  query: string,
  isDraftMode: boolean,
  cacheTags: string[] = []
): Promise<T> => {
  if (isDraftMode) {
    return sanityFetchDraft<T>(query);
  }
  return sanityFetch<T>(query, {}, cacheTags);
};

/**
 * GROQ fragment for image asset with full metadata
 * Uses asset-> to resolve the asset reference and fetch all metadata
 * Note: Does not include alt field as Sanity's built-in image type doesn't have one
 */
export const IMAGE_ASSET_FRAGMENT = `
  asset-> {
    _id,
    _type,
    url,
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
  crop
`;

/**
 * GROQ fragment for accessible image structure
 * Handles the nested image structure with alt text and caption
 */
export const ACCESSIBLE_IMAGE_FRAGMENT = `
  image {
    ${IMAGE_ASSET_FRAGMENT}
  },
  alt,
  caption
`;

/**
 * GROQ fragment for categories array
 */
export const CATEGORIES_FRAGMENT = `
  categories[]-> {
    _id,
    title,
    slug {
      current
    },
    color
  }
`;

/**
 * GROQ fragment for categories array with minimal fields
 */
export const CATEGORIES_MINIMAL_FRAGMENT = `
  categories[]-> {
    _id,
    title
  }
`;

/**
 * GROQ fragment for content array with image handling
 */
export const CONTENT_FRAGMENT = `
  content[] {
    ...,
    _type == "accessibleImage" => {
      ${ACCESSIBLE_IMAGE_FRAGMENT}
    }
  }
`;

/**
 * Fragment for blog post references in sections
 */
export const SECTION_BLOG_POST_FRAGMENT = `
  posts[]-> {
    _id,
    title,
    description,
    slug,
    publishedAt,
    ${CATEGORIES_FRAGMENT},
    image {
      ${ACCESSIBLE_IMAGE_FRAGMENT}
    },
    featured,
    variant
  }
`;

/**
 * GROQ fragment for generic section handling
 * This handles any section type dynamically without assuming specific section types
 */
export const GENERIC_SECTION_FRAGMENT = `
  sections[]-> {
    ...,
    image {
      ${ACCESSIBLE_IMAGE_FRAGMENT}
    },
    "posts": select(
      _type == "sectionBlog" => ${SECTION_BLOG_POST_FRAGMENT}
    ),
    "showAllPosts": select(_type == "sectionBlog" => showAllPosts),
    "showFeaturedOnly": select(_type == "sectionBlog" => showFeaturedOnly),
    "sortOrder": select(_type == "sectionBlog" => sortOrder),
    testimonials[] {
      ...,
      image {
        ${ACCESSIBLE_IMAGE_FRAGMENT}
      }
    },
    content[] {
      ...,
      _type == "accessibleImage" => {
        image {
          ${IMAGE_ASSET_FRAGMENT}
        },
        alt,
        caption
      }
    }
  }
`;

/**
 * Common blog post fields for listing queries
 */
export const BLOG_POST_LIST_FIELDS = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  description,
  slug,
  publishedAt,
  featured,
  variant,
      image {
        ${ACCESSIBLE_IMAGE_FRAGMENT}
      }
`;

/**
 * Full blog post fields including content
 */
export const BLOG_POST_FULL_FIELDS = `
  ...,
    image {
      ${ACCESSIBLE_IMAGE_FRAGMENT}
    },
  ${CATEGORIES_FRAGMENT},
  ${CONTENT_FRAGMENT}
`;

/**
 * Category fields for detailed queries
 */
export const CATEGORY_FULL_FIELDS = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  description,
  slug {
    current
  },
  color,
  header {
    ...,
    image {
      ${ACCESSIBLE_IMAGE_FRAGMENT}
    },
    ctas[] {
      ...,
      image {
        ${ACCESSIBLE_IMAGE_FRAGMENT}
      }
    }
  },
  metadata {
    title,
    description,
    openGraph {
      title,
      description,
      image {
        ${ACCESSIBLE_IMAGE_FRAGMENT}
      }
    },
    robots {
      index,
      follow
    }
  }
`;

/**
 * Category fields for listing queries
 */
export const CATEGORY_LIST_FIELDS = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  description,
  slug {
    current
  },
  color
`;

/**
 * Fragment for navigation query
 */
export const NAVIGATION_FRAGMENT = `
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
`;

/**
 * Fragment for footer query
 */
export const FOOTER_FRAGMENT = `
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
`;

/**
 * Fragment for site settings query
 */
export const SITE_SETTINGS_FRAGMENT = `
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
`;
