import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { ThemeToggleButton } from './ThemeToggleButton';
import { waitForMotionAnimations as _waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/ThemeToggleButton',
  component: ThemeToggleButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
} satisfies Meta<typeof ThemeToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'text-foreground',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeVisible();
    await _waitForMotionAnimations({ canvas });
  },
};
