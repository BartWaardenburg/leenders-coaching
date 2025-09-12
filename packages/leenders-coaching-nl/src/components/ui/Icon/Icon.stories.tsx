import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { expect } from 'storybook/test';
import { Icon } from './Icon';
import { iconPaths } from '@/config/icons.config';
import { waitForMotionAnimations as _waitForMotionAnimations } from '../../../test/chromatic-utils';

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
    expect(document.querySelector('svg')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const MenuHamburger: Story = {
  args: {
    path: iconPaths.menu.hamburger,
  },
  play: async ({ canvas }) => {
    expect(document.querySelector('svg')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const MenuClose: Story = {
  args: {
    path: iconPaths.menu.close,
  },
  play: async ({ canvas }) => {
    expect(document.querySelector('svg')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const ThemeSun: Story = {
  args: {
    path: iconPaths.theme.sun,
  },
  play: async ({ canvas }) => {
    expect(document.querySelector('svg')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const ThemeMoon: Story = {
  args: {
    path: iconPaths.theme.moon,
  },
  play: async ({ canvas }) => {
    expect(document.querySelector('svg')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const Message: Story = {
  args: {
    path: iconPaths.message,
  },
  play: async ({ canvas }) => {
    expect(document.querySelector('svg')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const CustomSize: Story = {
  args: {
    path: iconPaths.close,
    className: 'w-12 h-12',
  },
  play: async ({ canvas }) => {
    expect(document.querySelector('svg')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const CustomColor: Story = {
  args: {
    path: iconPaths.theme.sun,
    className: 'text-blue-500',
  },
  play: async ({ canvas }) => {
    expect(document.querySelector('svg')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const AllIcons: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    path: iconPaths.close,
  },
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col items-center gap-2">
        <Icon path={iconPaths.close} />
        <span className="text-xs">Close</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon path={iconPaths.menu.hamburger} />
        <span className="text-xs">Menu</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon path={iconPaths.menu.close} />
        <span className="text-xs">Menu Close</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon path={iconPaths.theme.sun} />
        <span className="text-xs">Sun</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon path={iconPaths.theme.moon} />
        <span className="text-xs">Moon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon path={iconPaths.message} />
        <span className="text-xs">Message</span>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    expect(document.querySelectorAll('svg')).toHaveLength(6);
    await _waitForMotionAnimations({ canvas });
  },
};

export const InteractiveDemo: Story = {
  args: {
    path: iconPaths.close,
  },
  render: () => {
    const [currentIcon, setCurrentIcon] = React.useState<string>(
      iconPaths.close
    );
    const [iconSize, setIconSize] = React.useState('w-6 h-6');
    const [iconColor, setIconColor] = React.useState('text-primary');

    const icons = [
      { name: 'Close', path: iconPaths.close },
      { name: 'Menu', path: iconPaths.menu.hamburger },
      { name: 'Menu Close', path: iconPaths.menu.close },
      { name: 'Sun', path: iconPaths.theme.sun },
      { name: 'Moon', path: iconPaths.theme.moon },
      { name: 'Message', path: iconPaths.message },
    ];

    const sizes = [
      { name: 'Small', className: 'w-4 h-4' },
      { name: 'Medium', className: 'w-6 h-6' },
      { name: 'Large', className: 'w-8 h-8' },
      { name: 'Extra Large', className: 'w-12 h-12' },
    ];

    const colors = [
      { name: 'Primary', className: 'text-primary' },
      { name: 'Blue', className: 'text-blue-500' },
      { name: 'Red', className: 'text-red-500' },
      { name: 'Green', className: 'text-green-500' },
    ];

    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Icon Selector</h3>
          <div className="flex flex-wrap gap-2">
            {icons.map((icon) => (
              <button
                key={icon.name}
                onClick={() => setCurrentIcon(icon.path)}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
              >
                {icon.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Size Selector</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setIconSize(size.className)}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Color Selector</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setIconColor(color.className)}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="p-8 border rounded-lg bg-gray-50 flex items-center justify-center">
            <Icon path={currentIcon} className={`${iconSize} ${iconColor}`} />
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    // Test icon selection
    await userEvent.click(canvas.getByText('Menu'));
    expect(document.querySelector('svg')).toBeInTheDocument();

    // Test size selection
    await userEvent.click(canvas.getByText('Large'));
    expect(document.querySelector('svg')).toBeInTheDocument();

    // Test color selection
    await userEvent.click(canvas.getByText('Blue'));
    expect(document.querySelector('svg')).toBeInTheDocument();

    await _waitForMotionAnimations({ canvas });
  },
};
