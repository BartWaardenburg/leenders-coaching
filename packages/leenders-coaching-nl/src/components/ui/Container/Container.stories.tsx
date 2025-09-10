import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Container } from './Container';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Container Example',
  },
  play: async ({ canvas }) => {
    // Wait for container content to be visible
    await expect(canvas.getByText('Container Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
