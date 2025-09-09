import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section } from './Section';

const meta = {
  title: 'UI/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Section Example',
  },
};
