import { defineQuery } from '@/utilities/sanity';

/**
 * Query to get a page by type (e.g. "homePage", "aboutPage")
 * @returns The page data or null
 */
export const PAGE_QUERY = (type: string) =>
  // The result type is: PAGE_QUERYResult<T>
  defineQuery(`*[_type == "${type}"][0] {
    _id,
    _type,
    title,
    slug,
    metadata {
      title,
      description,
      keywords,
      openGraph {
        title,
        description,
        type,
        url,
        siteName,
        image {
          url,
          width,
          height,
          alt
        }
      }
    },
    sections[] {
      _type,
      _key,
      title,
      displayTitle,
      subtitle,
      description,
      background,
      showBorder,
      
      // Common fields for various section types
      ...,
      
      // SectionHeader
      image,
      cta,
      
      // SectionFeatured
      headline,
      features[]{...},
      
      // SectionCards
      cards[]{...},
      
      // SectionTestimonial
      testimonials[]{...},
      
      // SectionContent
      content,
      
      // SectionFAQ
      faqs[]{...},
      
      // SectionBlog
      posts,
      limit,
      showFeatured,
      
      // SectionCalendar
      events[]{...},
      
      // SectionForm
      formType,
      successMessage,
      
      // SectionPricing
      plans[]{...},
      
      // SectionTimeline
      steps[]{...}
    }
  }`);

/**
 * Query to get the home page
 * @returns The home page data or null
 */
export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0] {
  _id,
  _type,
  title,
  slug,
  metadata {
    title,
    description,
    keywords,
    openGraph {
      title,
      description,
      type,
      url,
      siteName,
      image {
        url,
        width,
        height,
        alt
      }
    }
  },
  sections[] {
    _type,
    _key,
    title,
    displayTitle,
    subtitle,
    description,
    background,
    showBorder,
    
    // SectionHeader
    image,
    cta,
    
    // SectionFeatured
    headline,
    features[]{...},
    
    // SectionCards
    cards[]{...},
    
    // SectionTestimonial
    testimonials[]{...},
    
    // SectionContent
    content,
  }
}`);

/**
 * Query to get the about page
 * @returns The about page data or null
 */
export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage"][0] {
  _id,
  _type,
  title,
  slug,
  metadata {
    title,
    description,
    keywords,
    openGraph {
      title,
      description,
      type,
      url,
      siteName,
      image {
        url,
        width,
        height,
        alt
      }
    }
  },
  sections[] {
    _type,
    _key,
    title,
    displayTitle,
    subtitle,
    description,
    background,
    showBorder,
    
    // Include all possible section fields
    ...,
  }
}`);

/**
 * Query to get global data (navigation, footer, site settings)
 * @returns Global data including navigation, footer and site settings
 */
export const GLOBAL_DATA_QUERY = defineQuery(`{
  "navigation": *[_type == "navigation"][0] {
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
      title
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
  "siteSettings": *[_type == "siteSettings"][0] {
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
}`);

/**
 * Query to get all blog posts
 * @returns All blog posts ordered by publishedAt desc
 */
export const BLOG_POSTS_QUERY =
  defineQuery(`*[_type == "post"] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  categories[]->{
    _id,
    title
  },
  author->{
    _id,
    name,
    image
  }
}`);

/**
 * Query to get a single blog post by slug
 * @returns The blog post or null
 */
export const BLOG_POST_BY_SLUG_QUERY = (slug: string) =>
  defineQuery(`*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    _type,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    mainImage,
    categories[]->{
      _id,
      title
    },
    author->{
      _id,
      name,
      image,
      bio
    },
    related[]->{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage
    }
  }`);

/**
 * Query to get all categories
 * @returns All categories ordered by title
 */
export const CATEGORIES_QUERY =
  defineQuery(`*[_type == "category"] | order(title asc) {
  _id,
  title,
  description
}`);

/**
 * Query to get posts by category ID
 * @returns Posts that reference the category, ordered by publishedAt desc
 */
export const POSTS_BY_CATEGORY_QUERY = (categoryId: string) =>
  defineQuery(`*[_type == "post" && references("${categoryId}")] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    categories[]->{
      _id,
      title
    },
    author->{
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
