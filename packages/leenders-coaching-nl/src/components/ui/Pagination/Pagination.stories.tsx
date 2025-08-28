import type { Meta, StoryObj } from '@storybook/nextjs'
import { Pagination } from './Pagination'
import { useState } from 'react'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/* Interactive story with state management */
const PaginationWithState = ({ totalPages }: { totalPages: number }) => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  )
}

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    onPageChange: () => { },
  },
  render: () => <PaginationWithState totalPages={10} />,
}

export const FewPages: Story = {
  args: {
    totalPages: 3,
    currentPage: 1,
    onPageChange: () => { },
  },
  render: () => <PaginationWithState totalPages={3} />,
}

export const ManyPages: Story = {
  args: {
    totalPages: 20,
    currentPage: 1,
    onPageChange: () => { },
  },
  render: () => <PaginationWithState totalPages={20} />,
} 