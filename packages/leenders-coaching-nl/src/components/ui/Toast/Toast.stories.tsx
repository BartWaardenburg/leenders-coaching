import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta = {
  title: "UI/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the toast notification",
    },
    children: {
      control: "text",
      description: "Content of the toast notification",
    },
    variant: {
      control: "select",
      options: ["default", "success", "error", "warning"],
      description: "Visual style variant of the toast",
    },
    onClose: {
      action: "closed",
      description: "Function called when the close button is clicked",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Notification",
    children: "This is a default toast notification.",
    onClose: () => { },
  },
};

export const Success: Story = {
  args: {
    title: "Success",
    children: "Your changes have been saved successfully.",
    variant: "success",
    onClose: () => { },
  },
};

export const Error: Story = {
  args: {
    title: "Error",
    children: "An error occurred while processing your request.",
    variant: "error",
    onClose: () => { },
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    children: "Please review your input before proceeding.",
    variant: "warning",
    onClose: () => { },
  },
};

export const WithoutClose: Story = {
  args: {
    title: "Information",
    children: "This toast doesn't have a close button.",
  },
};

export const LongContent: Story = {
  args: {
    title: "Long Content",
    children: "This is a toast notification with a longer content that might wrap to multiple lines. It demonstrates how the toast handles longer text content while maintaining its layout and readability.",
    onClose: () => { },
  },
};
