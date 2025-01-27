import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionText } from "./DescriptionText";

const meta = {
  title: "UI/DescriptionText",
  component: DescriptionText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DescriptionText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "DescriptionText Example",
  },
};
