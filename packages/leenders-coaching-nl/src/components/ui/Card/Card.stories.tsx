import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardTitle, CardDescription, CardList } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "glass", "secondary"],
    },
    spacing: {
      control: "select",
      options: ["default", "form"],
    },
    hover: {
      control: "boolean",
    },
    href: {
      control: "text",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description for the card.</CardDescription>
        <CardList
          items={[
            "Feature one of the card",
            "Feature two of the card",
            "Feature three of the card",
          ]}
        />
      </>
    ),
    variant: "default",
    spacing: "default",
    hover: true,
  },
};

export const Glass: Story = {
  args: {
    ...Default.args,
    variant: "glass",
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: "secondary",
  },
};

export const WithLink: Story = {
  args: {
    ...Default.args,
    href: "/example",
  },
};

export const FormLayout: Story = {
  args: {
    children: (
      <>
        <CardTitle>Contact Form</CardTitle>
        <Card.FormFields>
          <Card.FormField>Form field one</Card.FormField>
          <Card.FormField>Form field two</Card.FormField>
          <Card.FormField>Form field three</Card.FormField>
        </Card.FormFields>
      </>
    ),
    spacing: "form",
  },
};
