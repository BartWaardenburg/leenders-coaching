import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { expect, fn } from 'storybook/test';
import { Form } from './Form';
import { Box } from '../Box/Box';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { mockFormData, mockFormValidation } from '@/mocks';

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
      <Box className="space-y-4">
        <Input
          label="Naam"
          type="text"
          name="name"
          placeholder={mockFormData.contact.name}
          required
        />
        <Input
          label="E-mail"
          type="email"
          name="email"
          placeholder={mockFormData.contact.email}
          required
        />
        <Input
          as="textarea"
          label="Bericht"
          name="message"
          rows={4}
          placeholder={mockFormData.contact.message}
          required
        />
        <Button type="submit" variant="blue" className="w-full">
          Versturen
        </Button>
      </Box>
    ),
  },
  play: async ({ canvas, userEvent, args, step }) => {
    await step('Fill out the form', async () => {
      // Fill name field
      await userEvent.type(canvas.getByLabelText('Naam'), 'John Doe');
      await expect(canvas.getByDisplayValue('John Doe')).toBeInTheDocument();

      // Fill email field
      await userEvent.type(canvas.getByLabelText('E-mail'), 'john@example.com');
      await expect(
        canvas.getByDisplayValue('john@example.com')
      ).toBeInTheDocument();

      // Fill message field
      await userEvent.type(
        canvas.getByLabelText('Bericht'),
        'This is a test message'
      );
      await expect(
        canvas.getByDisplayValue('This is a test message')
      ).toBeInTheDocument();
    });

    await step('Submit the form', async () => {
      // Submit the form
      await userEvent.click(canvas.getByRole('button', { name: 'Versturen' }));
      await expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};

export const FormValidation: Story = {
  args: {
    onSubmit: fn(),
    children: (
      <Box className="space-y-4">
        <Input
          label="Name *"
          type="text"
          name="name"
          placeholder="Your name"
          required
        />
        <Input
          label="Email *"
          type="email"
          name="email"
          placeholder="your@email.com"
          required
        />
        <Input
          as="textarea"
          label="Message *"
          name="message"
          rows={4}
          placeholder="Your message"
          required
        />
        <Button type="submit" variant="blue" className="w-full">
          Versturen
        </Button>
      </Box>
    ),
  },
  play: async ({ canvas, userEvent, args, step }) => {
    await step('Try to submit empty form', async () => {
      // Try to submit without filling any fields
      await userEvent.click(canvas.getByRole('button', { name: 'Versturen' }));

      // Form should not be submitted due to validation
      await expect(args.onSubmit).not.toHaveBeenCalled();
    });

    await step('Fill form partially and test validation', async () => {
      // Fill only name field
      await userEvent.type(canvas.getByLabelText('Name *'), 'John Doe');

      // Try to submit
      await userEvent.click(canvas.getByRole('button', { name: 'Versturen' }));

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
      await userEvent.click(canvas.getByRole('button', { name: 'Versturen' }));
      await expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};

export const KeyboardNavigation: Story = {
  args: {
    onSubmit: fn(),
    children: (
      <Box className="space-y-4">
        <Input label="Name" type="text" name="name" placeholder="Your name" />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="your@email.com"
        />
        <Input
          as="textarea"
          label="Message"
          name="message"
          rows={4}
          placeholder="Your message"
        />
        <Button type="submit" variant="blue" className="w-full">
          Versturen
        </Button>
      </Box>
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
        canvas.getByRole('button', { name: 'Versturen' })
      ).toHaveFocus();
    });

    await step('Test keyboard form submission', async () => {
      // Focus the submit button
      await userEvent.click(canvas.getByRole('button', { name: 'Versturen' }));

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
