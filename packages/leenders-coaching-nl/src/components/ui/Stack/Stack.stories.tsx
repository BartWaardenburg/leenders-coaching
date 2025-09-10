import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Stack } from './Stack';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Stack Example',
  },
  play: async ({ canvas }) => {
    // Wait for stack content to be visible
    await expect(canvas.getByText('Stack Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
