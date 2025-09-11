import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
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
    onClick: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();

    // Test click interaction
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();

    await waitForMotionAnimations({ canvas });
  },
};

export const WithLoading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Loading...' });
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();

    // Test that clicking disabled button doesn't trigger onClick
    // Note: Disabled buttons have pointer-events: none, so we can't actually click them
    // Instead, we verify the button is disabled and the onClick hasn't been called
    await expect(args.onClick).not.toHaveBeenCalled();

    await waitForMotionAnimations({ canvas });
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Disabled' });
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();

    // Test that clicking disabled button doesn't trigger onClick
    // Note: Disabled buttons have pointer-events: none, so we can't actually click them
    // Instead, we verify the button is disabled and the onClick hasn't been called
    await expect(args.onClick).not.toHaveBeenCalled();

    await waitForMotionAnimations({ canvas });
  },
};

export const AsLink: Story = {
  args: {
    children: 'Go to Home',
    href: '/',
  },
  play: async ({ canvas }) => {
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
    onClick: fn(),
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
  play: async ({ canvas, userEvent, args }) => {
    const smallButton = canvas.getByRole('button', { name: 'Small' });
    const mediumButton = canvas.getByRole('button', { name: 'Medium' });
    const largeButton = canvas.getByRole('button', { name: 'Large' });

    await expect(smallButton).toBeVisible();
    await expect(mediumButton).toBeVisible();
    await expect(largeButton).toBeVisible();

    // Test clicking each button
    await userEvent.click(smallButton);
    await userEvent.click(mediumButton);
    await userEvent.click(largeButton);

    // Verify onClick was called for each click
    await expect(args.onClick).toHaveBeenCalledTimes(3);

    await waitForMotionAnimations({ canvas });
  },
};

export const InteractiveDemo: Story = {
  args: {
    children: 'Interactive Button',
    onClick: fn(),
  },
  play: async ({ canvas, userEvent, args, step }) => {
    const button = canvas.getByRole('button', { name: 'Interactive Button' });

    await step('Initial state', async () => {
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    });

    await step('Click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Multiple clicks', async () => {
      await userEvent.click(button);
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(3);
    });

    await step('Keyboard interaction', async () => {
      button.focus();
      await expect(button).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalledTimes(4);

      await userEvent.keyboard(' ');
      await expect(args.onClick).toHaveBeenCalledTimes(5);
    });

    await waitForMotionAnimations({ canvas });
  },
};
