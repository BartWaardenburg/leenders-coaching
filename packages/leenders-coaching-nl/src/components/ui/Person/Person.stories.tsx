import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Person } from './Person';

const meta = {
  title: 'UI/Person',
  component: Person,
} satisfies Meta<typeof Person>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Ingenieur',
    imageSrc: 'https://i.pravatar.cc/300?img=5',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('John Doe')).toBeInTheDocument();
    expect(canvas.getByText('Software Ingenieur')).toBeInTheDocument();
    expect(canvas.getByRole('img')).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};

export const WithoutDescription: Story = {
  args: {
    name: 'Jane Smith',
    imageSrc: 'https://i.pravatar.cc/300?img=6',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('Jane Smith')).toBeInTheDocument();
    expect(canvas.getByRole('img')).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};

export const LongDescription: Story = {
  args: {
    name: 'Alex Johnson',
    description: 'Senior Marketing Directeur & Merk Strategie Consultant',
    imageSrc: 'https://i.pravatar.cc/300?img=7',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('Alex Johnson')).toBeInTheDocument();
    expect(
      canvas.getByText('Senior Marketing Directeur & Merk Strategie Consultant')
    ).toBeInTheDocument();
    expect(canvas.getByRole('img')).toBeInTheDocument();
    // Simple static test - no animation wait needed
  },
};
