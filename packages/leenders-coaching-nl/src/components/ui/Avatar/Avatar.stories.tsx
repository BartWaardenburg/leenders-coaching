import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Avatar } from './Avatar';
import { waitForMotionAnimations as _waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'fill'],
      description: 'Size of the avatar',
    },
    src: {
      control: 'text',
      description: 'Image source URL or leave empty for fallback',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility (used for fallback initial)',
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
    await _waitForMotionAnimations({ canvas });
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
    await _waitForMotionAnimations({ canvas });
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
    await _waitForMotionAnimations({ canvas });
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
    await _waitForMotionAnimations({ canvas });
  },
};

export const FillSize: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Fill avatar',
    size: 'fill',
  },
  render: (args) => (
    <div className="w-32 h-32">
      <Avatar {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Fill avatar')).toBeVisible();
    await _waitForMotionAnimations({ canvas });
  },
};

export const FallbackState: Story = {
  args: {
    alt: 'John Doe',
    size: 'md',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('J')).toBeVisible();
    await _waitForMotionAnimations({ canvas });
  },
};

export const AllStates: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    alt: 'Avatar states demo',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <Avatar
          src="https://i.pravatar.cc/300?1"
          alt="Small with image"
          size="sm"
        />
        <Avatar
          src="https://i.pravatar.cc/300?2"
          alt="Medium with image"
          size="md"
        />
        <Avatar
          src="https://i.pravatar.cc/300?3"
          alt="Large with image"
          size="lg"
        />
      </div>
      <div className="flex gap-4 items-center">
        <Avatar alt="Small fallback" size="sm" />
        <Avatar alt="Medium fallback" size="md" />
        <Avatar alt="Large fallback" size="lg" />
      </div>
      <div className="w-32 h-32">
        <Avatar
          src="https://i.pravatar.cc/300?4"
          alt="Fill with image"
          size="fill"
        />
      </div>
      <div className="w-32 h-32">
        <Avatar alt="Fill fallback" size="fill" />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Small with image')).toBeVisible();
    await expect(canvas.getByAltText('Medium with image')).toBeVisible();
    await expect(canvas.getByAltText('Large with image')).toBeVisible();
    await expect(canvas.getByText('S')).toBeVisible();
    await expect(canvas.getByText('M')).toBeVisible();
    await expect(canvas.getByText('L')).toBeVisible();
    await expect(canvas.getByAltText('Fill with image')).toBeVisible();
    await expect(canvas.getByText('F')).toBeVisible();
    await _waitForMotionAnimations({ canvas });
  },
};
