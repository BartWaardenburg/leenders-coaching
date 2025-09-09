import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ButtonGroup Example',
  },
};
