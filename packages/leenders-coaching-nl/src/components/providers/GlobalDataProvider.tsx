import type { ReactNode } from 'react';
import type { GetGlobalDataQuery } from '@/generated/graphql';
import { sanityClient } from '@/utilities/sanity';
import { transformNullable, transformNullableArray } from '@/utilities/transform';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Main } from '@/components/ui/Main';
import GetGlobalData from '@/graphql/queries/getGlobalData.gql';

type GlobalDataProviderProps = {
  children: ReactNode;
};

/**
 * Provider component that fetches and manages global data
 */
export const GlobalDataProvider = async ({ children }: GlobalDataProviderProps) => {
  /* Fetch data from Sanity */
  const { allNavigation: [navigation] = [], allFooter: [footer] = [], allMenuFooter: [menuFooter] = [] } =
    await sanityClient.request<GetGlobalDataQuery>(GetGlobalData);

  if (!navigation || !footer || !menuFooter) {
    throw new Error('Failed to fetch required data from Sanity');
  }

  /* Transform data to match component types */
  const navigationData = {
    items: transformNullableArray(navigation.items, item => ({
      _key: transformNullable(item?._key, ''),
      label: transformNullable(item?.label, ''),
      href: transformNullable(item?.href, '#'),
    })),
  };

  const menuFooterData = {
    about: {
      title: transformNullable(menuFooter.about?.title, ''),
      description: transformNullable(menuFooter.about?.description, ''),
    },
    social: {
      title: transformNullable(menuFooter.social?.title, ''),
    },
    contact: {
      title: transformNullable(menuFooter.contact?.title, ''),
      projectEnquiry: {
        label: transformNullable(menuFooter.contact?.projectEnquiry?.label, ''),
        href: transformNullable(menuFooter.contact?.projectEnquiry?.href, '#'),
        linkText: transformNullable(menuFooter.contact?.projectEnquiry?.linkText, ''),
      },
      generalEnquiry: {
        label: transformNullable(menuFooter.contact?.generalEnquiry?.label, ''),
        href: transformNullable(menuFooter.contact?.generalEnquiry?.href, '#'),
        linkText: transformNullable(menuFooter.contact?.generalEnquiry?.linkText, ''),
      },
    },
  };

  const footerData = {
    copyright: transformNullable(footer.copyright, ''),
    contact: {
      email: transformNullable(footer.contact?.email, ''),
      phone: transformNullable(footer.contact?.phone, ''),
    },
    socialLinks: transformNullableArray(footer.socialLinks, link => ({
      _key: transformNullable(link?._key, ''),
      platform: transformNullable(link?.platform, ''),
      url: transformNullable(link?.url, '#'),
    })),
  };

  return (
    <>
      <Header navigation={navigationData} menuFooter={menuFooterData} socialLinks={footerData.socialLinks} />
      <Main>{children}</Main>
      <Footer footer={footerData} />
    </>
  );
}; 