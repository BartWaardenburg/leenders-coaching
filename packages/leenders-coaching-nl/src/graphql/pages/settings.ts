import { graphql } from '../generated';
import type {
  RootQuery,
  SiteSettings,
  Navigation,
  Footer,
  MenuFooter,
} from '../generated/graphql';
import { graphqlClient } from '../client';

type SiteSettingsResponse = Pick<RootQuery, 'allSiteSettings'>;
type NavigationResponse = Pick<RootQuery, 'allNavigation'>;
type FooterResponse = Pick<RootQuery, 'allFooter'>;
type MenuFooterResponse = Pick<RootQuery, 'allMenuFooter'>;

export const SiteSettingsDocument = graphql(`
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

export const NavigationDocument = graphql(`
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

export const FooterDocument = graphql(`
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

export const MenuFooterDocument = graphql(`
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

/**
 * Fetches site settings including default metadata
 * @returns Promise containing site settings data
 */
export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const data =
    await graphqlClient.request<SiteSettingsResponse>(SiteSettingsDocument);

  return data.allSiteSettings[0] ?? null;
};

/**
 * Fetches navigation data using GraphQL
 * @returns Promise containing navigation data
 */
export const getNavigation = async (): Promise<Navigation | null> => {
  const data =
    await graphqlClient.request<NavigationResponse>(NavigationDocument);

  return data.allNavigation[0] ?? null;
};

/**
 * Fetches footer data using GraphQL
 * @returns Promise containing footer data
 */
export const getFooter = async (): Promise<Footer | null> => {
  const data = await graphqlClient.request<FooterResponse>(FooterDocument);

  return data.allFooter[0] ?? null;
};

/**
 * Fetches menu footer data using GraphQL
 * @returns Promise containing menu footer data
 */
export const getMenuFooter = async (): Promise<MenuFooter | null> => {
  const data =
    await graphqlClient.request<MenuFooterResponse>(MenuFooterDocument);

  return data.allMenuFooter[0] ?? null;
};
