/**
 * Mock data for configuration and provider components
 * Contains Dutch content for realistic testing scenarios
 */

import type { ConfigType } from '@/components/providers/ConfigProvider/ConfigProvider';

export const mockConfig: ConfigType = {
  accessibility: {
    closeButtons: {
      toast: 'Sluit melding',
      modal: 'Sluiten',
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

export const mockGlobalData = {
  header: {
    logo: {
      _type: 'image',
      asset: {
        _ref: 'image-logo-200x50-png',
        _type: 'reference',
      },
      alt: 'Leenders Coaching Logo',
    },
    navigation: [
      {
        _key: 'nav-1',
        label: 'Home',
        href: '/',
        current: true,
      },
      {
        _key: 'nav-2',
        label: 'Over Mij',
        href: '/over-mij',
        current: false,
      },
      {
        _key: 'nav-3',
        label: 'Coaching',
        href: '/coaching',
        current: false,
      },
      {
        _key: 'nav-4',
        label: 'Aanpak',
        href: '/aanpak',
        current: false,
      },
      {
        _key: 'nav-5',
        label: 'Blog',
        href: '/blog',
        current: false,
      },
      {
        _key: 'nav-6',
        label: 'Contact',
        href: '/contact',
        current: false,
      },
    ],
    cta: {
      label: 'Boek een Sessie',
      href: '/contact',
      variant: 'blue' as const,
    },
  },
  footer: {
    logo: {
      _type: 'image',
      asset: {
        _ref: 'image-logo-200x50-png',
        _type: 'reference',
      },
      alt: 'Leenders Coaching Logo',
    },
    description:
      'Professionele coaching voor persoonlijke en professionele groei. Ontdek je potentieel en bereik je doelen.',
    navigation: [
      {
        _key: 'footer-nav-1',
        label: 'Privacy Beleid',
        href: '/privacy',
      },
      {
        _key: 'footer-nav-2',
        label: 'Algemene Voorwaarden',
        href: '/voorwaarden',
      },
      {
        _key: 'footer-nav-3',
        label: 'Cookie Beleid',
        href: '/cookies',
      },
      {
        _key: 'footer-nav-4',
        label: 'Sitemap',
        href: '/sitemap',
      },
    ],
    social: [
      {
        _key: 'social-1',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/janleenders',
      },
      {
        _key: 'social-2',
        platform: 'Twitter',
        url: 'https://twitter.com/janleenders',
      },
      {
        _key: 'social-3',
        platform: 'Facebook',
        url: 'https://facebook.com/leenderscoaching',
      },
    ],
    contact: {
      email: 'simone@leenders-coaching.nl',
      phone: '+31 6 12345678',
    },
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
  },
  seo: {
    title: 'Leenders Coaching - Professionele Coaching voor Persoonlijke Groei',
    description:
      'Ontdek je potentieel met professionele coaching. Loopbaancoaching, persoonlijke ontwikkeling en teamcoaching in Amsterdam.',
    keywords: [
      'coaching',
      'loopbaancoaching',
      'persoonlijke ontwikkeling',
      'Amsterdam',
      'teamcoaching',
    ],
    ogImage: {
      _type: 'image',
      asset: {
        _ref: 'image-og-1200x630-png',
        _type: 'reference',
      },
      alt: 'Leenders Coaching - Professionele Coaching',
    },
  },
};

export const mockPageData = {
  home: {
    title: 'Welkom bij Leenders Coaching',
    description:
      'Professionele coaching voor persoonlijke en professionele groei',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Bij Leenders Coaching geloven we in de transformerende kracht van professionele coaching. Onze ervaren coaches helpen je om je doelen te bereiken en je volledige potentieel te ontdekken.',
          },
        ],
      },
    ],
    sections: [
      {
        _type: 'sectionHeader',
        title: 'Welkom bij Leenders Coaching',
        displayTitle: 'Ontdek Je Potentieel',
        description:
          'Professionele coaching voor persoonlijke en professionele groei',
        background: 'white',
        border: false,
      },
      {
        _type: 'sectionContent',
        title: 'Over Ons',
        displayTitle: 'Onze Missie',
        description: 'We helpen mensen om hun doelen te bereiken',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Bij Leenders Coaching geloven we in de transformerende kracht van professionele coaching.',
              },
            ],
          },
        ],
        background: 'gray',
        border: true,
      },
    ],
  },
  about: {
    title: 'Over Jan Leenders',
    description: 'Ervaren coach met passie voor persoonlijke groei',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Jan Leenders is een ervaren coach met meer dan 10 jaar ervaring in het begeleiden van mensen bij hun persoonlijke en professionele ontwikkeling.',
          },
        ],
      },
    ],
    image: {
      _type: 'image',
      asset: {
        _ref: 'image-jan-400x400-jpg',
        _type: 'reference',
      },
      alt: 'Jan Leenders - Coach',
    },
  },
  contact: {
    title: 'Neem Contact Op',
    description: 'Laten we samen kijken hoe we je kunnen helpen',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ben je klaar om de volgende stap te zetten? Neem contact met ons op voor een vrijblijvend gesprek.',
          },
        ],
      },
    ],
    form: {
      fields: [
        {
          name: 'name',
          label: 'Naam',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          label: 'E-mail',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          label: 'Telefoon',
          type: 'tel',
          required: false,
        },
        {
          name: 'subject',
          label: 'Onderwerp',
          type: 'text',
          required: true,
        },
        {
          name: 'message',
          label: 'Bericht',
          type: 'textarea',
          required: true,
        },
      ],
    },
  },
};

export const mockErrorData = {
  notFound: {
    title: 'Pagina Niet Gevonden',
    description: 'De pagina die je zoekt bestaat niet of is verplaatst',
    message: 'Sorry, we kunnen de pagina niet vinden die je zoekt.',
    action: {
      label: 'Terug naar Home',
      href: '/',
    },
  },
  serverError: {
    title: 'Server Fout',
    description: 'Er is een fout opgetreden op de server',
    message:
      'Er is een onverwachte fout opgetreden. Probeer het later opnieuw.',
    action: {
      label: 'Probeer Opnieuw',
      href: '/',
    },
  },
  networkError: {
    title: 'Netwerk Fout',
    description: 'Er is een probleem met de internetverbinding',
    message: 'Controleer je internetverbinding en probeer het opnieuw.',
    action: {
      label: 'Probeer Opnieuw',
      href: '/',
    },
  },
};

export const mockLoadingData = {
  page: {
    title: 'Laden...',
    message: 'Pagina wordt geladen',
  },
  form: {
    title: 'Verwerken...',
    message: 'Je gegevens worden verwerkt',
  },
  content: {
    title: 'Ophalen...',
    message: 'Inhoud wordt opgehaald',
  },
};
