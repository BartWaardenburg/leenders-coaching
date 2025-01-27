import type { Meta, StoryObj } from "@storybook/react";
import { BlogCard } from "./BlogCard";

const meta = {
  title: "UI/BlogCard",
  component: BlogCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    post: {
      control: "object",
      description: "Blog post data",
    },
  },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePost = {
  title: "Getting Started with Life Coaching",
  description: "Learn how life coaching can help you achieve your goals and transform your life.",
  date: "March 15, 2024",
  readingTime: "5 min read",
  slug: "getting-started-with-life-coaching",
  image: "/images/blog/getting-started.jpg",
};

export const Default: Story = {
  args: {
    post: samplePost,
  },
};

export const LongTitle: Story = {
  args: {
    post: {
      ...samplePost,
      title: "The Complete Guide to Personal Development and Professional Growth Through Coaching",
    },
  },
};

export const LongDescription: Story = {
  args: {
    post: {
      ...samplePost,
      description: "Discover the transformative power of professional coaching and how it can help you unlock your full potential, overcome obstacles, and achieve your personal and professional goals.",
    },
  },
};
