import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Alert } from './Alert';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { mockAlertData } from '@/mocks';

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
    children: mockAlertData.info.message,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(canvas.getByText(mockAlertData.info.message)).toBeVisible();
  },
};

export const WithCloseButton: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children: mockAlertData.warning.message,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(canvas.getByText(mockAlertData.warning.message)).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
  },
};

export const Small: Story = {
  args: {
    variant: 'blue',
    size: 'small',
    children: mockAlertData.success.message,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(canvas.getByText(mockAlertData.success.message)).toBeVisible();
  },
};

export const SmallWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'small',
    showCloseButton: true,
    children: mockAlertData.error.message,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(canvas.getByText(mockAlertData.error.message)).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
  },
};

export const Medium: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    children: 'Dit is een middelgrote waarschuwing bericht.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('Dit is een middelgrote waarschuwing bericht.')
    ).toBeVisible();
  },
};

export const MediumWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children: 'Dit is een middelgrote waarschuwing met een sluitknop.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('Dit is een middelgrote waarschuwing met een sluitknop.')
    ).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
  },
};

export const Large: Story = {
  args: {
    variant: 'blue',
    size: 'large',
    children: 'Dit is een grote waarschuwing bericht.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('Dit is een grote waarschuwing bericht.')
    ).toBeVisible();
  },
};

export const LargeWithClose: Story = {
  args: {
    variant: 'blue',
    size: 'large',
    showCloseButton: true,
    children: 'Dit is een grote waarschuwing met een sluitknop.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText('Dit is een grote waarschuwing met een sluitknop.')
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
    children: 'Waarschuwing Bericht',
    showCloseButton: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[500px]">
      <Alert {...args} size="small">
        Kleine Waarschuwing Bericht
      </Alert>
      <Alert {...args} size="medium">
        Middelgrote Waarschuwing Bericht
      </Alert>
      <Alert {...args} size="large">
        Grote Waarschuwing Bericht
      </Alert>
    </div>
  ),
  play: async ({ canvas }) => {
    await waitForMotionAnimations({ canvas });
    await expect(canvas.getByText('Kleine Waarschuwing Bericht')).toBeVisible();
    await expect(
      canvas.getByText('Middelgrote Waarschuwing Bericht')
    ).toBeVisible();
    await expect(canvas.getByText('Grote Waarschuwing Bericht')).toBeVisible();
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    size: 'medium',
    children: 'Waarschuwing Bericht',
    showCloseButton: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[500px]">
      <Alert {...args} variant="blue">
        Blauwe Waarschuwing Bericht
      </Alert>
      <Alert {...args} variant="purple">
        Paarse Waarschuwing Bericht
      </Alert>
      <Alert {...args} variant="green">
        Groene Waarschuwing Bericht
      </Alert>
      <Alert {...args} variant="pink">
        Roze Waarschuwing Bericht
      </Alert>
      <Alert {...args} variant="yellow">
        Gele Waarschuwing Bericht
      </Alert>
      <Alert {...args} variant="teal">
        Teal Waarschuwing Bericht
      </Alert>
    </div>
  ),
  play: async ({ canvas }) => {
    await waitForMotionAnimations({ canvas });
    await expect(canvas.getByText('Blauwe Waarschuwing Bericht')).toBeVisible();
    await expect(canvas.getByText('Paarse Waarschuwing Bericht')).toBeVisible();
    await expect(canvas.getByText('Groene Waarschuwing Bericht')).toBeVisible();
    await expect(canvas.getByText('Roze Waarschuwing Bericht')).toBeVisible();
    await expect(canvas.getByText('Gele Waarschuwing Bericht')).toBeVisible();
    await expect(canvas.getByText('Teal Waarschuwing Bericht')).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    variant: 'blue',
    size: 'medium',
    showCloseButton: true,
    children:
      'Dit is een waarschuwing met langere inhoud die mogelijk over meerdere regels kan lopen. Het demonstreert hoe de waarschuwing langere tekstinhoud afhandelt terwijl het de lay-out en leesbaarheid behoudt.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
    await expect(
      canvas.getByText(
        'Dit is een waarschuwing met langere inhoud die mogelijk over meerdere regels kan lopen. Het demonstreert hoe de waarschuwing langere tekstinhoud afhandelt terwijl het de lay-out en leesbaarheid behoudt.'
      )
    ).toBeVisible();
    await expect(canvas.getByLabelText('Sluit waarschuwing')).toBeVisible();
  },
};
