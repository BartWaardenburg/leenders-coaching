import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { PricingCard } from './PricingCard';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { mockPricingSection } from '@/mocks';

const meta = {
  title: 'UI/PricingCard',
  component: PricingCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
    },
  },
} satisfies Meta<typeof PricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: mockPricingSection.packages[0]?.title || 'Default Title',
    description:
      mockPricingSection.packages[0]?.description || 'Default Description',
    price: mockPricingSection.packages[0]?.price || '€0',
    features: mockPricingSection.packages[0]?.features || [],
    ctaLabel: mockPricingSection.packages[0]?.ctaLabel || 'Click Me',
    onCtaClick: () => console.log('CTA clicked'),
    variant: mockPricingSection.packages[0]?.variant || 'blue',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Starter Pakket')).toBeVisible();
    await expect(canvas.getByText('€150')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Boek Nu' })).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Popular: Story = {
  args: {
    title: mockPricingSection.packages[1]?.title || 'Popular Title',
    description:
      mockPricingSection.packages[1]?.description || 'Popular Description',
    price: mockPricingSection.packages[1]?.price || '€0',
    features: mockPricingSection.packages[1]?.features || [],
    isPopular: mockPricingSection.packages[1]?.isPopular || false,
    ctaLabel: mockPricingSection.packages[1]?.ctaLabel || 'Click Me',
    onCtaClick: () => console.log('CTA clicked'),
    variant: mockPricingSection.packages[1]?.variant || 'blue',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Professional Pakket')).toBeVisible();
    await expect(canvas.getByText('€400')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Start Nu' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Extended: Story = {
  args: {
    title: 'Intensief traject',
    description:
      'Een uitgebreid coachingstraject voor diepgaande transformatie.',
    price: '€75',
    features: [
      { text: '10 sessies van 1 uur' },
      { text: 'Persoonlijk actieplan' },
      { text: 'Online of op locatie' },
      { text: 'E-mail ondersteuning' },
      { text: '10% korting op vervolgsessies' },
    ],
    ctaLabel: 'Start traject',
    onCtaClick: () => console.log('CTA clicked'),
    variant: 'teal',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Intensief traject')).toBeVisible();
    await expect(canvas.getByText('€75')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Start traject' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
