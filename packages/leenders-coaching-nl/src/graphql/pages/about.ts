import { graphql } from '../generated';
import { type AboutPageQuery } from '../generated/graphql';

export const AboutPageDocument = graphql(`
  query AboutPage {
    allAboutPage {
      _id
      title
      sections {
        __typename
        ... on SectionBlog {
          _key
          _type
          title
          displayTitle
          subtitle
          background
          maxWidth
          showBorder
          postsToShow
          showFeaturedOnly
          sortOrder
        }
        ... on SectionCalendar {
          _key
          _type
          title
          displayTitle
          subtitle
          background
          maxWidth
          showBorder
          description
          settings {
            availableDays
            excludedDates
            availableTimeSlots {
              _key
              startTime
              endTime
            }
          }
        }
        ... on SectionCards {
          _key
          _type
          title
          displayTitle
          subtitle
          background
          maxWidth
          showBorder
          cards {
            _key
            title
            description
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
            link {
              text
              url
            }
          }
        }
        ... on SectionContent {
          _key
          _type
          title
          displayTitle
          contentRaw
          background
          maxWidth
          showBorder
        }
        ... on SectionFAQ {
          _key
          _type
          title
          displayTitle
          subtitle
          background
          maxWidth
          showBorder
          questions {
            _key
            question
            answer
          }
        }
        ... on SectionFeatured {
          _key
          _type
          title
          displayTitle
          subtitle
          background
          maxWidth
          showBorder
          items {
            _key
            title
            description
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
          }
        }
        ... on SectionForm {
          _key
          _type
          title
          displayTitle
          subtitle
          background
          maxWidth
          showBorder
          form {
            submitLabel
            successMessage
            errorMessage
          }
        }
        ... on SectionHeader {
          _key
          _type
          title
          displayTitle
          subtitle
          background
          maxWidth
          showBorder
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
          cta {
            text
            link
            variant
          }
        }
        ... on SectionPricing {
          _key
          _type
          title
          displayTitle
          subtitle
          background
          maxWidth
          showBorder
          pricingCards {
            _key
            title
            price
            description
            features
            isPopular
            variant
            cta {
              text
              link
              variant
            }
          }
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

export type AboutPageResponse = AboutPageQuery;
