import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta = {
  title: "UI/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "underline"],
      description: "The visual style variant of the link",
    },
    href: {
      control: "text",
      description: "The URL the link points to",
    },
    target: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top"],
      description: "Where to open the linked document",
    },
    children: {
      control: "text",
      description: "The content of the link",
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Link",
    href: "#",
  },
};

export const Subtle: Story = {
  args: {
    children: "Subtle Link",
    href: "#",
    variant: "subtle",
  },
};

export const Underline: Story = {
  args: {
    children: "Underlined Link",
    href: "#",
    variant: "underline",
  },
};

export const ExternalLink: Story = {
  args: {
    children: "External Link",
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
  },
};

export const WithLongText: Story = {
  args: {
    children: "This is a link with a longer text that might wrap to multiple lines to demonstrate how the link component handles longer content",
    href: "#",
  },
};
