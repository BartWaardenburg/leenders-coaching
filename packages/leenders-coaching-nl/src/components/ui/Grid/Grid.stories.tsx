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
    maxColumns: {
      control: 'number',
      description: 'Maximaal aantal kolommen',
    },
    columns: {
      control: 'object',
      description: 'Responsieve kolom configuratie',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Gap tussen grid items',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
    maxWidth: {
      control: 'select',
      options: [
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
      ],
      description: 'Maximale breedte van de grid',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Grid Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Grid Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
