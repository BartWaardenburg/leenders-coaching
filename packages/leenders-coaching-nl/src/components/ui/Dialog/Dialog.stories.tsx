import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Whether the dialog is open",
    },
    onClose: {
      action: "closed",
      description: "Function called when the dialog is closed",
    },
    title: {
      control: "text",
      description: "The title of the dialog",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the dialog",
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => { },
    title: "Example Dialog",
    children: "This is an example dialog content.",
  },
};
