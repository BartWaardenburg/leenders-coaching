import type { ReactNode } from 'react';
import { ClientConfigProvider } from './ClientConfigProvider';

export type ConfigType = {
  accessibility: {
    closeButtons: {
      toast: string;
      modal: string;
    };
    calendar: {
      previousMonth: string;
      nextMonth: string;
    };
  };
  interface: {
    mobileMenu: {
      toggleButton: string;
      menuLabel: string;
      closeButton: string;
    };
    themeToggle: {
      label: string;
    };
    buttons: {
      loadMore: string;
      readMore: string;
      submit: string;
      close: string;
    };
  };
  blog: {
    labels: {
      featured: string;
      readArticle: string;
    };
    paths: {
      blog: string;
    };
  };
  forms: {
    messages: {
      required: string;
      invalid: string;
      success: string;
      error: string;
    };
  };
};

export const defaultConfig: ConfigType = {
  accessibility: {
    closeButtons: {
      toast: 'Sluit melding',
      modal: 'Sluit venster',
    },
    calendar: {
      previousMonth: 'Vorige maand',
      nextMonth: 'Volgende maand',
    },
  },
  interface: {
    mobileMenu: {
      toggleButton: 'Menu openen/sluiten',
      menuLabel: 'Hoofdmenu',
      closeButton: 'Menu sluiten',
    },
    themeToggle: {
      label: 'Thema aanpassen',
    },
    buttons: {
      loadMore: 'Meer laden',
      readMore: 'Lees meer',
      submit: 'Versturen',
      close: 'Sluiten',
    },
  },
  blog: {
    labels: {
      featured: 'Uitgelicht',
      readArticle: 'Lees artikel',
    },
    paths: {
      blog: '/blog',
    },
  },
  forms: {
    messages: {
      required: 'Dit veld is verplicht',
      invalid: 'Ongeldig formaat',
      success: 'Formulier succesvol verzonden',
      error: 'Er is een fout opgetreden',
    },
  },
};


type ConfigProviderProps = {
  children: ReactNode;
  config: ConfigType;
};

/**
 * Server component that provides configuration data to the application
 */
export const ConfigProvider = ({ children, config }: ConfigProviderProps) => {
  return <ClientConfigProvider config={config}>{children}</ClientConfigProvider>;
}; 