import type { Meta, StoryObj } from "@storybook/react";
import { GridSection } from "./GridSection";

const meta = {
  title: "UI/GridSection",
  component: GridSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GridSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "GridSection Example",
  },
};
