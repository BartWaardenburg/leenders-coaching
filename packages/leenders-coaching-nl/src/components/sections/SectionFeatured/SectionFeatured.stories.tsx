import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionFeatured } from './SectionFeatured';
import { mockFeaturedSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionFeatured',
  component: SectionFeatured,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'De titel van de sectie',
      required: true,
    },
    description: {
      control: 'text',
      description: 'De beschrijving tekst',
    },
    image: {
      control: 'text',
      description: 'Afbeelding URL of laat leeg voor placeholder',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur van de sectie',
    },
    border: {
      control: 'boolean',
      description: 'Toon boven- en onderranden',
    },
    reverse: {
      control: 'boolean',
      description: 'Keer de layout om (afbeelding rechts)',
    },
    cta: {
      control: 'object',
      description: 'Call-to-action knop configuratie',
    },
  },
} satisfies Meta<typeof SectionFeatured>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using centralized mock data
const defaultArgs = {
  title: mockFeaturedSection.displayTitle,
  description: mockFeaturedSection.description,
  image: mockFeaturedSection.image,
  cta: mockFeaturedSection.cta,
} as const;

export const Default: Story = {
  args: defaultArgs,
};

export const WithBackground: Story = {
  args: {
    ...defaultArgs,
    background: 'blue',
    border: true,
  },
};

export const Reversed: Story = {
  args: {
    ...defaultArgs,
    reverse: true,
  },
};

export const ReversedWithBackground: Story = {
  args: {
    ...defaultArgs,
    reverse: true,
    background: 'purple',
    border: true,
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'Sectie Zonder Afbeelding',
    description:
      'Deze sectie demonstreert de lay-out zonder afbeelding, toont alleen het inhoudsgebied.',
    image: null,
    background: 'green',
    border: true,
  },
};

export const WithoutCTA: Story = {
  args: {
    title: 'Sectie Zonder CTA',
    description: 'Deze sectie toont de lay-out zonder call-to-action knop.',
    image: 'https://picsum.photos/id/1015/1200/800',
    background: 'pink',
  },
};

export const MinimalContent: Story = {
  args: {
    title: 'Minimale Sectie',
    image: null,
    background: 'yellow',
  },
};

export const AllBackgroundVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    image: null,
  },
  render: () => (
    <div className="space-y-0">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (background) => (
          <SectionFeatured
            key={background}
            title={`${background.charAt(0).toUpperCase() + background.slice(1)} Achtergrond`}
            description={`Deze sectie demonstreert de ${background} achtergrond variant.`}
            image="https://picsum.photos/id/1018/1200/800"
            background={background}
            border={true}
            cta={{
              href: '#',
              label: 'Meer informatie',
              variant: background,
            }}
          />
        )
      )}
    </div>
  ),
};

export const AllCTAVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    image: null,
  },
  render: () => (
    <div className="space-y-0">
      {(
        [
          'black',
          'transparent',
          'blue',
          'purple',
          'green',
          'pink',
          'yellow',
          'teal',
        ] as const
      ).map((variant) => (
        <SectionFeatured
          key={variant}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} CTA Knop`}
          description={`Deze sectie demonstreert de ${variant} knop variant.`}
          image="https://picsum.photos/id/1025/1200/800"
          background="blue"
          cta={{
            href: '#',
            label: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Knop`,
            variant,
          }}
        />
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    title: 'Sectie Met Lange Inhoud',
    description:
      'Dit is een langere beschrijving die demonstreert hoe de sectie uitgebreidere tekstinhoud afhandelt. Het toont hoe de lay-out zich aanpast aan verschillende hoeveelheden inhoud terwijl het goede leesbaarheid en visuele hiërarchie behoudt. De tekst kan over meerdere regels lopen en de sectie zal het elegant afhandelen.',
    image: 'https://picsum.photos/id/1031/1200/800',
    background: 'teal',
    border: true,
    cta: {
      href: '#',
      label: 'Begin vandaag',
      variant: 'teal',
    },
  },
};
