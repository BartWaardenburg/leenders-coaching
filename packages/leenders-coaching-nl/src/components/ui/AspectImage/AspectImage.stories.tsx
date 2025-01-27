import type { Meta, StoryObj } from "@storybook/react";
import { AspectImage } from "./AspectImage";

const meta = {
  title: "UI/AspectImage",
  component: AspectImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "The source URL of the image",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    aspect: {
      control: "select",
      options: ["16/9", "4/3", "1/1"],
      description: "The aspect ratio of the image",
    },
  },
} satisfies Meta<typeof AspectImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/800x450",
    alt: "Example image",
    aspect: "16/9",
  },
};
