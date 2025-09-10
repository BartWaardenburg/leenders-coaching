import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { PricingCard } from './PricingCard';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

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
    title: 'Kennismakingsgesprek',
    description:
      'Een vrijblijvend gesprek om kennis te maken en je doelen te bespreken.',
    price: 'Gratis',
    features: [
      { text: '30 minuten' },
      { text: 'Online of op locatie' },
      { text: 'Geen verplichtingen' },
    ],
    ctaLabel: 'Plan gesprek',
    onCtaClick: () => console.log('CTA clicked'),
    variant: 'blue',
  },
  play: async ({ canvas }) => {
    // Wait for pricing card to be visible
    await expect(canvas.getByText('Kennismakingsgesprek')).toBeVisible();
    await expect(canvas.getByText('Gratis')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Plan gesprek' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Popular: Story = {
  args: {
    title: 'Coaching traject',
    description: 'Een intensief coachingstraject om je doelen te bereiken.',
    price: '€85',
    features: [
      { text: '5 sessies van 1 uur' },
      { text: 'Persoonlijk actieplan' },
      { text: 'Online of op locatie' },
      { text: 'E-mail ondersteuning' },
    ],
    isPopular: true,
    ctaLabel: 'Start traject',
    onCtaClick: () => console.log('CTA clicked'),
    variant: 'purple',
  },
  play: async ({ canvas }) => {
    // Wait for popular pricing card to be visible
    await expect(canvas.getByText('Coaching traject')).toBeVisible();
    await expect(canvas.getByText('€85')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Start traject' })
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
    // Wait for extended pricing card to be visible
    await expect(canvas.getByText('Intensief traject')).toBeVisible();
    await expect(canvas.getByText('€75')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Start traject' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
