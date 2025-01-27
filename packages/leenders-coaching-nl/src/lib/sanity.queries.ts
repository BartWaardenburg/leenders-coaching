import type { PortableTextBlock } from "@portabletext/types";
import { groq } from "next-sanity";

import { client } from "./sanity.client";

/** Blog post type returned from Sanity */
export type Post = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  imageUrl?: string;
  /* Portable Text blocks for rich text content */
  body: PortableTextBlock[];
  author?: {
    name: string;
    image?: string;
    bio?: string;
  };
};

const postFields = groq`
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url,
  publishedAt,
  body,
  "author": author->{
    name,
    "image": image.asset->url,
    bio
  }
`;

/**
 * Fetches all blog posts from Sanity CMS
 * @returns Promise containing array of posts
 */
export const getAllPosts = () =>
  client.fetch<Post[]>(
    groq`*[_type == "post"] | order(publishedAt desc) {
      ${postFields}
    }`,
  );

/**
 * Fetches a single blog post by its slug
 * @param slug - The slug of the post to fetch
 * @returns Promise containing the post or null if not found
 */
export const getPost = (slug: string) =>
  client.fetch<Post>(
    groq`*[_type == "post" && slug.current == $slug][0] {
      ${postFields}
    }`,
    { slug },
  );
