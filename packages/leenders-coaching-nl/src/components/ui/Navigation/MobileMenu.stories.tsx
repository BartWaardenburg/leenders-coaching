import type { Meta, StoryObj } from "@storybook/react";
import { MobileMenu } from "./MobileMenu";

const meta = {
  title: "UI/MobileMenu",
  component: MobileMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Whether the mobile menu is open",
    },
    onClose: {
      action: "closed",
      description: "Function called when the menu is closed",
    },
  },
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => { },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => { },
  },
};
