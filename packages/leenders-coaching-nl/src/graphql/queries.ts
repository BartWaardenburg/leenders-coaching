import { gql } from "./generated/gql";
import { graphqlClient } from "./client";
import type {
  AllPostsQuery as AllPostsQueryType,
  PostBySlugQuery as PostBySlugQueryType,
} from "./generated/types";

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

/**
 * Fetches all blog posts using GraphQL
 * @returns Promise containing array of posts
 */
export const getAllPosts = async () => {
  const { allPost } = await graphqlClient.request<{
    allPost: AllPostsQueryType["allPost"];
  }>(AllPostsQuery);
  return allPost;
};

/**
 * Fetches a single blog post by its slug using GraphQL
 * @param slug - The slug of the post to fetch
 * @returns Promise containing the post or null if not found
 */
export const getPost = async (slug: string) => {
  const { allPost } = await graphqlClient.request<{
    allPost: PostBySlugQueryType["allPost"];
  }>(PostBySlugQuery, { slug });
  return allPost[0] ?? null;
};
