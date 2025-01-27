import type { NavItem, SocialLink } from "@/components/ui/Footer";

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
