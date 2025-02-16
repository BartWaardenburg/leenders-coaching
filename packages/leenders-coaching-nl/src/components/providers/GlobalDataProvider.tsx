import type { ReactNode } from 'react';
import type { GetGlobalDataQuery } from '@/generated/graphql';
import type { ConfigType } from './ConfigProvider';

import { sanityClient } from '@/utilities/sanity';
import { transformNullable, transformNullableArray } from '@/utilities/transform';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Main } from '@/components/ui/Main';
import GetGlobalData from '@/graphql/queries/getGlobalData.gql';
import { ConfigProvider, defaultConfig } from './ConfigProvider';

type GlobalDataProviderProps = {
  children: ReactNode;
};

/**
 * Provider component that fetches and manages global data
 */
export const GlobalDataProvider = async ({ children }: GlobalDataProviderProps) => {
  /* Fetch data from Sanity */
  const {
    allNavigation: [navigation] = [],
    allFooter: [footer] = [],
    allMenuFooter: [menuFooter] = [],
    allConfiguration: [configuration] = [],
  } = await sanityClient.request<GetGlobalDataQuery>(GetGlobalData);

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

  /* Transform configuration data */
  const configData: ConfigType = {
    accessibility: {
      closeButtons: {
        toast: transformNullable(configuration?.accessibility?.closeButtons?.toast, defaultConfig.accessibility.closeButtons.toast),
        modal: transformNullable(configuration?.accessibility?.closeButtons?.modal, defaultConfig.accessibility.closeButtons.modal),
      },
      calendar: {
        previousMonth: transformNullable(configuration?.accessibility?.calendar?.previousMonth, defaultConfig.accessibility.calendar.previousMonth),
        nextMonth: transformNullable(configuration?.accessibility?.calendar?.nextMonth, defaultConfig.accessibility.calendar.nextMonth),
      },
    },
    interface: {
      mobileMenu: {
        toggleButton: transformNullable(configuration?.interface?.mobileMenu?.toggleButton, defaultConfig.interface.mobileMenu.toggleButton),
        menuLabel: transformNullable(configuration?.interface?.mobileMenu?.menuLabel, defaultConfig.interface.mobileMenu.menuLabel),
        closeButton: transformNullable(configuration?.interface?.mobileMenu?.closeButton, defaultConfig.interface.mobileMenu.closeButton),
      },
      themeToggle: {
        label: transformNullable(configuration?.interface?.themeToggle?.label, defaultConfig.interface.themeToggle.label),
      },
      buttons: {
        loadMore: transformNullable(configuration?.interface?.buttons?.loadMore, defaultConfig.interface.buttons.loadMore),
        readMore: transformNullable(configuration?.interface?.buttons?.readMore, defaultConfig.interface.buttons.readMore),
        submit: transformNullable(configuration?.interface?.buttons?.submit, defaultConfig.interface.buttons.submit),
        close: transformNullable(configuration?.interface?.buttons?.close, defaultConfig.interface.buttons.close),
      },
    },
    blog: {
      labels: {
        featured: transformNullable(configuration?.blog?.labels?.featured, defaultConfig.blog.labels.featured),
        readArticle: transformNullable(configuration?.blog?.labels?.readArticle, defaultConfig.blog.labels.readArticle),
      },
      paths: {
        blog: transformNullable(configuration?.blog?.paths?.blog, defaultConfig.blog.paths.blog),
      },
    },
    forms: {
      messages: {
        required: transformNullable(configuration?.forms?.messages?.required, defaultConfig.forms.messages.required),
        invalid: transformNullable(configuration?.forms?.messages?.invalid, defaultConfig.forms.messages.invalid),
        success: transformNullable(configuration?.forms?.messages?.success, defaultConfig.forms.messages.success),
        error: transformNullable(configuration?.forms?.messages?.error, defaultConfig.forms.messages.error),
      },
    },
  };

  return (
    <ConfigProvider config={configData}>
      <Header navigation={navigationData} menuFooter={menuFooterData} socialLinks={footerData.socialLinks} />
      <Main>{children}</Main>
      <Footer footer={footerData} />
    </ConfigProvider>
  );
}; 