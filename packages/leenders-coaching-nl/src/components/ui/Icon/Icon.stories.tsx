import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Icon } from './Icon';
import { iconPaths } from '@/config/icons.config';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    path: {
      control: 'text',
      description: 'SVG path data for the icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Close: Story = {
  args: {
    path: iconPaths.close,
  },
  play: async ({ canvas }) => {
    // Wait for icon SVG to be present (icons have aria-hidden so can't use getByRole)
    expect(document.querySelector('svg')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const MenuHamburger: Story = {
  args: {
    path: iconPaths.menu.hamburger,
  },
  play: async ({ canvas }) => {
    // Wait for icon SVG to be present (icons have aria-hidden so can't use getByRole)
    expect(document.querySelector('svg')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const MenuClose: Story = {
  args: {
    path: iconPaths.menu.close,
  },
  play: async ({ canvas }) => {
    // Wait for icon SVG to be present (icons have aria-hidden so can't use getByRole)
    expect(document.querySelector('svg')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const ThemeSun: Story = {
  args: {
    path: iconPaths.theme.sun,
  },
  play: async ({ canvas }) => {
    // Wait for icon SVG to be present (icons have aria-hidden so can't use getByRole)
    expect(document.querySelector('svg')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const ThemeMoon: Story = {
  args: {
    path: iconPaths.theme.moon,
  },
  play: async ({ canvas }) => {
    // Wait for icon SVG to be present (icons have aria-hidden so can't use getByRole)
    expect(document.querySelector('svg')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const Message: Story = {
  args: {
    path: iconPaths.message,
  },
  play: async ({ canvas }) => {
    // Wait for icon SVG to be present (icons have aria-hidden so can't use getByRole)
    expect(document.querySelector('svg')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};
