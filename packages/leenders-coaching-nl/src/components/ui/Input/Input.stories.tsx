import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { expect, fn } from 'storybook/test';
import { Input } from './Input';

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
      description: 'De visuele stijl variant van het invoerveld',
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
    placeholder: 'Voer hier je tekst in',
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const input = canvas.getByPlaceholderText('Voer hier je tekst in');
    await expect(input).toBeVisible();
    // Input rendering complete - no animation wait needed

    // Test typing interaction
    await userEvent.type(input, 'Hello World');
    await expect(input).toHaveValue('Hello World');
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Bordered: Story = {
  args: {
    placeholder: 'Voer hier je tekst in',
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Voer hier je tekst in');
    await expect(input).toBeVisible();
    // Input rendering complete - no animation wait needed
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email adres',
    placeholder: 'Voer je email in',
    type: 'email',
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const input = canvas.getByLabelText('Email adres');
    await expect(input).toBeVisible();
    // Input rendering complete - no animation wait needed

    // Test typing email
    await userEvent.type(input, 'test@example.com');
    await expect(input).toHaveValue('test@example.com');
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const WithLabelBordered: Story = {
  args: {
    label: 'Email adres',
    placeholder: 'Voer je email in',
    type: 'email',
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email adres');
    await expect(input).toBeVisible();
    // Input rendering complete - no animation wait needed
  },
};

export const WithError: Story = {
  args: {
    label: 'Wachtwoord',
    type: 'password',
    error: 'Wachtwoord moet minimaal 8 karakters lang zijn',
    placeholder: 'Voer je wachtwoord in',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Wachtwoord');
    await expect(input).toBeVisible();
    await expect(
      canvas.getByText('Wachtwoord moet minimaal 8 karakters lang zijn')
    ).toBeVisible();
    // Input rendering complete - no animation wait needed
  },
};

export const WithErrorBordered: Story = {
  args: {
    label: 'Wachtwoord',
    type: 'password',
    error: 'Wachtwoord moet minimaal 8 karakters lang zijn',
    placeholder: 'Voer je wachtwoord in',
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Wachtwoord');
    await expect(input).toBeVisible();
    await expect(
      canvas.getByText('Wachtwoord moet minimaal 8 karakters lang zijn')
    ).toBeVisible();
    // Input rendering complete - no animation wait needed
  },
};

export const Disabled: Story = {
  args: {
    label: 'Gebruikersnaam',
    placeholder: 'Voer je gebruikersnaam in',
    disabled: true,
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const input = canvas.getByLabelText('Gebruikersnaam');
    await expect(input).toBeVisible();
    await expect(input).toBeDisabled();
    // Input rendering complete - no animation wait needed

    // Test that typing doesn't work when disabled
    await userEvent.type(input, 'test');
    await expect(input).toHaveValue('');
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const DisabledBordered: Story = {
  args: {
    label: 'Gebruikersnaam',
    placeholder: 'Voer je gebruikersnaam in',
    disabled: true,
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Gebruikersnaam');
    await expect(input).toBeVisible();
    await expect(input).toBeDisabled();
    // Input rendering complete - no animation wait needed
  },
};

export const Textarea: Story = {
  args: {
    as: 'textarea',
    label: 'Bericht',
    placeholder: 'Voer hier je bericht in',
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const textarea = canvas.getByLabelText('Bericht');
    await expect(textarea).toBeVisible();
    // Input rendering complete - no animation wait needed

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
    label: 'Bericht',
    placeholder: 'Voer hier je bericht in',
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText('Bericht');
    await expect(textarea).toBeVisible();
    // Input rendering complete - no animation wait needed
  },
};

export const TextareaWithError: Story = {
  args: {
    as: 'textarea',
    label: 'Bericht',
    placeholder: 'Voer hier je bericht in',
    error: 'Bericht is verplicht',
  },
  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText('Bericht');
    await expect(textarea).toBeVisible();
    await expect(canvas.getByText('Bericht is verplicht')).toBeVisible();
    // Input rendering complete - no animation wait needed
  },
};

export const TextareaWithErrorBordered: Story = {
  args: {
    as: 'textarea',
    label: 'Bericht',
    placeholder: 'Voer hier je bericht in',
    error: 'Bericht is verplicht',
    variant: 'bordered',
  },
  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText('Bericht');
    await expect(textarea).toBeVisible();
    await expect(canvas.getByText('Bericht is verplicht')).toBeVisible();
    // Input rendering complete - no animation wait needed
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
          label="Naam"
          placeholder="Voer je naam in"
          value={formData.name}
          onChange={handleChange('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Voer je email in"
          value={formData.email}
          onChange={handleChange('email')}
        />
        <Input
          as="textarea"
          label="Bericht"
          placeholder="Voer je bericht in"
          value={formData.message}
          onChange={handleChange('message')}
        />
        <div className="text-sm text-muted-foreground">
          <p>Naam: {formData.name || 'Niet opgegeven'}</p>
          <p>Email: {formData.email || 'Niet opgegeven'}</p>
          <p>Bericht: {formData.message || 'Niet opgegeven'}</p>
        </div>
      </div>
    );
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Fill out the form', async () => {
      // Fill name field
      await userEvent.type(canvas.getByLabelText('Naam'), 'Jan Jansen');
      await expect(canvas.getByDisplayValue('Jan Jansen')).toBeInTheDocument();

      // Fill email field
      await userEvent.type(canvas.getByLabelText('Email'), 'jan@voorbeeld.nl');
      await expect(
        canvas.getByDisplayValue('jan@voorbeeld.nl')
      ).toBeInTheDocument();

      // Fill message field
      await userEvent.type(
        canvas.getByLabelText('Bericht'),
        'Dit is een test bericht'
      );
      await expect(
        canvas.getByDisplayValue('Dit is een test bericht')
      ).toBeInTheDocument();
    });

    await step('Verify form data display', async () => {
      // Check that the form data is displayed correctly
      await expect(canvas.getByText('Naam: Jan Jansen')).toBeVisible();
      await expect(canvas.getByText('Email: jan@voorbeeld.nl')).toBeVisible();
      await expect(
        canvas.getByText('Bericht: Dit is een test bericht')
      ).toBeVisible();
    });

    await step('Test keyboard navigation', async () => {
      // Test tab navigation - click on the first input to focus it
      await userEvent.click(canvas.getByLabelText('Naam'));
      await expect(canvas.getByLabelText('Naam')).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByLabelText('Email')).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByLabelText('Bericht')).toHaveFocus();
    });
  },
};
