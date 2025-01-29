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
      title: "About",
      description:
        "Transform your life through personal coaching and professional guidance.",
    },
    elsewhere: {
      title: "Elsewhere",
      items: [
        { href: "https://linkedin.com", label: "LinkedIn" },
        { href: "https://instagram.com", label: "Instagram" },
      ],
    },
    contact: {
      title: "Contact",
      projectEnquiry: {
        label: "Project enquiry",
        href: "/contact",
        linkText: "Form",
      },
      generalEnquiry: {
        label: "General enquiry",
        href: "mailto:info@leenders-coaching.nl",
        linkText: "Send a message",
      },
    },
  },
};

export const footerConfig = {
  copyright: "© 2024 Leenders Coaching",
  instagram: {
    href: "https://instagram.com/leenderscoaching",
    label: "Instagram",
  },
  contact: {
    email: "info@leenders-coaching.nl",
    phone: "+31 6 12345678",
  },
};
