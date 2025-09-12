import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { expect, fn } from 'storybook/test';
import { Form } from './Form';

const meta = {
  title: 'UI/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van het formulier',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback wanneer het formulier wordt verzonden',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
    children: (
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Your message"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Submit
        </button>
      </div>
    ),
  },
  play: async ({ canvas, userEvent, args, step }) => {
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

    await step('Submit the form', async () => {
      // Submit the form
      await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
      await expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};

export const FormValidation: Story = {
  args: {
    onSubmit: fn(),
    children: (
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Your message"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Submit
        </button>
      </div>
    ),
  },
  play: async ({ canvas, userEvent, args, step }) => {
    await step('Try to submit empty form', async () => {
      // Try to submit without filling any fields
      await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

      // Form should not be submitted due to validation
      await expect(args.onSubmit).not.toHaveBeenCalled();
    });

    await step('Fill form partially and test validation', async () => {
      // Fill only name field
      await userEvent.type(canvas.getByLabelText('Name *'), 'John Doe');

      // Try to submit
      await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

      // Form should still not be submitted
      await expect(args.onSubmit).not.toHaveBeenCalled();
    });

    await step('Complete the form and submit', async () => {
      // Fill remaining required fields
      await userEvent.type(
        canvas.getByLabelText('Email *'),
        'john@example.com'
      );
      await userEvent.type(
        canvas.getByLabelText('Message *'),
        'This is a test message'
      );

      // Submit the form
      await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
      await expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};

export const KeyboardNavigation: Story = {
  args: {
    onSubmit: fn(),
    children: (
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Your message"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Submit
        </button>
      </div>
    ),
  },
  play: async ({ canvas, userEvent, args, step }) => {
    await step('Test tab navigation', async () => {
      // Start with first field focused
      await userEvent.tab();
      await expect(canvas.getByLabelText('Name')).toHaveFocus();

      // Tab to next field
      await userEvent.tab();
      await expect(canvas.getByLabelText('Email')).toHaveFocus();

      // Tab to textarea
      await userEvent.tab();
      await expect(canvas.getByLabelText('Message')).toHaveFocus();

      // Tab to submit button
      await userEvent.tab();
      await expect(
        canvas.getByRole('button', { name: 'Submit' })
      ).toHaveFocus();
    });

    await step('Test keyboard form submission', async () => {
      // Focus the submit button
      await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

      // Fill form using keyboard
      await userEvent.keyboard('{Tab}'); // Go to name field
      await userEvent.keyboard('John Doe');

      await userEvent.keyboard('{Tab}'); // Go to email field
      await userEvent.keyboard('john@example.com');

      await userEvent.keyboard('{Tab}'); // Go to message field
      await userEvent.keyboard('This is a test message');

      await userEvent.keyboard('{Tab}'); // Go to submit button
      await userEvent.keyboard('{Enter}'); // Submit with Enter key

      await expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};
