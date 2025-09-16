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
    children: 'Geanimeerde Link (Slide Beneden)',
    href: '#',
    variant: 'animated',
    linePosition: 'below',
    lineStyle: 'slide',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Geanimeerde Link (Slide Beneden)' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Geanimeerde Link (Slide Beneden)' })
    ).toHaveAttribute('href', '#');
    await waitForMotionAnimations({ canvas });
  },
};

export const AnimatedSlideAbove: Story = {
  args: {
    children: 'Geanimeerde Link (Slide Boven)',
    href: '#',
    variant: 'animated',
    linePosition: 'above',
    lineStyle: 'slide',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Geanimeerde Link (Slide Boven)' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Geanimeerde Link (Slide Boven)' })
    ).toHaveAttribute('href', '#');
    await waitForMotionAnimations({ canvas });
  },
};

export const AnimatedMoveBelow: Story = {
  args: {
    children: 'Geanimeerde Link (Verplaats Beneden)',
    href: '#',
    variant: 'animated',
    linePosition: 'below',
    lineStyle: 'move',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Geanimeerde Link (Verplaats Beneden)' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Geanimeerde Link (Verplaats Beneden)' })
    ).toHaveAttribute('href', '#');
    await waitForMotionAnimations({ canvas });
  },
};

export const AnimatedMoveAbove: Story = {
  args: {
    children: 'Geanimeerde Link (Verplaats Boven)',
    href: '#',
    variant: 'animated',
    linePosition: 'above',
    lineStyle: 'move',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Geanimeerde Link (Verplaats Boven)' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: 'Geanimeerde Link (Verplaats Boven)' })
    ).toHaveAttribute('href', '#');
    await waitForMotionAnimations({ canvas });
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'Externe Link',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', {
      name: 'Externe Link (opent in nieuw tabblad)',
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
    children: 'Externe Link',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  render: (args) => (
    <Box className="flex flex-col gap-4">
      <Link {...args}>Standaard Externe Link</Link>
      <Link {...args} variant="subtle">
        Subtiele Externe Link
      </Link>
      <Link {...args} variant="animated" linePosition="below" lineStyle="slide">
        Geanimeerde Externe Link (Slide Beneden)
      </Link>
      <Link {...args} variant="animated" linePosition="above" lineStyle="slide">
        Geanimeerde Externe Link (Slide Boven)
      </Link>
      <Link {...args} variant="animated" linePosition="below" lineStyle="move">
        Geanimeerde Externe Link (Verplaats Beneden)
      </Link>
      <Link {...args} variant="animated" linePosition="above" lineStyle="move">
        Geanimeerde Externe Link (Verplaats Boven)
      </Link>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', {
        name: 'Standaard Externe Link (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Subtiele Externe Link (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Geanimeerde Externe Link (Slide Beneden) (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Geanimeerde Externe Link (Slide Boven) (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Geanimeerde Externe Link (Verplaats Beneden) (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', {
        name: 'Geanimeerde Externe Link (Verplaats Boven) (opent in nieuw tabblad)',
      })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithLongText: Story = {
  args: {
    children:
      'Dit is een link met langere tekst die mogelijk over meerdere regels kan lopen om te demonstreren hoe de link component langere inhoud afhandelt',
    href: '#',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toBeVisible();
    await expect(
      canvas.getByText(
        'Dit is een link met langere tekst die mogelijk over meerdere regels kan lopen om te demonstreren hoe de link component langere inhoud afhandelt'
      )
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
