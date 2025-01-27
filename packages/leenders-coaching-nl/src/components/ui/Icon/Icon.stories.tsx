import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { iconPaths } from "@/config/icons.config";

const meta = {
  title: "UI/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    path: {
      control: "text",
      description: "SVG path data for the icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Close: Story = {
  args: {
    path: iconPaths.close,
  },
};

export const MenuHamburger: Story = {
  args: {
    path: iconPaths.menu.hamburger,
  },
};

export const MenuClose: Story = {
  args: {
    path: iconPaths.menu.close,
  },
};

export const ThemeSun: Story = {
  args: {
    path: iconPaths.theme.sun,
  },
};

export const ThemeMoon: Story = {
  args: {
    path: iconPaths.theme.moon,
  },
};

export const Message: Story = {
  args: {
    path: iconPaths.message,
  },
};
