import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Link } from './Link';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { Box } from '../Box/Box';
import { mockNavigationData } from '@/mocks';

const meta = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'animated'],
      description: 'De visuele stijl variant van de link',
    },
    linePosition: {
      control: 'select',
      options: ['above', 'below'],
      description:
        'Positie van de geanimeerde lijn (alleen voor geanimeerde variant)',
    },
    lineStyle: {
      control: 'select',
      options: ['slide', 'move'],
      description:
        'Animaties stijl van de lijn (alleen voor geanimeerde variant)',
    },
    href: {
      control: 'text',
      description: 'De URL waar de link naar verwijst',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Waar het gelinkte document moet worden geopend',
    },
    children: {
      control: 'text',
      description: 'De inhoud van de link',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: mockNavigationData.main[0]?.label || 'Home',
    href: mockNavigationData.main[0]?.href || '/',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', {
        name: mockNavigationData.main[0]?.label || 'Home',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: mockNavigationData.main[0]?.label || 'Home',
      })
    ).toHaveAttribute('href', mockNavigationData.main[0]?.href || '/');
    await waitForMotionAnimations({ canvas });
  },
};

export const Subtle: Story = {
  args: {
    children: mockNavigationData.main[1]?.label || 'Over Mij',
    href: mockNavigationData.main[1]?.href || '/over-mij',
    variant: 'subtle',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', {
        name: mockNavigationData.main[1]?.label || 'Over Mij',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: mockNavigationData.main[1]?.label || 'Over Mij',
      })
    ).toHaveAttribute('href', mockNavigationData.main[1]?.href || '/over-mij');
    await waitForMotionAnimations({ canvas });
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
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Animated Link (Slide Below)' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Animated Link (Slide Below)' })
    ).toHaveAttribute('href', '#');
    await waitForMotionAnimations({ canvas });
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
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Animated Link (Slide Above)' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Animated Link (Slide Above)' })
    ).toHaveAttribute('href', '#');
    await waitForMotionAnimations({ canvas });
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
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Animated Link (Move Below)' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Animated Link (Move Below)' })
    ).toHaveAttribute('href', '#');
    await waitForMotionAnimations({ canvas });
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
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Animated Link (Move Above)' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Animated Link (Move Above)' })
    ).toHaveAttribute('href', '#');
    await waitForMotionAnimations({ canvas });
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'External Link',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', {
      name: 'External Link (opent in nieuw tabblad)',
    });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await waitForMotionAnimations({ canvas });
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
    <Box className="flex flex-col gap-4">
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
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', {
        name: 'Default External Link (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Subtle External Link (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Animated External Link (Slide Below) (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Animated External Link (Slide Above) (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Animated External Link (Move Below) (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Animated External Link (Move Above) (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithLongText: Story = {
  args: {
    children:
      'This is a link with a longer text that might wrap to multiple lines to demonstrate how the link component handles longer content',
    href: '#',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toBeVisible();
    await expect(
      canvas.getByText(
        'This is a link with a longer text that might wrap to multiple lines to demonstrate how the link component handles longer content'
      )
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
