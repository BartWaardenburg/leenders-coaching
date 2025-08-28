import type { Meta, StoryObj } from '@storybook/nextjs';
import { Main } from './Main';

const meta = {
  title: 'UI/Main',
  component: Main,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Main Example',
  },
};
