import type { Meta, StoryObj } from '@storybook/react';
import { Quote } from './Quote';

const meta = {
  title: 'UI/Quote',
  component: Quote,
  tags: ['autodocs'],
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Life is what happens while you're busy making other plans.",
  },
};

export const WithCitation: Story = {
  args: {
    children: "Life is what happens while you're busy making other plans.",
    cite: 'John Lennon',
  },
};

export const LongQuote: Story = {
  args: {
    children:
      'Success is not final, failure is not fatal: it is the courage to continue that counts. In the midst of chaos, there is also opportunity. The only way to do great work is to love what you do.',
    cite: 'Multiple inspirational quotes combined',
  },
};
