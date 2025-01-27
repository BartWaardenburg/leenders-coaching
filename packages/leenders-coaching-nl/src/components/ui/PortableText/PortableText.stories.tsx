import type { Meta, StoryObj } from "@storybook/react";
import { PortableText } from "./PortableText";

const meta = {
  title: "UI/PortableText",
  component: PortableText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "object",
      description: "Portable Text content blocks",
    },
  },
} satisfies Meta<typeof PortableText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "This is a paragraph of text rendered from Portable Text format. ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Some parts can be bold ",
          },
          {
            _type: "span",
            marks: ["em"],
            text: "or italicized",
          },
          {
            _type: "span",
            text: ".",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "This is a heading",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        children: [
          {
            _type: "span",
            text: "This is a bullet point",
          },
        ],
      },
    ],
  },
};
