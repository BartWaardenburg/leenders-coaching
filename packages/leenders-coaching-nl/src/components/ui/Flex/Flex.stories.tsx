import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Flex } from './Flex';
import { Box } from '../Box/Box';

const meta = {
  title: 'UI/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'HTML element om als te renderen',
    },
    children: {
      control: 'text',
      description: 'Inhoud van de flex container',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Flex direction',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap gedrag',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Justify content',
    },
    items: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: 'Align items',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20],
      description: 'Gap tussen items',
    },
    divide: {
      control: 'select',
      options: ['x', 'y', 'x-reverse', 'y-reverse'],
      description: 'Divide richting',
    },
    testid: {
      control: 'text',
      description: 'Test ID voor testing',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Flex Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Flex Example')).toBeVisible();
  },
};

export const WithItems: Story = {
  args: {
    direction: 'row',
    gap: 4,
    justify: 'center',
    items: 'center',
    children: (
      <>
        <Box className="p-2 bg-primary text-primary-foreground">Item 1</Box>
        <Box className="p-2 bg-secondary text-secondary-foreground">Item 2</Box>
        <Box className="p-2 bg-muted text-muted-foreground">Item 3</Box>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Item 1')).toBeVisible();
    await expect(canvas.getByText('Item 2')).toBeVisible();
    await expect(canvas.getByText('Item 3')).toBeVisible();
  },
};

export const ColumnLayout: Story = {
  args: {
    direction: 'column',
    gap: 3,
    justify: 'start',
    items: 'stretch',
    children: (
      <>
        <Box className="p-4 bg-white shadow-sm">Header</Box>
        <Box className="p-4 bg-gray-100">Content</Box>
        <Box className="p-4 bg-white shadow-sm">Footer</Box>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Header')).toBeVisible();
    await expect(canvas.getByText('Content')).toBeVisible();
    await expect(canvas.getByText('Footer')).toBeVisible();
  },
};

export const WithDivide: Story = {
  args: {
    direction: 'row',
    gap: 0,
    divide: 'x',
    justify: 'between',
    items: 'center',
    children: (
      <>
        <Box className="p-4 bg-white">Left</Box>
        <Box className="p-4 bg-white">Center</Box>
        <Box className="p-4 bg-white">Right</Box>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Left')).toBeVisible();
    await expect(canvas.getByText('Center')).toBeVisible();
    await expect(canvas.getByText('Right')).toBeVisible();
  },
};

export const WrappedItems: Story = {
  args: {
    direction: 'row',
    wrap: 'wrap',
    gap: 3,
    justify: 'start',
    items: 'start',
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i} className="p-2 bg-primary text-primary-foreground w-20">
            {i % 2 === 0 ? 'Coaching' : 'Ontwikkeling'}
          </Box>
        ))}
      </>
    ),
  },
  play: async ({ canvas }) => {
    const coachingElements = canvas.getAllByText('Coaching');
    expect(coachingElements.length).toBeGreaterThan(0);
    await expect(coachingElements[0]).toBeVisible();

    const ontwikkelingElements = canvas.getAllByText('Ontwikkeling');
    expect(ontwikkelingElements.length).toBeGreaterThan(0);
    await expect(ontwikkelingElements[0]).toBeVisible();
  },
};
