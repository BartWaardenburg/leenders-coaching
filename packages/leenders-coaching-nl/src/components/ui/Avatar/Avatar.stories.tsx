import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Avatar } from './Avatar';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the avatar',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Avatar image',
    size: 'md',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Avatar image')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Small avatar',
    size: 'sm',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Small avatar')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Large avatar',
    size: 'lg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Large avatar')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllSizes: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Avatar image',
  },
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar src="https://i.pravatar.cc/300?1" alt="Small avatar" size="sm" />
      <Avatar src="https://i.pravatar.cc/300?2" alt="Medium avatar" size="md" />
      <Avatar src="https://i.pravatar.cc/300?3" alt="Large avatar" size="lg" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Small avatar')).toBeVisible();
    await expect(canvas.getByAltText('Medium avatar')).toBeVisible();
    await expect(canvas.getByAltText('Large avatar')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
