import type { ReactNode } from 'react';
import { getNavigation, getFooter, getMenuFooter } from '@/graphql/pages/settings';
import type { Maybe } from '@/graphql/generated/graphql';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Main } from '@/components/ui/Main';

type GlobalDataProviderProps = {
  children: ReactNode;
};

/**
 * Helper function to transform Maybe types to a defined value
 */
const transformMaybe = <T,>(value: Maybe<T> | undefined, defaultValue: T): T => {
  if (value === undefined || value === null) return defaultValue;
  return value;
};

/**
 * Helper to transform Maybe array
 */
const transformMaybeArray = <T, R>(
  array: Maybe<Maybe<T>[]> | undefined,
  transform: (item: Maybe<T> | undefined) => R
): R[] => {
  if (!array) return [];
  return array.map(item => transform(item));
};

/**
 * Provider component that fetches and manages global data
 */
export const GlobalDataProvider = async ({ children }: GlobalDataProviderProps) => {
  /* Fetch data from Sanity */
  const [navigationData, footerData, menuFooterData] = await Promise.all([
    getNavigation(),
    getFooter(),
    getMenuFooter(),
  ]);

  if (!navigationData || !footerData || !menuFooterData) {
    throw new Error('Failed to fetch required data from Sanity');
  }

  /* Transform data to match component types */
  const navigation = {
    items: transformMaybeArray(navigationData.items, item => ({
      _key: item?._key || '',
      label: transformMaybe(item?.label, ''),
      href: transformMaybe(item?.href, '#'),
    })),
  };

  const menuFooter = {
    about: {
      title: transformMaybe(menuFooterData.about?.title, ''),
      description: transformMaybe(menuFooterData.about?.description, ''),
    },
    social: {
      title: transformMaybe(menuFooterData.social?.title, ''),
    },
    contact: {
      title: transformMaybe(menuFooterData.contact?.title, ''),
      projectEnquiry: {
        label: transformMaybe(menuFooterData.contact?.projectEnquiry?.label, ''),
        href: transformMaybe(menuFooterData.contact?.projectEnquiry?.href, '#'),
        linkText: transformMaybe(menuFooterData.contact?.projectEnquiry?.linkText, ''),
      },
      generalEnquiry: {
        label: transformMaybe(menuFooterData.contact?.generalEnquiry?.label, ''),
        href: transformMaybe(menuFooterData.contact?.generalEnquiry?.href, '#'),
        linkText: transformMaybe(menuFooterData.contact?.generalEnquiry?.linkText, ''),
      },
    },
  };

  const footer = {
    copyright: transformMaybe(footerData.copyright, ''),
    contact: {
      email: transformMaybe(footerData.contact?.email, ''),
      phone: transformMaybe(footerData.contact?.phone, ''),
    },
    socialLinks: transformMaybeArray(footerData.socialLinks, link => ({
      _key: link?._key || '',
      platform: transformMaybe(link?.platform, ''),
      url: transformMaybe(link?.url, '#'),
    })),
  };

  return (
    <>
      <Header navigation={navigation} menuFooter={menuFooter} socialLinks={footer.socialLinks} />
      <Main>{children}</Main>
      <Footer footer={footer} />
    </>
  );
}; 