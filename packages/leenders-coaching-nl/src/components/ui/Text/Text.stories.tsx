import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Text } from './Text';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Text Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Text Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
