import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Pagination } from './Pagination';
import { useState } from 'react';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Interactive story with state management */
const PaginationWithState = ({ totalPages }: { totalPages: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
};

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    onPageChange: () => {},
  },
  render: () => <PaginationWithState totalPages={10} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '1' })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Previous page' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Next page' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const FewPages: Story = {
  args: {
    totalPages: 3,
    currentPage: 1,
    onPageChange: () => {},
  },
  render: () => <PaginationWithState totalPages={3} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '1' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '2' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '3' })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Previous page' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Next page' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const ManyPages: Story = {
  args: {
    totalPages: 20,
    currentPage: 1,
    onPageChange: () => {},
  },
  render: () => <PaginationWithState totalPages={20} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '1' })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Previous page' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Next page' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
