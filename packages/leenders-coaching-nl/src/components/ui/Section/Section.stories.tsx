import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Section } from './Section';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Section Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Section Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
