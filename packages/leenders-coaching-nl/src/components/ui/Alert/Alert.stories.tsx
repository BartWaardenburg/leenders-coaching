import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Alert } from './Alert';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'De visuele stijl variant van de alert',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'De grootte van de alert',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Of een sluitknop moet worden getoond',
    },
    onClose: {
      action: 'closed',
      description: 'Callback functie wanneer de alert wordt gesloten',
    },
    children: {
      control: 'text',
      description: 'De inhoud van de alert',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    children: 'This is a default alert message.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('This is a default alert message.')
    ).toBeVisible();
  },
};

export const WithCloseButton: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children: 'This is an alert with a close button.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('This is an alert with a close button.')
    ).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
  },
};

export const Small: Story = {
  args: {
    variant: 'blue',
    size: 'small',
    children: 'This is a small alert message.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('This is a small alert message.')
    ).toBeVisible();
  },
};

export const SmallWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'small',
    showCloseButton: true,
    children: 'This is a small alert with a close button.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('This is a small alert with a close button.')
    ).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
  },
};

export const Medium: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    children: 'This is a medium alert message.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('This is a medium alert message.')
    ).toBeVisible();
  },
};

export const MediumWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children: 'This is a medium alert with a close button.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('This is a medium alert with a close button.')
    ).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
  },
};

export const Large: Story = {
  args: {
    variant: 'blue',
    size: 'large',
    children: 'This is a large alert message.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('This is a large alert message.')
    ).toBeVisible();
  },
};

export const LargeWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'large',
    showCloseButton: true,
    children: 'This is a large alert with a close button.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('This is a large alert with a close button.')
    ).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
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
  play: async ({ canvas }) => {
    await waitForMotionAnimations({ canvas });
    await expect(canvas.getByText('Small Alert Message')).toBeVisible();
    await expect(canvas.getByText('Medium Alert Message')).toBeVisible();
    await expect(canvas.getByText('Large Alert Message')).toBeVisible();
  },
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
  play: async ({ canvas }) => {
    await waitForMotionAnimations({ canvas });
    await expect(canvas.getByText('Blue Alert Message')).toBeVisible();
    await expect(canvas.getByText('Purple Alert Message')).toBeVisible();
    await expect(canvas.getByText('Green Alert Message')).toBeVisible();
    await expect(canvas.getByText('Pink Alert Message')).toBeVisible();
    await expect(canvas.getByText('Yellow Alert Message')).toBeVisible();
    await expect(canvas.getByText('Teal Alert Message')).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children:
      'This is an alert with longer content that might wrap to multiple lines. It demonstrates how the alert handles longer text content while maintaining its layout and readability.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText(
        'This is an alert with longer content that might wrap to multiple lines. It demonstrates how the alert handles longer text content while maintaining its layout and readability.'
      )
    ).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
  },
};
