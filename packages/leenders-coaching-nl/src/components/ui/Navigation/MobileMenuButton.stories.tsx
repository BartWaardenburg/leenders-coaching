import type { Meta, StoryObj } from "@storybook/react";
import { MobileMenuButton } from "./MobileMenuButton";

const meta = {
  title: "UI/MobileMenuButton",
  component: MobileMenuButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MobileMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "MobileMenuButton Example",
  },
};
