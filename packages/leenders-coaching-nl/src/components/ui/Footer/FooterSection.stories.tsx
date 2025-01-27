import type { Meta, StoryObj } from "@storybook/react";
import { FooterSection } from "./FooterSection";

const meta = {
  title: "UI/FooterSection",
  component: FooterSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "FooterSection Example",
  },
};
