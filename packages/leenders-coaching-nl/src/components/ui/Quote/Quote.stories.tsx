import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Quote } from './Quote';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Quote',
  component: Quote,
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Life is what happens while you're busy making other plans.",
  },
  play: async ({ canvas }) => {
    // Wait for quote to be present (text may be broken up by quotes and animated)
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithCitation: Story = {
  args: {
    children: "Life is what happens while you're busy making other plans.",
    cite: 'John Lennon',
  },
  play: async ({ canvas }) => {
    // Wait for quote with citation to be present (text may be broken up by quotes and animated)
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    expect(canvas.getByText('John Lennon')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const LongQuote: Story = {
  args: {
    children:
      'Success is not final, failure is not fatal: it is the courage to continue that counts. In the midst of chaos, there is also opportunity. The only way to do great work is to love what you do.',
    cite: 'Multiple inspirational quotes combined',
  },
  play: async ({ canvas }) => {
    // Wait for long quote with citation to be present (text may be broken up by quotes and animated)
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    expect(
      canvas.getByText('Multiple inspirational quotes combined')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};
