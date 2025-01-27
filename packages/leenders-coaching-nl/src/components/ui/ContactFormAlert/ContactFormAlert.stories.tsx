import type { Meta, StoryObj } from "@storybook/react";
import { ContactFormAlert } from "./ContactFormAlert";

const meta = {
  title: "UI/ContactFormAlert",
  component: ContactFormAlert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["idle", "loading", "success", "error"],
      description: "The current status of the contact form",
    },
  },
} satisfies Meta<typeof ContactFormAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    status: "success",
  },
};

export const Error: Story = {
  args: {
    status: "error",
  },
};
