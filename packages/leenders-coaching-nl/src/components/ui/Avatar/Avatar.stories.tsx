import type { Meta, StoryObj } from '@storybook/nextjs';
import { Avatar } from './Avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
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
};

export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Small avatar',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Large avatar',
    size: 'lg',
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
};
