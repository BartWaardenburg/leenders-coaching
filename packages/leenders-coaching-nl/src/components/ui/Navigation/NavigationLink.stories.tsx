import type { Meta, StoryObj } from "@storybook/react";
import { NavigationLink } from "./NavigationLink";

const meta = {
  title: "UI/NavigationLink",
  component: NavigationLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "The URL the link points to",
    },
    children: {
      control: "text",
      description: "The content of the link",
    },
  },
} satisfies Meta<typeof NavigationLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/about",
    children: "About Us",
  },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    children: "External Link",
  },
};
