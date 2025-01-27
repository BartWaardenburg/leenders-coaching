import type { Meta, StoryObj } from "@storybook/react";
import { GradientBackground } from "./GradientBackground";

const meta = {
  title: "UI/GradientBackground",
  component: GradientBackground,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GradientBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "GradientBackground Example",
  },
};
