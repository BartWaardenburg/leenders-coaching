import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta = {
  title: "UI/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "The heading level to use",
    },
    variant: {
      control: "select",
      options: ["default", "gradient", "large", "small"],
      description: "The visual style variant of the heading",
    },
    weight: {
      control: "select",
      options: ["bold", "extrabold"],
      description: "The font weight of the heading",
    },
    spacing: {
      control: "select",
      options: ["none", "normal"],
      description: "The bottom margin spacing of the heading",
    },
    children: {
      control: "text",
      description: "The content of the heading",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: "h1",
    children: "Main Heading (H1)",
  },
};

export const H2: Story = {
  args: {
    level: "h2",
    children: "Secondary Heading (H2)",
  },
};

export const H3: Story = {
  args: {
    level: "h3",
    children: "Tertiary Heading (H3)",
  },
};

export const GradientH1: Story = {
  args: {
    level: "h1",
    variant: "gradient",
    children: "Gradient Heading",
  },
};

export const LargeH1: Story = {
  args: {
    level: "h1",
    variant: "large",
    children: "Large Heading",
  },
};

export const SmallH1: Story = {
  args: {
    level: "h1",
    variant: "small",
    children: "Small Heading",
  },
};

export const ExtraboldHeading: Story = {
  args: {
    level: "h2",
    weight: "extrabold",
    children: "Extrabold Heading",
  },
};

export const NoSpacing: Story = {
  args: {
    level: "h2",
    spacing: "none",
    children: "Heading Without Bottom Margin",
  },
};
