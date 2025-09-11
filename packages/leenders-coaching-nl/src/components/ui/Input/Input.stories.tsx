import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { expect, fn } from 'storybook/test';
import { Input } from './Input';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
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
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const input = canvas.getByPlaceholderText('Enter your text here');
    await expect(input).toBeVisible();
    await waitForMotionAnimations({ canvas });

    // Test typing interaction
    await userEvent.type(input, 'Hello World');
    await expect(input).toHaveValue('Hello World');
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Bordered: Story = {
  args: {
    placeholder: 'Enter your text here',
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Enter your text here');
    await expect(input).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const input = canvas.getByLabelText('Email Address');
    await expect(input).toBeVisible();
    await waitForMotionAnimations({ canvas });

    // Test typing email
    await userEvent.type(input, 'test@example.com');
    await expect(input).toHaveValue('test@example.com');
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const WithLabelBordered: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email Address');
    await expect(input).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters long',
    placeholder: 'Enter your password',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Password');
    await expect(input).toBeVisible();
    await expect(
      canvas.getByText('Password must be at least 8 characters long')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
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
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Password');
    await expect(input).toBeVisible();
    await expect(
      canvas.getByText('Password must be at least 8 characters long')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: true,
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const input = canvas.getByLabelText('Username');
    await expect(input).toBeVisible();
    await expect(input).toBeDisabled();
    await waitForMotionAnimations({ canvas });

    // Test that typing doesn't work when disabled
    await userEvent.type(input, 'test');
    await expect(input).toHaveValue('');
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const DisabledBordered: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: true,
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Username');
    await expect(input).toBeVisible();
    await expect(input).toBeDisabled();
    await waitForMotionAnimations({ canvas });
  },
};

export const Textarea: Story = {
  args: {
    as: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here',
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const textarea = canvas.getByLabelText('Message');
    await expect(textarea).toBeVisible();
    await waitForMotionAnimations({ canvas });

    // Test typing in textarea
    await userEvent.type(
      textarea,
      'This is a long message that spans multiple lines.'
    );
    await expect(textarea).toHaveValue(
      'This is a long message that spans multiple lines.'
    );
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const TextareaBordered: Story = {
  args: {
    as: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here',
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText('Message');
    await expect(textarea).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const TextareaWithError: Story = {
  args: {
    as: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here',
    error: 'Message is required',
  },
  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText('Message');
    await expect(textarea).toBeVisible();
    await expect(canvas.getByText('Message is required')).toBeVisible();
    await waitForMotionAnimations({ canvas });
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
  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText('Message');
    await expect(textarea).toBeVisible();
    await expect(canvas.getByText('Message is required')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const FormInteraction: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: '',
    });

    const handleChange =
      (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      };

    return (
      <div className="w-full max-w-md space-y-4">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange('email')}
        />
        <Input
          as="textarea"
          label="Message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange('message')}
        />
        <div className="text-sm text-muted-foreground">
          <p>Name: {formData.name || 'Not provided'}</p>
          <p>Email: {formData.email || 'Not provided'}</p>
          <p>Message: {formData.message || 'Not provided'}</p>
        </div>
      </div>
    );
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Fill out the form', async () => {
      // Fill name field
      await userEvent.type(canvas.getByLabelText('Name'), 'John Doe');
      await expect(canvas.getByDisplayValue('John Doe')).toBeInTheDocument();

      // Fill email field
      await userEvent.type(canvas.getByLabelText('Email'), 'john@example.com');
      await expect(
        canvas.getByDisplayValue('john@example.com')
      ).toBeInTheDocument();

      // Fill message field
      await userEvent.type(
        canvas.getByLabelText('Message'),
        'This is a test message'
      );
      await expect(
        canvas.getByDisplayValue('This is a test message')
      ).toBeInTheDocument();
    });

    await step('Verify form data display', async () => {
      // Check that the form data is displayed correctly
      await expect(canvas.getByText('Name: John Doe')).toBeVisible();
      await expect(canvas.getByText('Email: john@example.com')).toBeVisible();
      await expect(
        canvas.getByText('Message: This is a test message')
      ).toBeVisible();
    });

    await step('Test keyboard navigation', async () => {
      // Test tab navigation - click on the first input to focus it
      await userEvent.click(canvas.getByLabelText('Name'));
      await expect(canvas.getByLabelText('Name')).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByLabelText('Email')).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByLabelText('Message')).toHaveFocus();
    });
  },
};
