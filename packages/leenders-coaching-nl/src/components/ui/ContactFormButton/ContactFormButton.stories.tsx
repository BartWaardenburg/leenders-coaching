import type { Meta, StoryObj } from "@storybook/react";
import { ContactFormButton } from "./ContactFormButton";

const meta = {
  title: "UI/ContactFormButton",
  component: ContactFormButton,
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
} satisfies Meta<typeof ContactFormButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    status: "idle",
  },
};

export const Loading: Story = {
  args: {
    status: "loading",
  },
};
