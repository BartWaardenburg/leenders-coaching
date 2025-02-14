import { graphql } from '../generated';
import type { RootQuery, Post } from '../generated/graphql';
import { graphqlClient } from '../client';

type AllPostsResponse = Pick<RootQuery, 'allPost'>;

export const AllPostsDocument = graphql(`
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

export const PostBySlugDocument = graphql(`
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

/**
 * Fetches all blog posts using GraphQL
 * @returns Promise containing array of posts
 */
export const getAllPosts = async (): Promise<Post[]> => {
  const data = await graphqlClient.request<AllPostsResponse>(AllPostsDocument);

  await graphqlClient.request<AllPostsResponse>(AllPostsDocument);
  return data.allPost;
};

/**
 * Fetches a single blog post by its slug using GraphQL
 * @param slug - The slug of the post to fetch
 * @returns Promise containing the post or null if not found
 */
export const getPost = async (slug: string): Promise<Post | null> => {
  const data = await graphqlClient.request<
    AllPostsResponse,
    { current: string }
  >(PostBySlugDocument, { current: slug });
  return data.allPost[0] ?? null;
};
