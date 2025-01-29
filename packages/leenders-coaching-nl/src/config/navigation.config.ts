export type NavItem = {
  href: string;
  label: string;
};

export const navigationConfig = {
  links: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Over mij",
      href: "/about",
    },
    {
      label: "Diensten",
      href: "/services",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
} as const;
