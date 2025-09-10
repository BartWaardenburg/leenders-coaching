import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Person } from './Person';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Person',
  component: Person,
} satisfies Meta<typeof Person>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    imageSrc: 'https://i.pravatar.cc/300',
  },
  play: async ({ canvas }) => {
    // Wait for person component to be present (may be animated)
    expect(canvas.getByText('John Doe')).toBeInTheDocument();
    expect(canvas.getByText('Software Engineer')).toBeInTheDocument();
    expect(canvas.getByRole('img')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithoutDescription: Story = {
  args: {
    name: 'Jane Smith',
    imageSrc: 'https://i.pravatar.cc/300?2',
  },
  play: async ({ canvas }) => {
    // Wait for person component without description to be present (may be animated)
    expect(canvas.getByText('Jane Smith')).toBeInTheDocument();
    expect(canvas.getByRole('img')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const LongDescription: Story = {
  args: {
    name: 'Alex Johnson',
    description: 'Senior Marketing Director & Brand Strategy Consultant',
    imageSrc: 'https://i.pravatar.cc/300?3',
  },
  play: async ({ canvas }) => {
    // Wait for person component with long description to be present (may be animated)
    expect(canvas.getByText('Alex Johnson')).toBeInTheDocument();
    expect(
      canvas.getByText('Senior Marketing Director & Brand Strategy Consultant')
    ).toBeInTheDocument();
    expect(canvas.getByRole('img')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};
