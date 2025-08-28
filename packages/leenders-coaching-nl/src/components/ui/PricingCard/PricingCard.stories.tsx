import type { Meta, StoryObj } from '@storybook/nextjs';
import { PricingCard } from './PricingCard';

const meta = {
  title: 'UI/PricingCard',
  component: PricingCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
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
};
