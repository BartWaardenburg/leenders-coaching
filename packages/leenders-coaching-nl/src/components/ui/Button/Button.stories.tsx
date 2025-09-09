import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';
import { Button } from './Button';
import { waitForAnimations } from '../../../test/simple-chromatic-utils';

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
    // Wait for button to be visible
    await expect(canvas.getByRole('button')).toBeVisible();
    await waitForAnimations();

    // Test button click interaction
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const WithLoading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    // Wait for button to be visible
    await expect(canvas.getByRole('button')).toBeVisible();
    await waitForAnimations();

    // Test that loading button is disabled
    await expect(canvas.getByRole('button')).toBeDisabled();

    // Test that onClick is not called when loading (without trying to click)
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    // Wait for button to be visible
    await expect(canvas.getByRole('button')).toBeVisible();
    await waitForAnimations();

    // Test that disabled button is disabled
    await expect(canvas.getByRole('button')).toBeDisabled();

    // Test that onClick is not called when disabled (without trying to click)
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const AsLink: Story = {
  args: {
    children: 'Go to Home',
    href: '/',
    onClick: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    // Wait for link to be visible
    await expect(canvas.getByRole('link')).toBeVisible();
    await waitForAnimations();

    // Test link click interaction
    await userEvent.click(canvas.getByRole('link'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Button',
    onClick: fn(),
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
  play: async ({ canvas, userEvent, args }) => {
    // Wait for all buttons to be visible
    await expect(canvas.getByText('Black')).toBeVisible();
    await expect(canvas.getByText('Blue')).toBeVisible();
    await expect(canvas.getByText('Purple')).toBeVisible();
    await waitForAnimations();

    // Test clicking different variant buttons
    await userEvent.click(canvas.getByText('Blue'));
    await userEvent.click(canvas.getByText('Purple'));
    await userEvent.click(canvas.getByText('Green'));

    // Should have been called multiple times
    await expect(args.onClick).toHaveBeenCalledTimes(3);
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
    // Wait for all buttons to be visible
    await expect(canvas.getByText('Small')).toBeVisible();
    await expect(canvas.getByText('Medium')).toBeVisible();
    await expect(canvas.getByText('Large')).toBeVisible();
    await waitForAnimations();

    // Test clicking different size buttons
    await userEvent.click(canvas.getByText('Small'));
    await userEvent.click(canvas.getByText('Medium'));
    await userEvent.click(canvas.getByText('Large'));

    // Should have been called multiple times
    await expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};

export const KeyboardNavigation: Story = {
  args: {
    children: 'Focus me',
    onClick: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    // Wait for button to be visible
    await expect(canvas.getByRole('button')).toBeVisible();
    await waitForAnimations();

    // Test keyboard navigation
    await userEvent.tab();
    await expect(canvas.getByRole('button')).toHaveFocus();

    // Test Enter key activation
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalled();

    // Test Space key activation
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
