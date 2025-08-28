import type { Meta, StoryObj } from '@storybook/nextjs';
import { ThemeToggleButton } from './ThemeToggleButton';

const meta = {
  title: 'UI/ThemeToggleButton',
  component: ThemeToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
} satisfies Meta<typeof ThemeToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'text-foreground',
  },
};
