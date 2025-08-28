import type { Meta, StoryObj } from '@storybook/nextjs';
import { Stack } from './Stack';

const meta = {
  title: 'UI/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Stack Example',
  },
};
