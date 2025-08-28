import type { Meta, StoryObj } from '@storybook/nextjs'
import { SectionPricing } from './SectionPricing'

const meta = {
  title: 'Sections/SectionPricing',
  component: SectionPricing,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionPricing>

export default meta
type Story = StoryObj<typeof meta>

const defaultPackages = [
  {
    title: 'Kennismakingsgesprek',
    description: 'Een vrijblijvend gesprek om kennis te maken en je doelen te bespreken.',
    price: 'Gratis',
    features: [
      { text: '30 minuten' },
      { text: 'Online of op locatie' },
      { text: 'Geen verplichtingen' },
    ],
    ctaLabel: 'Plan gesprek',
    variant: 'teal' as const,
  },
  {
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
    variant: 'purple' as const,
  },
  {
    title: 'Intensief traject',
    description: 'Een uitgebreid coachingstraject voor diepgaande transformatie.',
    price: '€75',
    features: [
      { text: '10 sessies van 1 uur' },
      { text: 'Persoonlijk actieplan' },
      { text: 'Online of op locatie' },
      { text: 'E-mail ondersteuning' },
      { text: '10% korting op vervolgsessies' },
    ],
    ctaLabel: 'Start traject',
    variant: 'blue' as const,
  },
]

export const Default: Story = {
  args: {
    title: 'Coaching pakketten',
    description: 'Kies het pakket dat het beste bij jou past. Alle pakketten zijn inclusief een persoonlijke aanpak en flexibele planning.',
    packages: defaultPackages,
    onBooking: () => console.log('Booking clicked'),
  },
} 