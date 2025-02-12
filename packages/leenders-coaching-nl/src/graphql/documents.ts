import { gql } from './generated';

/* Query to fetch site settings */
export const SiteSettingsDocument = gql(`
  query SiteSettings {
    allSiteSettings {
      title
      description
      keywords
      defaultMetaImage {
        asset {
          url
          altText
        }
      }
    }
  }
`);

/* Query to fetch all posts */
export const AllPostsDocument = gql(`
  query AllPosts {
    allPost {
      _id
      title
      description
      slug {
        current
      }
      image {
        asset {
          url
          metadata {
            dimensions {
              width
              height
            }
          }
        }
      }
      publishedAt
      categories
      featured
      variant
    }
  }
`);

/* Query to fetch a single post by slug */
export const PostBySlugDocument = gql(`
  query PostBySlug($current: String!) {
    allPost(where: { slug: { current: { eq: $current } } }) {
      _id
      title
      description
      slug {
        current
      }
      image {
        asset {
          url
          metadata {
            dimensions {
              width
              height
            }
          }
        }
      }
      contentRaw
      publishedAt
      categories
      featured
      variant
      metadata {
        title
        description
        keywords
        image {
          asset {
            url
            altText
          }
        }
      }
    }
  }
`);

/* Query to fetch navigation */
export const NavigationDocument = gql(`
  query Navigation {
    allNavigation {
      _id
      items {
        _key
        label
        href
      }
    }
  }
`);

/* Query to fetch footer */
export const FooterDocument = gql(`
  query Footer {
    allFooter {
      _id
      copyright
      contact {
        email
        phone
      }
      socialLinks {
        _key
        platform
        url
      }
    }
  }
`);

/* Query to fetch menu footer */
export const MenuFooterDocument = gql(`
  query MenuFooter {
    allMenuFooter {
      _id
      about {
        title
        description
      }
      social {
        title
      }
      contact {
        title
        projectEnquiry {
          label
          href
          linkText
        }
        generalEnquiry {
          label
          href
          linkText
        }
      }
    }
  }
`);

/* Query to fetch about page */
export const AboutPageDocument = gql(`
  query AboutPage {
    allAboutPage {
      _id
      title
      sections {
        ... on SectionBlog {
          _key
          _type
        }
        ... on SectionCalendar {
          _key
          _type
        }
        ... on SectionCards {
          _key
          _type
          title
          displayTitle
          description
          cards {
            _key
            title
            description
            image {
              asset {
                url
              }
            }
          }
        }
        ... on SectionContent {
          _key
          _type
          title
          displayTitle
          contentRaw
        }
        ... on SectionFAQ {
          _key
          _type
        }
        ... on SectionFeatured {
          _key
          _type
        }
        ... on SectionForm {
          _key
          _type
        }
        ... on SectionHeader {
          _key
          _type
          title
          displayTitle
          description
          image {
            asset {
              url
            }
          }
        }
        ... on SectionPricing {
          _key
          _type
        }
        ... on SectionTestimonial {
          _key
          _type
        }
        ... on SectionTimeline {
          _key
          _type
        }
      }
      metadata {
        title
        description
        keywords
        image {
          asset {
            url
            altText
          }
        }
      }
    }
  }
`);
