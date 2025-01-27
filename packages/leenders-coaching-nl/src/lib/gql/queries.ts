import { gql } from "./generated/gql";

export const AllPostsQuery = gql(`#graphql
  query AllPosts {
    allPost(sort: [{ publishedAt: DESC }]) {
      _id
      title
      slug {
        current
      }
      publishedAt
      image {
        asset {
          url
        }
      }
      bodyRaw
    }
  }
`);

export const PostBySlugQuery = gql(`#graphql
  query PostBySlug($slug: String!) {
    allPost(where: { slug: { current: { eq: $slug } } }) {
      _id
      title
      slug {
        current
      }
      publishedAt
      image {
        asset {
          url
        }
      }
      bodyRaw
    }
  }
`);
