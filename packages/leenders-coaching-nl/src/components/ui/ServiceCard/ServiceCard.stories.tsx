import type { Meta, StoryObj } from "@storybook/react";
import { ServiceCard } from "./ServiceCard";

const meta = {
  title: "UI/ServiceCard",
  component: ServiceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    service: {
      control: "object",
      description: "The service data to display",
    },
  },
} satisfies Meta<typeof ServiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleService = {
  title: "Business Coaching",
  description: "Transform your business with personalized coaching sessions.",
  features: [
    "One-on-one coaching sessions",
    "Strategic business planning",
    "Performance optimization",
    "Leadership development",
  ],
  slug: "business-coaching",
};

export const Default: Story = {
  args: {
    service: sampleService,
  },
};

export const LongTitle: Story = {
  args: {
    service: {
      ...sampleService,
      title: "Comprehensive Business Transformation and Leadership Development Program",
    },
  },
};

export const LongDescription: Story = {
  args: {
    service: {
      ...sampleService,
      description:
        "Take your business to the next level with our comprehensive coaching program. We focus on developing your leadership skills, optimizing business processes, and creating sustainable growth strategies tailored to your specific industry and goals.",
    },
  },
};

export const ManyFeatures: Story = {
  args: {
    service: {
      ...sampleService,
      features: [
        "One-on-one coaching sessions",
        "Strategic business planning",
        "Performance optimization",
        "Leadership development",
        "Team building workshops",
        "Communication skills training",
        "Crisis management",
        "Growth strategy development",
      ],
    },
  },
};
