import type { ReactNode } from 'react';
import type { ConfigType } from './ConfigProvider';
import type { SocialLink } from '@/components/ui/Header/Header';

import { groq } from '@/utilities/sanity';
import { GLOBAL_DATA_QUERY } from '@/groq/queries';
import { transformNullable, transformNullableArray } from '@/utilities/transform';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Main } from '@/components/ui/Main';
import { ConfigProvider, defaultConfig } from './ConfigProvider';
import type { GLOBAL_DATA_QUERYResult } from '@/types/sanity/groq';

type GlobalDataProviderProps = {
  children: ReactNode;
};

/* Default data */
const defaultHeader = {
  navigation: [],
  about: {
    title: 'Over ons',
    description: 'Welkom bij Leenders Coaching',
  },
  social: {
    title: 'Social media',
    links: [{
      _key: 'social-link-1',
      platform: 'Facebook',
      url: 'https://www.facebook.com/leenders-coaching-nl',
    }, {
      _key: 'social-link-2',
      platform: 'Instagram',
      url: 'https://www.instagram.com/leenders_coaching',
    }] as SocialLink[],
  },
  contact: {
    title: 'Contact',
    projectEnquiry: {
      label: 'Project aanvraag',
      href: '/contact',
      linkText: 'Neem contact op',
    },
    generalEnquiry: {
      label: 'Algemene vragen',
      href: '/contact',
      linkText: 'Contact',
    },
  },
};

const defaultFooter = {
  copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
  contact: {
    email: 'info@leenders-coaching.nl',
    phone: null,
  },
  socialLinks: [],
};

/**
 * Provider component that fetches and manages global data
 */
export const GlobalDataProvider = async ({ children }: GlobalDataProviderProps) => {
  /* Fetch data from Sanity using GROQ */
  const globalData = await groq<GLOBAL_DATA_QUERYResult>(GLOBAL_DATA_QUERY);

  if (!globalData?.navigation || !globalData?.footer) {
    throw new Error('Failed to fetch required data from Sanity');
  }

  const header = globalData.navigation;
  const footer = globalData.footer;
  const configuration = globalData.siteSettings;

  /* Transform data to match component types */
  const headerData = {
    navigation: transformNullableArray(header.navigation, (item) => ({
      _key: transformNullable(item?._key, ''),
      label: transformNullable(item?.label, ''),
      href: transformNullable(item?.href, '#'),
    })) || defaultHeader.navigation,
    about: {
      title: transformNullable(header.about?.title, defaultHeader.about.title),
      description: transformNullable(header.about?.description, defaultHeader.about.description),
    },
    social: {
      title: transformNullable(header.social?.title, defaultHeader.social.title),
      links: transformNullableArray(header.social?.links, (link) => ({
        _key: transformNullable(link?._key, ''),
        platform: transformNullable(link?.platform, ''),
        url: transformNullable(link?.url, '#'),
      })) || defaultHeader.social.links,
    },
    contact: {
      title: transformNullable(header.contact?.title, defaultHeader.contact.title),
      projectEnquiry: {
        label: transformNullable(header.contact?.projectEnquiry?.label, defaultHeader.contact.projectEnquiry.label),
        href: transformNullable(header.contact?.projectEnquiry?.href, defaultHeader.contact.projectEnquiry.href),
        linkText: transformNullable(header.contact?.projectEnquiry?.linkText, defaultHeader.contact.projectEnquiry.linkText),
      },
      generalEnquiry: {
        label: transformNullable(header.contact?.generalEnquiry?.label, defaultHeader.contact.generalEnquiry.label),
        href: transformNullable(header.contact?.generalEnquiry?.href, defaultHeader.contact.generalEnquiry.href),
        linkText: transformNullable(header.contact?.generalEnquiry?.linkText, defaultHeader.contact.generalEnquiry.linkText),
      },
    },
  };

  const footerData = {
    copyright: transformNullable(footer.copyright, defaultFooter.copyright),
    contact: {
      email: transformNullable(footer.contact?.email, defaultFooter.contact.email),
      phone: transformNullable(footer.contact?.phone, defaultFooter.contact.phone),
    },
    socialLinks: transformNullableArray(footer.socialLinks, (link) => ({
      _key: transformNullable(link?._key, ''),
      platform: transformNullable(link?.platform, ''),
      url: transformNullable(link?.url, '#'),
    })) || defaultFooter.socialLinks,
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
      <Header {...headerData} />
      <Main>{children}</Main>
      <Footer {...footerData} />
    </ConfigProvider>
  );
}; 