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
    variant: {
      control: "select",
      options: ["blue", "purple", "green", "pink", "yellow", "teal"],
      description: "The visual style variant of the modal",
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show the close button",
    },
    label: {
      control: "text",
      description: "Accessibility label for the modal",
    },
    onClose: {
      action: "closed",
      description: "Callback function when the modal is closed",
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

export const WithoutCloseButton: Story = {
  args: {
    isOpen: true,
    label: "Modal Without Close Button",
    showCloseButton: false,
    children: "This modal doesn't have a close button.",
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
        <p>Click outside the modal or press ESC to close it.</p>
      </div>
    ),
  },
};

export const WithBackgroundContent: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isOpen: true,
    label: "Modal with Background Content",
    variant: "purple",
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Welcome Back!</h2>
        <p>This modal appears on top of the main content with a nice blur effect.</p>
        <button
          className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
          onClick={() => console.log("Button clicked")}
        >
          Click me
        </button>
      </div>
    ),
  },
  render: (args) => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-200">Main Page Content</h1>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm"
            >
              <h3 className="font-medium mb-2">Card {i}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This is some example content that sits behind the modal.
                The modal will appear on top with a nice backdrop blur effect.
              </p>
            </div>
          ))}
        </div>
        <Modal {...args} />
      </div>
    </div>
  ),
};
