export type NavItem = {
  href: string;
  label: string;
};

export const navigationConfig = {
  brand: {
    title: "Leenders Coaching",
    href: "/",
  },
  items: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/testimonials", label: "Testimonials" },
  ] as NavItem[],
  cta: {
    href: "/contact",
    label: "Contact Me",
  },
};
