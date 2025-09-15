import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Grid } from './Grid';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de grid',
    },
    cols: {
      control: 'object',
      description: 'Responsieve kolom configuratie',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Gap tussen grid items',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
    as: {
      control: 'text',
      description: 'HTML element type',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cols: { base: 1, md: 2, lg: 3 },
    gap: 4,
    children: (
      <>
        <div className="p-4 bg-blue-100 rounded">Item 1</div>
        <div className="p-4 bg-blue-100 rounded">Item 2</div>
        <div className="p-4 bg-blue-100 rounded">Item 3</div>
        <div className="p-4 bg-blue-100 rounded">Item 4</div>
        <div className="p-4 bg-blue-100 rounded">Item 5</div>
        <div className="p-4 bg-blue-100 rounded">Item 6</div>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Item 1')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const FixedColumns: Story = {
  args: {
    cols: { base: 2 },
    gap: 6,
    children: (
      <>
        <div className="p-4 bg-green-100 rounded">Fixed 1</div>
        <div className="p-4 bg-green-100 rounded">Fixed 2</div>
        <div className="p-4 bg-green-100 rounded">Fixed 3</div>
        <div className="p-4 bg-green-100 rounded">Fixed 4</div>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fixed 1')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const SingleColumn: Story = {
  args: {
    cols: { base: 1 },
    gap: 8,
    children: (
      <>
        <div className="p-4 bg-purple-100 rounded">Single 1</div>
        <div className="p-4 bg-purple-100 rounded">Single 2</div>
        <div className="p-4 bg-purple-100 rounded">Single 3</div>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Single 1')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
