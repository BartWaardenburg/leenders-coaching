/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query SiteSettings {\n    allSiteSettings {\n      title\n      description\n      keywords\n      defaultMetaImage {\n        asset {\n          url\n          altText\n        }\n      }\n    }\n  }\n": types.SiteSettingsDocument,
    "\n  query AllPosts {\n    allPost {\n      _id\n      title\n      description\n      slug {\n        current\n      }\n      image {\n        asset {\n          url\n          metadata {\n            dimensions {\n              width\n              height\n            }\n          }\n        }\n      }\n      publishedAt\n      categories\n      featured\n      variant\n    }\n  }\n": types.AllPostsDocument,
    "\n  query PostBySlug($current: String!) {\n    allPost(where: { slug: { current: { eq: $current } } }) {\n      _id\n      title\n      description\n      slug {\n        current\n      }\n      image {\n        asset {\n          url\n          metadata {\n            dimensions {\n              width\n              height\n            }\n          }\n        }\n      }\n      contentRaw\n      publishedAt\n      categories\n      featured\n      variant\n      metadata {\n        title\n        description\n        keywords\n        image {\n          asset {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n": types.PostBySlugDocument,
    "\n  query Navigation {\n    allNavigation {\n      _id\n      items {\n        _key\n        label\n        href\n      }\n    }\n  }\n": types.NavigationDocument,
    "\n  query Footer {\n    allFooter {\n      _id\n      copyright\n      contact {\n        email\n        phone\n      }\n      socialLinks {\n        _key\n        platform\n        url\n      }\n    }\n  }\n": types.FooterDocument,
    "\n  query MenuFooter {\n    allMenuFooter {\n      _id\n      about {\n        title\n        description\n      }\n      social {\n        title\n      }\n      contact {\n        title\n        projectEnquiry {\n          label\n          href\n          linkText\n        }\n        generalEnquiry {\n          label\n          href\n          linkText\n        }\n      }\n    }\n  }\n": types.MenuFooterDocument,
    "\n  query AboutPage {\n    allAboutPage {\n      _id\n      title\n      sections {\n        ... on SectionBlog {\n          _key\n          _type\n        }\n        ... on SectionCalendar {\n          _key\n          _type\n        }\n        ... on SectionCards {\n          _key\n          _type\n          title\n          displayTitle\n          description\n          cards {\n            _key\n            title\n            description\n            image {\n              asset {\n                url\n              }\n            }\n          }\n        }\n        ... on SectionContent {\n          _key\n          _type\n          title\n          displayTitle\n          contentRaw\n        }\n        ... on SectionFAQ {\n          _key\n          _type\n        }\n        ... on SectionFeatured {\n          _key\n          _type\n        }\n        ... on SectionForm {\n          _key\n          _type\n        }\n        ... on SectionHeader {\n          _key\n          _type\n          title\n          displayTitle\n          description\n          image {\n            asset {\n              url\n            }\n          }\n        }\n        ... on SectionPricing {\n          _key\n          _type\n        }\n        ... on SectionTestimonial {\n          _key\n          _type\n        }\n        ... on SectionTimeline {\n          _key\n          _type\n        }\n      }\n      metadata {\n        title\n        description\n        keywords\n        image {\n          asset {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n": types.AboutPageDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SiteSettings {\n    allSiteSettings {\n      title\n      description\n      keywords\n      defaultMetaImage {\n        asset {\n          url\n          altText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SiteSettings {\n    allSiteSettings {\n      title\n      description\n      keywords\n      defaultMetaImage {\n        asset {\n          url\n          altText\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllPosts {\n    allPost {\n      _id\n      title\n      description\n      slug {\n        current\n      }\n      image {\n        asset {\n          url\n          metadata {\n            dimensions {\n              width\n              height\n            }\n          }\n        }\n      }\n      publishedAt\n      categories\n      featured\n      variant\n    }\n  }\n"): (typeof documents)["\n  query AllPosts {\n    allPost {\n      _id\n      title\n      description\n      slug {\n        current\n      }\n      image {\n        asset {\n          url\n          metadata {\n            dimensions {\n              width\n              height\n            }\n          }\n        }\n      }\n      publishedAt\n      categories\n      featured\n      variant\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PostBySlug($current: String!) {\n    allPost(where: { slug: { current: { eq: $current } } }) {\n      _id\n      title\n      description\n      slug {\n        current\n      }\n      image {\n        asset {\n          url\n          metadata {\n            dimensions {\n              width\n              height\n            }\n          }\n        }\n      }\n      contentRaw\n      publishedAt\n      categories\n      featured\n      variant\n      metadata {\n        title\n        description\n        keywords\n        image {\n          asset {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PostBySlug($current: String!) {\n    allPost(where: { slug: { current: { eq: $current } } }) {\n      _id\n      title\n      description\n      slug {\n        current\n      }\n      image {\n        asset {\n          url\n          metadata {\n            dimensions {\n              width\n              height\n            }\n          }\n        }\n      }\n      contentRaw\n      publishedAt\n      categories\n      featured\n      variant\n      metadata {\n        title\n        description\n        keywords\n        image {\n          asset {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Navigation {\n    allNavigation {\n      _id\n      items {\n        _key\n        label\n        href\n      }\n    }\n  }\n"): (typeof documents)["\n  query Navigation {\n    allNavigation {\n      _id\n      items {\n        _key\n        label\n        href\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Footer {\n    allFooter {\n      _id\n      copyright\n      contact {\n        email\n        phone\n      }\n      socialLinks {\n        _key\n        platform\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query Footer {\n    allFooter {\n      _id\n      copyright\n      contact {\n        email\n        phone\n      }\n      socialLinks {\n        _key\n        platform\n        url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MenuFooter {\n    allMenuFooter {\n      _id\n      about {\n        title\n        description\n      }\n      social {\n        title\n      }\n      contact {\n        title\n        projectEnquiry {\n          label\n          href\n          linkText\n        }\n        generalEnquiry {\n          label\n          href\n          linkText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MenuFooter {\n    allMenuFooter {\n      _id\n      about {\n        title\n        description\n      }\n      social {\n        title\n      }\n      contact {\n        title\n        projectEnquiry {\n          label\n          href\n          linkText\n        }\n        generalEnquiry {\n          label\n          href\n          linkText\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AboutPage {\n    allAboutPage {\n      _id\n      title\n      sections {\n        ... on SectionBlog {\n          _key\n          _type\n        }\n        ... on SectionCalendar {\n          _key\n          _type\n        }\n        ... on SectionCards {\n          _key\n          _type\n          title\n          displayTitle\n          description\n          cards {\n            _key\n            title\n            description\n            image {\n              asset {\n                url\n              }\n            }\n          }\n        }\n        ... on SectionContent {\n          _key\n          _type\n          title\n          displayTitle\n          contentRaw\n        }\n        ... on SectionFAQ {\n          _key\n          _type\n        }\n        ... on SectionFeatured {\n          _key\n          _type\n        }\n        ... on SectionForm {\n          _key\n          _type\n        }\n        ... on SectionHeader {\n          _key\n          _type\n          title\n          displayTitle\n          description\n          image {\n            asset {\n              url\n            }\n          }\n        }\n        ... on SectionPricing {\n          _key\n          _type\n        }\n        ... on SectionTestimonial {\n          _key\n          _type\n        }\n        ... on SectionTimeline {\n          _key\n          _type\n        }\n      }\n      metadata {\n        title\n        description\n        keywords\n        image {\n          asset {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AboutPage {\n    allAboutPage {\n      _id\n      title\n      sections {\n        ... on SectionBlog {\n          _key\n          _type\n        }\n        ... on SectionCalendar {\n          _key\n          _type\n        }\n        ... on SectionCards {\n          _key\n          _type\n          title\n          displayTitle\n          description\n          cards {\n            _key\n            title\n            description\n            image {\n              asset {\n                url\n              }\n            }\n          }\n        }\n        ... on SectionContent {\n          _key\n          _type\n          title\n          displayTitle\n          contentRaw\n        }\n        ... on SectionFAQ {\n          _key\n          _type\n        }\n        ... on SectionFeatured {\n          _key\n          _type\n        }\n        ... on SectionForm {\n          _key\n          _type\n        }\n        ... on SectionHeader {\n          _key\n          _type\n          title\n          displayTitle\n          description\n          image {\n            asset {\n              url\n            }\n          }\n        }\n        ... on SectionPricing {\n          _key\n          _type\n        }\n        ... on SectionTestimonial {\n          _key\n          _type\n        }\n        ... on SectionTimeline {\n          _key\n          _type\n        }\n      }\n      metadata {\n        title\n        description\n        keywords\n        image {\n          asset {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;