import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { ButtonGroup } from './ButtonGroup';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ButtonGroup Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('ButtonGroup Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
