import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionHeader } from './SectionHeader';
import { mockHeaderSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionHeader',
  component: SectionHeader,
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
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur van de sectie',
    },
    border: {
      control: 'boolean',
      description: 'Toon boven- en onderranden',
    },
    ctas: {
      control: 'object',
      description: 'Array van call-to-action knoppen (maximaal 2)',
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: mockHeaderSection.displayTitle,
    description: mockHeaderSection.description,
  },
};

export const WithBackground: Story = {
  args: {
    title: 'Sectie Met Achtergrond',
    description:
      'Deze sectie gebruikt een pastel achtergrondkleur die ook de koprand beïnvloedt.',
    background: 'purple',
  },
};

export const WithBackgroundAndBorders: Story = {
  args: {
    title: 'Sectie Met Achtergrond En Randen',
    description:
      'Deze sectie heeft een achtergrondkleur met bijpassende boven- en onderranden.',
    background: 'blue',
    border: true,
  },
};

export const WithButtons: Story = {
  args: {
    title: 'Sectie Met CTAs',
    description:
      'Deze sectie bevat call-to-action knoppen die rechts uitgelijnd zijn op desktop.',
    background: 'blue',
    border: true,
    ctas: [
      {
        href: '/contact',
        label: 'Aan de slag',
        variant: 'blue',
      },
      {
        href: '/about',
        label: 'Meer informatie',
        variant: 'transparent',
      },
    ],
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Sectie Zonder Beschrijving',
    background: 'pink',
    border: true,
    ctas: [
      {
        href: '/services',
        label: 'Bekijk diensten',
        variant: 'pink',
      },
    ],
  },
};

export const SingleCTA: Story = {
  args: {
    title: 'Enkele Call To Action',
    description: 'Soms heb je maar één duidelijke call to action nodig.',
    background: 'yellow',
    ctas: [
      {
        href: '/signup',
        label: 'Meld je nu aan',
        variant: 'yellow',
      },
    ],
  },
};

export const ExternalLinks: Story = {
  args: {
    title: 'Externe Links',
    description:
      'Deze sectie demonstreert externe links met juiste beveiligingsattributen.',
    background: 'teal',
    border: true,
    ctas: [
      {
        href: 'https://example.com',
        label: 'Externe link',
        variant: 'teal',
        isExternal: true,
      },
      {
        href: 'https://github.com',
        label: 'GitHub',
        variant: 'black',
        isExternal: true,
      },
    ],
  },
};

export const AllButtonVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {},
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
        <SectionHeader
          key={variant}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Knop Variant`}
          description={`Deze sectie demonstreert de ${variant} knop variant.`}
          background="blue"
          ctas={[
            {
              href: '#',
              label: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Knop`,
              variant,
            },
          ]}
        />
      ))}
    </div>
  ),
};

export const AllBackgroundVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {},
  render: () => (
    <div className="space-y-0">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (background) => (
          <SectionHeader
            key={background}
            title={`${background.charAt(0).toUpperCase() + background.slice(1)} Achtergrond`}
            description={`Deze sectie demonstreert de ${background} achtergrond variant.`}
            background={background}
            border={true}
            ctas={[
              {
                href: '#',
                label: 'Aan de slag',
                variant: background,
              },
            ]}
          />
        )
      )}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    title: 'Sectie Met Lange Inhoud En Meerdere CTAs',
    description:
      'Dit is een langere beschrijving die demonstreert hoe de sectie uitgebreidere tekstinhoud afhandelt. Het toont hoe de lay-out zich aanpast aan verschillende hoeveelheden inhoud terwijl het goede leesbaarheid en visuele hiërarchie behoudt. De tekst kan over meerdere regels lopen en de sectie zal het elegant afhandelen.',
    background: 'purple',
    border: true,
    ctas: [
      {
        href: '/contact',
        label: 'Begin vandaag',
        variant: 'purple',
      },
      {
        href: '/about',
        label: 'Meer over ons',
        variant: 'transparent',
      },
    ],
  },
};
