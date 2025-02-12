import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Box } from '@/components/ui/Box';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import { Main } from '@/components/ui/Main';
import { getNavigation } from '@/graphql/queries';
import { getFooter } from '@/graphql/queries';
import { getMenuFooter } from '@/graphql/queries';
import type { Maybe } from '@/graphql/generated/graphql';

import '@/app/globals.css';

type RootLayoutProps = {
  children: ReactNode;
  fonts: {
    variables: string[];
  };
};

/* Helper to transform Maybe types */
const transformMaybe = <T,>(value: Maybe<T> | undefined, defaultValue: T): T | null => {
  if (value === undefined) return null;
  return value ?? null;
};

/* Helper to transform Maybe array */
const transformMaybeArray = <T, R>(
  array: Maybe<Maybe<T>[]> | undefined,
  transform: (item: Maybe<T> | undefined) => R
): R[] => {
  if (!array) return [];
  return array.map(item => transform(item));
};

/**
 * Root layout component with theme support, navigation, and footer
 */
export const RootLayout = async ({ children, fonts }: RootLayoutProps) => {
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
    <Box
      as="html"
      lang="nl"
      className={fonts.variables.join(' ')}
      suppressHydrationWarning
    >
      <Box as="body" className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header navigation={navigation} menuFooter={menuFooter} socialLinks={footer.socialLinks} />
          <Main>{children}</Main>
          <Footer footer={footer} />
          <Analytics />
        </ThemeProvider>
      </Box>
    </Box>
  );
};
