import type { Meta, StoryObj } from "@storybook/react";
import { FooterList } from "./FooterList";

const meta = {
  title: "UI/FooterList",
  component: FooterList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FooterList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "FooterList Example",
  },
};
