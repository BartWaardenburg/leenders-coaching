import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DisableDraftMode } from './DisableDraftMode';

const meta: Meta<typeof DisableDraftMode> = {
  title: 'UI/DisableDraftMode',
  component: DisableDraftMode,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/blog/sample-post',
        query: {},
        asPath: '/blog/sample-post',
      },
    },
    docs: {
      description: {
        component:
          'Component to disable draft mode when viewing draft content outside of Presentation tool. Shows a floating toast-like button with edit icon in the bottom-right corner when not in an iframe. Features smooth animations, loading states, and Toast styling variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Visual style variant of the toast-like component',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DisableDraftMode>;

/**
 * Default state with blue variant
 * Shows a floating button with edit icon to disable draft mode
 * Note: This component only renders when not in an iframe and when mounted on the client
 */
export const Default: Story = {
  args: {
    variant: 'blue',
  },
};

/**
 * Purple variant
 * Shows a floating button with edit icon to disable draft mode
 */
export const PurpleVariant: Story = {
  args: {
    variant: 'purple',
  },
};

/**
 * Green variant
 */
export const GreenVariant: Story = {
  args: {
    variant: 'green',
  },
};

/**
 * Pink variant
 */
export const PinkVariant: Story = {
  args: {
    variant: 'pink',
  },
};

/**
 * With custom positioning
 */
export const WithCustomPosition: Story = {
  args: {
    variant: 'teal',
    className: 'bottom-8 right-8',
  },
};
