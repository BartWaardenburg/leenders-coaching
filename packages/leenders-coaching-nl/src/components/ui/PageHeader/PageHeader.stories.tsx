import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";

const meta = {
  title: "UI/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the page",
    },
    description: {
      control: "text",
      description: "Optional description text below the title",
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Our Services",
    description: "Discover our range of coaching services designed to help you achieve your goals",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Contact Us",
  },
};

export const LongDescription: Story = {
  args: {
    title: "About Us",
    description: "We are passionate about helping individuals and organizations reach their full potential through personalized coaching services. Our experienced team of coaches brings years of expertise in personal development, career growth, and leadership training.",
  },
};
