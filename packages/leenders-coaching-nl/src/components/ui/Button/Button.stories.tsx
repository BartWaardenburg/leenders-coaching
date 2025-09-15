import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { Box } from '../Box/Box';
import { mockButtonVariants, mockLoadingStates } from '@/mocks';

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
      description: 'De visuele stijl variant van de knop',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'De grootte van de knop',
    },
    isLoading: {
      control: 'boolean',
      description: 'Of de knop in een laadstatus is',
    },
    disabled: {
      control: 'boolean',
      description: 'Of de knop uitgeschakeld is',
    },
    children: {
      control: 'text',
      description: 'De inhoud van de knop',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback functie wanneer de knop wordt geklikt',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: mockButtonVariants.primary.label,
    onClick: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button', {
      name: mockButtonVariants.primary.label,
    });
    await expect(button).toBeVisible();

    /* Test click interaction. */
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();

    /* Simple button interaction - no animation wait needed. */
  },
};

export const WithLoading: Story = {
  args: {
    children: mockLoadingStates.button.label,
    isLoading: true,
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { busy: true });
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();

    /* Test that clicking disabled button does not trigger onClick. */
    /* Note: Disabled buttons have pointer-events: none, so we cannot actually click them. */
    /* Instead, we verify the button is disabled and the onClick has not been called. */
    await expect(args.onClick).not.toHaveBeenCalled();

    /* Simple button interaction - no animation wait needed. */
  },
};

export const Disabled: Story = {
  args: {
    children: mockButtonVariants.secondary.label,
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', {
      name: mockButtonVariants.secondary.label,
    });
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();

    /* Test that clicking disabled button does not trigger onClick. */
    /* Note: Disabled buttons have pointer-events: none, so we cannot actually click them. */
    /* Instead, we verify the button is disabled and the onClick has not been called. */
    await expect(args.onClick).not.toHaveBeenCalled();

    /* Simple button interaction - no animation wait needed. */
  },
};

export const AsLink: Story = {
  args: {
    children: mockButtonVariants.primary.label,
    href: mockButtonVariants.primary.href,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: mockButtonVariants.primary.label })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: mockButtonVariants.primary.label })
    ).toHaveAttribute('href', mockButtonVariants.primary.href);
    /* Simple button interaction - no animation wait needed. */
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
    <Box className="flex flex-wrap gap-4">
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
    </Box>
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
    /* Simple button interaction - no animation wait needed. */
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
    <Box className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </Box>
  ),
  play: async ({ canvas, userEvent, args }) => {
    const smallButton = canvas.getByRole('button', { name: 'Small' });
    const mediumButton = canvas.getByRole('button', { name: 'Medium' });
    const largeButton = canvas.getByRole('button', { name: 'Large' });

    await expect(smallButton).toBeVisible();
    await expect(mediumButton).toBeVisible();
    await expect(largeButton).toBeVisible();

    /* Test clicking each button. */
    await userEvent.click(smallButton);
    await userEvent.click(mediumButton);
    await userEvent.click(largeButton);

    /* Verify onClick was called for each click. */
    await expect(args.onClick).toHaveBeenCalledTimes(3);

    /* Simple button interaction - no animation wait needed. */
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
  },
};
