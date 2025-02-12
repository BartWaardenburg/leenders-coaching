/* This file contains GraphQL query functions using generated types */
import { graphqlClient } from './client';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  SiteSettingsDocument,
  AllPostsDocument,
  PostBySlugDocument,
  NavigationDocument,
  FooterDocument,
  MenuFooterDocument,
  AboutPageDocument,
} from './documents';
import type {
  SiteSettings,
  Post,
  Navigation,
  Footer,
  MenuFooter,
  RootQuery,
  AboutPage,
} from './generated/graphql';

type SiteSettingsResponse = Pick<RootQuery, 'allSiteSettings'>;
type AllPostsResponse = Pick<RootQuery, 'allPost'>;
type NavigationResponse = Pick<RootQuery, 'allNavigation'>;
type FooterResponse = Pick<RootQuery, 'allFooter'>;
type MenuFooterResponse = Pick<RootQuery, 'allMenuFooter'>;
type AboutPageResponse = Pick<RootQuery, 'allAboutPage'>;

/**
 * Fetches site settings including default metadata
 * @returns Promise containing site settings data
 */
export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const data = await graphqlClient.request<SiteSettingsResponse>(
    SiteSettingsDocument as TypedDocumentNode<SiteSettingsResponse>,
  );
  return data.allSiteSettings[0] ?? null;
};

/**
 * Fetches all blog posts using GraphQL
 * @returns Promise containing array of posts
 */
export const getAllPosts = async (): Promise<Post[]> => {
  const data = await graphqlClient.request<AllPostsResponse>(
    AllPostsDocument as TypedDocumentNode<AllPostsResponse>,
  );
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
  >(
    PostBySlugDocument as TypedDocumentNode<
      AllPostsResponse,
      { current: string }
    >,
    { current: slug },
  );
  return data.allPost[0] ?? null;
};

/**
 * Fetches navigation data using GraphQL
 * @returns Promise containing navigation data
 */
export const getNavigation = async (): Promise<Navigation | null> => {
  const data = await graphqlClient.request<NavigationResponse>(
    NavigationDocument as TypedDocumentNode<NavigationResponse>,
  );
  return data.allNavigation[0] ?? null;
};

/**
 * Fetches footer data using GraphQL
 * @returns Promise containing footer data
 */
export const getFooter = async (): Promise<Footer | null> => {
  const data = await graphqlClient.request<FooterResponse>(
    FooterDocument as TypedDocumentNode<FooterResponse>,
  );
  return data.allFooter[0] ?? null;
};

/**
 * Fetches menu footer data using GraphQL
 * @returns Promise containing menu footer data
 */
export const getMenuFooter = async (): Promise<MenuFooter | null> => {
  const data = await graphqlClient.request<MenuFooterResponse>(
    MenuFooterDocument as TypedDocumentNode<MenuFooterResponse>,
  );
  return data.allMenuFooter[0] ?? null;
};

/**
 * Fetches about page data using GraphQL
 * @returns Promise containing about page data
 */
export const getAboutPage = async (): Promise<AboutPage | null> => {
  const data = await graphqlClient.request<AboutPageResponse>(
    AboutPageDocument as TypedDocumentNode<AboutPageResponse>,
  );
  return data.allAboutPage[0] ?? null;
};
