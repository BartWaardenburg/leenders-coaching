import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Quote } from './Quote';
import { mockCardData } from '@/mocks';

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
    children: mockCardData.testimonial.quote,
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};

export const WithCitation: Story = {
  args: {
    children: mockCardData.testimonial.quote,
    cite: mockCardData.testimonial.name,
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    expect(canvas.getByText(mockCardData.testimonial.name)).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};

export const LongQuote: Story = {
  args: {
    children:
      'Succes is niet definitief, falen is niet fataal: het is de moed om door te gaan die telt. Te midden van chaos is er ook kansen. De enige manier om geweldig werk te doen is om te houden van wat je doet.',
    cite: 'Meerdere inspirerende citaten gecombineerd',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('blockquote')).toBeInTheDocument();
    expect(
      canvas.getByText('Meerdere inspirerende citaten gecombineerd')
    ).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};
