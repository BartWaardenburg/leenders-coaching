import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    as: {
      control: 'select',
      options: ['input', 'textarea'],
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered'],
      description: 'The visual style variant of the input',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here',
  },
};

export const Bordered: Story = {
  args: {
    placeholder: 'Enter your text here',
    variant: 'bordered',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithLabelBordered: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    variant: 'bordered',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters long',
    placeholder: 'Enter your password',
  },
};

export const WithErrorBordered: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters long',
    placeholder: 'Enter your password',
    variant: 'bordered',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: true,
  },
};

export const DisabledBordered: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: true,
    variant: 'bordered',
  },
};

export const Textarea: Story = {
  args: {
    as: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here',
  },
};

export const TextareaBordered: Story = {
  args: {
    as: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here',
    variant: 'bordered',
  },
};

export const TextareaWithError: Story = {
  args: {
    as: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here',
    error: 'Message is required',
  },
};

export const TextareaWithErrorBordered: Story = {
  args: {
    as: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here',
    error: 'Message is required',
    variant: 'bordered',
  },
};
