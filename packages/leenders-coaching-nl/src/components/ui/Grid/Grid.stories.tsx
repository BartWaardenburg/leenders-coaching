import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta = {
  title: "UI/Grid",
  component: Grid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Grid Example",
  },
};
