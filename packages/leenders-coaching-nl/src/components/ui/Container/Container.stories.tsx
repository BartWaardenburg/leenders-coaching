import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Container } from './Container';

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
};
