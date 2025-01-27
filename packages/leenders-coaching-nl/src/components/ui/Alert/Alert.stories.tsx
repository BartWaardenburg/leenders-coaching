import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "warning"],
      description: "The visual style variant of the alert",
    },
    children: {
      control: "text",
      description: "The content of the alert",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: "success",
    children: "Operation completed successfully!",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "An error occurred while processing your request.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Please review your information before proceeding.",
  },
};

export const LongContent: Story = {
  args: {
    variant: "success",
    children:
      "This is an alert with longer content that might wrap to multiple lines. It demonstrates how the alert handles longer text content while maintaining its layout and readability.",
  },
};
