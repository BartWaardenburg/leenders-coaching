import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Button } from './Button';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'black',
        'transparent',
        'blue',
        'purple',
        'green',
        'pink',
        'yellow',
        'teal',
      ],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidthOnContainer: {
      control: 'boolean',
      description: 'Whether the button should take full width on container',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when the button is clicked',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvas }) => {
    // Wait for button to be visible
    await expect(
      canvas.getByRole('button', { name: 'Click me' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithLoading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
  play: async ({ canvas }) => {
    // Wait for loading button to be visible
    await expect(
      canvas.getByRole('button', { name: 'Loading...' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Loading...' })
    ).toBeDisabled();
    await waitForMotionAnimations({ canvas });
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  play: async ({ canvas }) => {
    // Wait for disabled button to be visible
    await expect(
      canvas.getByRole('button', { name: 'Disabled' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Disabled' })
    ).toBeDisabled();
    await waitForMotionAnimations({ canvas });
  },
};

export const AsLink: Story = {
  args: {
    children: 'Go to Home',
    href: '/',
  },
  play: async ({ canvas }) => {
    // Wait for link button to be visible
    await expect(
      canvas.getByRole('link', { name: 'Go to Home' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Go to Home' })
    ).toHaveAttribute('href', '/');
    await waitForMotionAnimations({ canvas });
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          'black',
          'transparent',
          'blue',
          'purple',
          'green',
          'pink',
          'yellow',
          'teal',
        ] as const
      ).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    // Wait for all variant buttons to be visible
    await expect(canvas.getByRole('button', { name: 'Black' })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Transparent' })
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Blue' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Purple' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Green' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Pink' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Yellow' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Teal' })).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllSizes: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
  play: async ({ canvas }) => {
    // Wait for all size buttons to be visible
    await expect(canvas.getByRole('button', { name: 'Small' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Medium' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Large' })).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
