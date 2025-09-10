import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

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
};

export const WithLoading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const AsLink: Story = {
  args: {
    children: 'Go to Home',
    href: '/',
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
};
