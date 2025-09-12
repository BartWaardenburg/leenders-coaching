import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Stack } from './Stack';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de stack',
    },
    space: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 'px', 'x-reverse', 'y-reverse'],
      description: 'Ruimte tussen elementen (margin)',
    },
    gap: {
      control: 'number',
      description: 'Gap tussen elementen (grid-like spacing)',
    },
    direction: {
      control: 'select',
      options: ['col', 'row'],
      description: 'Richting van de stack',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Uitlijning van elementen',
    },
    as: {
      control: 'text',
      description: 'HTML element om als te renderen',
    },
    testid: {
      control: 'text',
      description: 'Test ID voor testing',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Stack Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Stack Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
