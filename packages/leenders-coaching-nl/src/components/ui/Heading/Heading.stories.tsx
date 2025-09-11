import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Heading } from './Heading';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The heading level to use',
    },
    variant: {
      control: 'select',
      options: ['default', 'large', 'medium', 'small'],
      description: 'The visual style variant of the heading',
    },
    weight: {
      control: 'select',
      options: ['bold', 'normal'],
      description: 'The font weight of the heading',
    },
    spacing: {
      control: 'select',
      options: ['none', 'normal'],
      description: 'The bottom margin spacing of the heading',
    },
    color: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'The text color of the heading',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show a subtle border underneath the heading',
    },
    borderColor: {
      control: 'select',
      options: ['default', 'blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'The color of the border when showBorder is true',
    },
    children: {
      control: 'text',
      description: 'The content of the heading',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LargeHeading: Story = {
  args: {
    level: 'h1',
    variant: 'large',
    children: 'Large Heading',
    showBorder: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Large Heading' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const MediumHeading: Story = {
  args: {
    level: 'h2',
    variant: 'medium',
    children: 'Medium Heading',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Medium Heading' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const SmallHeading: Story = {
  args: {
    level: 'h2',
    variant: 'small',
    children: 'Small Heading',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Small Heading' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithBorder: Story = {
  args: {
    level: 'h2',
    children: 'Heading With Border',
    showBorder: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Heading With Border' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithColoredBorder: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Colored Border Example',
    level: 'h2',
  },
  render: (args) => (
    <div className="flex flex-col gap-8">
      <Heading {...args} showBorder borderColor="blue">
        Blue Border
      </Heading>
      <Heading {...args} showBorder borderColor="purple">
        Purple Border
      </Heading>
      <Heading {...args} showBorder borderColor="green">
        Green Border
      </Heading>
      <Heading {...args} showBorder borderColor="pink">
        Pink Border
      </Heading>
      <Heading {...args} showBorder borderColor="yellow">
        Yellow Border
      </Heading>
      <Heading {...args} showBorder borderColor="teal">
        Teal Border
      </Heading>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Blue Border' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Purple Border' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Green Border' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Pink Border' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Yellow Border' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Teal Border' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const MutedHeading: Story = {
  args: {
    level: 'h2',
    children: 'Muted Heading',
    color: 'muted',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Muted Heading' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NoSpacing: Story = {
  args: {
    level: 'h2',
    spacing: 'none',
    children: 'Heading Without Bottom Margin',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Heading Without Bottom Margin' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
