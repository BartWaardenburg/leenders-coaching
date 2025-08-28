import type { Meta, StoryObj } from '@storybook/nextjs';
import { Link } from './Link';

const meta = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'animated'],
      description: 'The visual style variant of the link',
    },
    linePosition: {
      control: 'select',
      options: ['above', 'below'],
      description: 'Position of the animated line (only for animated variant)',
    },
    lineStyle: {
      control: 'select',
      options: ['slide', 'move'],
      description: 'Animation style of the line (only for animated variant)',
    },
    href: {
      control: 'text',
      description: 'The URL the link points to',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Where to open the linked document',
    },
    children: {
      control: 'text',
      description: 'The content of the link',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '#',
  },
};

export const Subtle: Story = {
  args: {
    children: 'Subtle Link',
    href: '#',
    variant: 'subtle',
  },
};

export const AnimatedSlideBelow: Story = {
  args: {
    children: 'Animated Link (Slide Below)',
    href: '#',
    variant: 'animated',
    linePosition: 'below',
    lineStyle: 'slide',
  },
};

export const AnimatedSlideAbove: Story = {
  args: {
    children: 'Animated Link (Slide Above)',
    href: '#',
    variant: 'animated',
    linePosition: 'above',
    lineStyle: 'slide',
  },
};

export const AnimatedMoveBelow: Story = {
  args: {
    children: 'Animated Link (Move Below)',
    href: '#',
    variant: 'animated',
    linePosition: 'below',
    lineStyle: 'move',
  },
};

export const AnimatedMoveAbove: Story = {
  args: {
    children: 'Animated Link (Move Above)',
    href: '#',
    variant: 'animated',
    linePosition: 'above',
    lineStyle: 'move',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'External Link',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

export const ExternalLinkVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'External Link',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Link {...args}>Default External Link</Link>
      <Link {...args} variant="subtle">
        Subtle External Link
      </Link>
      <Link {...args} variant="animated" linePosition="below" lineStyle="slide">
        Animated External Link (Slide Below)
      </Link>
      <Link {...args} variant="animated" linePosition="above" lineStyle="slide">
        Animated External Link (Slide Above)
      </Link>
      <Link {...args} variant="animated" linePosition="below" lineStyle="move">
        Animated External Link (Move Below)
      </Link>
      <Link {...args} variant="animated" linePosition="above" lineStyle="move">
        Animated External Link (Move Above)
      </Link>
    </div>
  ),
};

export const WithLongText: Story = {
  args: {
    children:
      'This is a link with a longer text that might wrap to multiple lines to demonstrate how the link component handles longer content',
    href: '#',
  },
};
