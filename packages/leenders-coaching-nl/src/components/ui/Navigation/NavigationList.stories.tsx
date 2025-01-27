import type { Meta, StoryObj } from "@storybook/react";
import { NavigationList } from "./NavigationList";

const meta = {
  title: "UI/NavigationList",
  component: NavigationList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "Array of navigation items",
    },
    cta: {
      control: "object",
      description: "Optional call-to-action button",
    },
    onItemClick: {
      action: "clicked",
      description: "Callback when a navigation item is clicked",
    },
    size: {
      control: "select",
      options: ["default", "large"],
      description: "Size variant of the navigation list",
    },
  },
} satisfies Meta<typeof NavigationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
};

export const WithCTA: Story = {
  args: {
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
    ],
    cta: {
      href: "/contact",
      label: "Get Started",
    },
  },
};

export const Large: Story = {
  args: {
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
    ],
    size: "large",
  },
};
