import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'The visual style variant of the alert',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the alert',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show a close button',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when the alert is closed',
    },
    children: {
      control: 'text',
      description: 'The content of the alert',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    children: 'This is a default alert message.',
  },
};

export const WithCloseButton: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children: 'This is an alert with a close button.',
  },
};

export const Small: Story = {
  args: {
    variant: 'blue',
    size: 'small',
    children: 'This is a small alert message.',
  },
};

export const SmallWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'small',
    showCloseButton: true,
    children: 'This is a small alert with a close button.',
  },
};

export const Medium: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    children: 'This is a medium alert message.',
  },
};

export const MediumWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children: 'This is a medium alert with a close button.',
  },
};

export const Large: Story = {
  args: {
    variant: 'blue',
    size: 'large',
    children: 'This is a large alert message.',
  },
};

export const LargeWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'large',
    showCloseButton: true,
    children: 'This is a large alert with a close button.',
  },
};

export const AllSizes: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    variant: 'blue',
    children: 'Alert Message',
    showCloseButton: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[500px]">
      <Alert {...args} size="small">
        Small Alert Message
      </Alert>
      <Alert {...args} size="medium">
        Medium Alert Message
      </Alert>
      <Alert {...args} size="large">
        Large Alert Message
      </Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    size: 'medium',
    children: 'Alert Message',
    showCloseButton: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[500px]">
      <Alert {...args} variant="blue">
        Blue Alert Message
      </Alert>
      <Alert {...args} variant="purple">
        Purple Alert Message
      </Alert>
      <Alert {...args} variant="green">
        Green Alert Message
      </Alert>
      <Alert {...args} variant="pink">
        Pink Alert Message
      </Alert>
      <Alert {...args} variant="yellow">
        Yellow Alert Message
      </Alert>
      <Alert {...args} variant="teal">
        Teal Alert Message
      </Alert>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children:
      'This is an alert with longer content that might wrap to multiple lines. It demonstrates how the alert handles longer text content while maintaining its layout and readability.',
  },
};
