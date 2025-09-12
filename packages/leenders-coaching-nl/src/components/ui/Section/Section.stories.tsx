import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Section } from './Section';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de sectie',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur van de sectie',
    },
    border: {
      control: 'boolean',
      description: 'Of er een rand rond de sectie moet worden getoond',
    },
    noPadding: {
      control: 'boolean',
      description: 'Of de standaard padding moet worden uitgeschakeld',
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
      description: 'Maximale breedte van de sectie',
    },
    testid: {
      control: 'text',
      description: 'Test ID voor testing',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Section Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Section Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
