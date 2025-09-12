import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Quote } from './Quote';

const meta = {
  title: 'UI/Quote',
  component: Quote,
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de quote',
    },
    cite: {
      control: 'text',
      description: 'Bron van de quote',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
  },
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Life is what happens while you're busy making other plans.",
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};

export const WithCitation: Story = {
  args: {
    children: "Life is what happens while you're busy making other plans.",
    cite: 'John Lennon',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    expect(canvas.getByText('John Lennon')).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};

export const LongQuote: Story = {
  args: {
    children:
      'Success is not final, failure is not fatal: it is the courage to continue that counts. In the midst of chaos, there is also opportunity. The only way to do great work is to love what you do.',
    cite: 'Multiple inspirational quotes combined',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    expect(
      canvas.getByText('Multiple inspirational quotes combined')
    ).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};
