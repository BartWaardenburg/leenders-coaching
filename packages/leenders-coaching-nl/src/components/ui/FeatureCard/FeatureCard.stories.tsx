import type { Meta, StoryObj } from "@storybook/react";
import { FeatureCard } from "./FeatureCard";

const meta = {
  title: "UI/FeatureCard",
  component: FeatureCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the feature",
    },
    description: {
      control: "text",
      description: "Description of the feature",
    },
    items: {
      control: "object",
      description: "List of feature items",
    },
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Personal Growth",
    description: "Unlock your full potential through personalized coaching sessions",
  },
};

export const WithItems: Story = {
  args: {
    title: "Career Development",
    description: "Advance your career with expert guidance",
    items: [
      "Career path planning",
      "Leadership development",
      "Professional networking",
      "Interview preparation",
    ],
  },
};
