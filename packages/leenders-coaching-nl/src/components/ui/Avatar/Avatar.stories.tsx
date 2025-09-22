import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Avatar } from './Avatar';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'fill'],
      description: 'Grootte van de avatar',
    },
    src: {
      control: 'text',
      description: 'Afbeelding bron URL of laat leeg voor fallback',
    },
    alt: {
      control: 'text',
      description:
        'Alt tekst voor toegankelijkheid (gebruikt voor fallback initial)',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/300?img=5',
    alt: 'Avatar afbeelding',
    size: 'md',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Avatar afbeelding')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/300?img=6',
    alt: 'Kleine avatar',
    size: 'sm',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Kleine avatar')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/300?img=8',
    alt: 'Grote avatar',
    size: 'lg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Grote avatar')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllSizes: Story = {
  args: {
    src: 'https://i.pravatar.cc/300?img=9',
    alt: 'Avatar afbeelding',
  },
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar
        src="https://i.pravatar.cc/300?img=4"
        alt="Kleine avatar"
        size="sm"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=5"
        alt="Middelgrote avatar"
        size="md"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=7"
        alt="Grote avatar"
        size="lg"
      />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Kleine avatar')).toBeVisible();
    await expect(canvas.getByAltText('Middelgrote avatar')).toBeVisible();
    await expect(canvas.getByAltText('Grote avatar')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const FillSize: Story = {
  args: {
    src: 'https://i.pravatar.cc/300?img=10',
    alt: 'Vul avatar',
    size: 'fill',
  },
  render: (args) => (
    <div className="w-32 h-32">
      <Avatar {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Vul avatar')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const FallbackState: Story = {
  args: {
    alt: 'Jan Jansen',
    size: 'md',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('JJ')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllStates: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    alt: 'Avatar staten demo',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <Avatar
          src="https://i.pravatar.cc/300?img=4"
          alt="Kleine met afbeelding"
          size="sm"
        />
        <Avatar
          src="https://i.pravatar.cc/300?img=5"
          alt="Middelgrote met afbeelding"
          size="md"
        />
        <Avatar
          src="https://i.pravatar.cc/300?img=7"
          alt="Grote met afbeelding"
          size="lg"
        />
      </div>
      <div className="flex gap-4 items-center">
        <Avatar alt="Kleine fallback" size="sm" />
        <Avatar alt="Middelgrote fallback" size="md" />
        <Avatar alt="Grote fallback" size="lg" />
      </div>
      <div className="w-32 h-32">
        <Avatar
          src="https://i.pravatar.cc/300?img=10"
          alt="Vul met afbeelding"
          size="fill"
        />
      </div>
      <div className="w-32 h-32">
        <Avatar alt="Vul fallback" size="fill" />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Kleine met afbeelding')).toBeVisible();
    await expect(
      canvas.getByAltText('Middelgrote met afbeelding')
    ).toBeVisible();
    await expect(canvas.getByAltText('Grote met afbeelding')).toBeVisible();
    await expect(canvas.getByText('KF')).toBeVisible();
    await expect(canvas.getByText('MF')).toBeVisible();
    await expect(canvas.getByText('GF')).toBeVisible();
    await expect(canvas.getByAltText('Vul met afbeelding')).toBeVisible();
    await expect(canvas.getByText('VF')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
