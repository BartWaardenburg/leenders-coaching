import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Whether the modal is open",
    },
    label: {
      control: "text",
      description: "Accessibility label for the modal",
    },
    children: {
      control: "text",
      description: "Content of the modal",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    label: "Example Modal",
    children: "This is the content of the modal dialog.",
  },
};

export const WithLongContent: Story = {
  args: {
    isOpen: true,
    label: "Long Content Modal",
    children: (
      <div className="space-y-4">
        <p>This modal contains longer content to demonstrate scrolling behavior.</p>
        <p>You can add multiple paragraphs and other content here.</p>
        <p>The modal will automatically handle overflow and scrolling.</p>
      </div>
    ),
  },
};
