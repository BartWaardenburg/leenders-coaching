import type { Meta, StoryObj } from "@storybook/react";
import { TestimonialCard } from "./TestimonialCard";

const meta = {
  title: "UI/TestimonialCard",
  component: TestimonialCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    testimonial: {
      control: "object",
      description: "The testimonial data object",
    },
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    testimonial: {
      quote: "Working with this team has been an absolute pleasure. They truly understand what it takes to deliver exceptional results.",
      author: "Jane Smith",
      role: "CEO at TechCorp",
    },
  },
};

export const WithoutRole: Story = {
  args: {
    testimonial: {
      quote: "The quality of service exceeded all my expectations. Highly recommended!",
      author: "John Doe",
    },
  },
};
