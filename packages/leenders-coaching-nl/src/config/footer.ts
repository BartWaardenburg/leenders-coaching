import type { NavItem, SocialLink } from "@/components/ui/Footer";

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
        href: "mailto:info@leenderscoaching.nl",
        linkText: "Send a message",
      },
    },
  },
};

export const footerConfig = {
  brandSection: {
    title: "Leenders Coaching",
    description:
      "Transform your life through personal coaching and professional guidance.",
  },
  navigationSection: {
    title: "Quick Links",
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/blog", label: "Blog" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/contact", label: "Contact" },
    ] as NavItem[],
  },
  contactSection: {
    title: "Contact",
    email: {
      label: "Email",
      value: "info@leenderscoaching.nl",
    },
    phone: {
      label: "Phone",
      value: "+31 6 12345678",
    },
    location: {
      label: "Location",
      value: "Amsterdam, Netherlands",
    },
  },
  socialSection: {
    title: "Follow Me",
    items: [
      { href: "https://linkedin.com", label: "LinkedIn" },
      { href: "https://instagram.com", label: "Instagram" },
    ] as SocialLink[],
  },
  copyright: {
    text: "All rights reserved.",
  },
};
