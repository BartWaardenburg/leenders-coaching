import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "./Navigation";

const meta = {
  title: "UI/Navigation",
  component: Navigation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Navigation Example",
  },
};
