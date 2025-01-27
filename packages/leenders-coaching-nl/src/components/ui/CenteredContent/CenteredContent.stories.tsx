import type { Meta, StoryObj } from "@storybook/react";
import { CenteredContent } from "./CenteredContent";

const meta = {
  title: "UI/CenteredContent",
  component: CenteredContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CenteredContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "CenteredContent Example",
  },
};
