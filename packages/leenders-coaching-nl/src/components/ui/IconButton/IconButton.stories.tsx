import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { IconButton } from './IconButton';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost'],
      description: 'The visual style variant of the button',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the button (used for aria-label)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the button',
    },
  },
  decorators: [
    (Story) => (
      <div className="text-foreground">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </svg>
);

export const Primary: Story = {
  args: {
    children: <SearchIcon />,
    label: 'Search',
    variant: 'primary',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Search' })).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Ghost: Story = {
  args: {
    children: <SearchIcon />,
    label: 'Search',
    variant: 'ghost',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Search' })).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Disabled: Story = {
  args: {
    children: <SearchIcon />,
    label: 'Search',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Search' });
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
    await waitForMotionAnimations({ canvas });
  },
};
