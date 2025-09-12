import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Box } from './Box';

const meta = {
  title: 'UI/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'HTML element om als te renderen',
    },
    children: {
      control: 'text',
      description: 'Inhoud van de box',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Box Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Box Example')).toBeVisible();
  },
};
