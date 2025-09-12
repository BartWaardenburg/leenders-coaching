import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Grid } from './Grid';
import { waitForMotionAnimations as _waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Grid Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Grid Example')).toBeVisible();
    await _waitForMotionAnimations({ canvas });
  },
};
