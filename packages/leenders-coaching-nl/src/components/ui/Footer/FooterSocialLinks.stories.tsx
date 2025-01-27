import type { Meta, StoryObj } from "@storybook/react";
import { FooterSocialLinks } from "./FooterSocialLinks";

const meta = {
  title: "UI/FooterSocialLinks",
  component: FooterSocialLinks,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "Array of social media links",
    },
  },
} satisfies Meta<typeof FooterSocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        label: "LinkedIn",
        href: "https://linkedin.com",
      },
      {
        label: "Twitter",
        href: "https://twitter.com",
      },
      {
        label: "Instagram",
        href: "https://instagram.com",
      },
    ],
  },
};
