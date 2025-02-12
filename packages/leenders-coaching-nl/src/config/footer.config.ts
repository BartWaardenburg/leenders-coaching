type MenuFooterConfig = {
  sections: {
    about: {
      title: string;
      description: string;
    };
    elsewhere: {
      title: string;
      items: Array<{
        href: string;
        label: string;
      }>;
    };
    contact: {
      title: string;
      projectEnquiry: {
        label: string;
        href: string;
        linkText: string;
      };
      generalEnquiry: {
        label: string;
        href: string;
        linkText: string;
      };
    };
  };
};

export const menuFooterConfig: MenuFooterConfig = {
  sections: {
    about: {
      title: 'Over mij',
      description:
        'Transformeer je leven door persoonlijke coaching en professionele begeleiding.',
    },
    elsewhere: {
      title: 'Elders',
      items: [
        { href: 'https://linkedin.com', label: 'LinkedIn' },
        { href: 'https://instagram.com', label: 'Instagram' },
      ],
    },
    contact: {
      title: 'Contact',
      projectEnquiry: {
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Formulier',
      },
      generalEnquiry: {
        label: 'Algemene vraag',
        href: 'mailto:simone@leenders-coaching.nl',
        linkText: 'Stuur een bericht',
      },
    },
  },
};

export const footerConfig = {
  copyright: '© 2025 Simone Leenders Coaching',
  instagram: {
    href: 'https://instagram.com/leenderscoaching',
    label: 'Instagram',
  },
  contact: {
    email: 'simone@leenders-coaching.nl',
    phone: '+31 6 12345678',
  },
} as const;
