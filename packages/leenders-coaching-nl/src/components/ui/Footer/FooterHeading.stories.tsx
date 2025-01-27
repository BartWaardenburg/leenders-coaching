import type { Meta, StoryObj } from "@storybook/react";
import { FooterHeading } from "./FooterHeading";

const meta = {
  title: "UI/FooterHeading",
  component: FooterHeading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FooterHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "FooterHeading Example",
  },
};
