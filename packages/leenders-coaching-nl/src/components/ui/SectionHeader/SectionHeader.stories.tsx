import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "UI/SectionHeader",
  component: SectionHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title of the section",
    },
    description: {
      control: "text",
      description: "Optional description text below the title",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Example Section",
    description: "This is an example section description that provides more context.",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Section Without Description",
  },
};
