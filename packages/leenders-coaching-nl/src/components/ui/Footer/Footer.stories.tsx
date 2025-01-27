import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta = {
  title: "UI/Footer",
  component: Footer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    brandSection: {
      control: "object",
      description: "Brand information section",
    },
    navigationSection: {
      control: "object",
      description: "Navigation links section",
    },
    contactSection: {
      control: "object",
      description: "Contact information section",
    },
    socialSection: {
      control: "object",
      description: "Social media links section",
    },
    copyright: {
      control: "object",
      description: "Copyright information",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brandSection: {
      title: "Leenders Coaching",
      description: "Professional coaching services to help you reach your full potential",
    },
    navigationSection: {
      title: "Quick Links",
      items: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/services", label: "Services" },
        { href: "/contact", label: "Contact" },
      ],
    },
    contactSection: {
      title: "Contact Info",
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
      title: "Follow Us",
      items: [
        { href: "https://linkedin.com", label: "LinkedIn" },
        { href: "https://twitter.com", label: "Twitter" },
        { href: "https://instagram.com", label: "Instagram" },
      ],
    },
    copyright: {
      text: "© 2024 Leenders Coaching. All rights reserved.",
    },
  },
};
