import type { Meta, StoryObj } from "@storybook/react";
import { FooterCopyright } from "./FooterCopyright";

const meta = {
  title: "UI/FooterCopyright",
  component: FooterCopyright,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FooterCopyright>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "FooterCopyright Example",
  },
};
