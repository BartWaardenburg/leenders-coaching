import type { Meta, StoryObj } from "@storybook/react";
import { GradientTitle } from "./GradientTitle";

const meta = {
  title: "UI/GradientTitle",
  component: GradientTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GradientTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "GradientTitle Example",
  },
};
