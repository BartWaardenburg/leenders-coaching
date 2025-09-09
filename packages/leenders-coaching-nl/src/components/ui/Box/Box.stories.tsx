import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box } from './Box';

const meta = {
  title: 'UI/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Box Example',
  },
};
