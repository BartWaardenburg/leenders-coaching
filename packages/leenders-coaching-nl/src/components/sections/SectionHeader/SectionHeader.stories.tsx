import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionHeader } from './SectionHeader';

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
    primaryCta: {
      control: 'object',
      description: 'Primaire call-to-action knop configuratie',
    },
    secondaryCta: {
      control: 'object',
      description: 'Secundaire call-to-action knop configuratie',
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sectie titel',
    description:
      'This is a description text that provides more context about this section.',
  },
};

export const WithBackground: Story = {
  args: {
    title: 'Section With Background',
    description:
      'This section uses a pastel background color that also affects the heading border.',
    background: 'purple',
  },
};

export const WithBackgroundAndBorders: Story = {
  args: {
    title: 'Section With Background and Borders',
    description:
      'This section has a background color with matching top and bottom borders.',
    background: 'blue',
    border: true,
  },
};

export const WithButtons: Story = {
  args: {
    title: 'Section With CTAs',
    description:
      'This section includes call-to-action buttons that are right-aligned on desktop.',
    background: 'blue',
    border: true,
    primaryCta: {
      href: '/contact',
      label: 'Aan de slag',
    },
    secondaryCta: {
      href: '/about',
      label: 'Meer informatie',
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Section Without Description',
    background: 'pink',
    border: true,
    primaryCta: {
      href: '/services',
      label: 'Bekijk diensten',
      variant: 'pink',
    },
  },
};

export const SingleCTA: Story = {
  args: {
    title: 'Single Call to Action',
    description: 'Soms heb je maar één duidelijke call to action nodig.',
    background: 'yellow',
    primaryCta: {
      href: '/signup',
      label: 'Meld je nu aan',
      variant: 'yellow',
    },
  },
};

export const ExternalLinks: Story = {
  args: {
    title: 'External Links',
    description:
      'This section demonstrates external links with proper security attributes.',
    background: 'teal',
    border: true,
    primaryCta: {
      href: 'https://example.com',
      label: 'Externe link',
      variant: 'teal',
      isExternal: true,
    },
    secondaryCta: {
      href: 'https://github.com',
      label: 'GitHub',
      variant: 'black',
      isExternal: true,
    },
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
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Button Variant`}
          description={`This section demonstrates the ${variant} button variant.`}
          background="blue"
          primaryCta={{
            href: '#',
            label: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Button`,
            variant,
          }}
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
            title={`${background.charAt(0).toUpperCase() + background.slice(1)} Background`}
            description={`This section demonstrates the ${background} background variant.`}
            background={background}
            border={true}
            primaryCta={{
              href: '#',
              label: 'Aan de slag',
              variant: background,
            }}
          />
        )
      )}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    title: 'Section with Long Content and Multiple CTAs',
    description:
      'This is a longer description that demonstrates how the section handles more extensive text content. It shows how the layout adapts to different amounts of content while maintaining good readability and visual hierarchy. The text can span multiple lines and the section will handle it gracefully.',
    background: 'purple',
    border: true,
    primaryCta: {
      href: '/contact',
      label: 'Begin vandaag',
      variant: 'purple',
    },
    secondaryCta: {
      href: '/about',
      label: 'Meer over ons',
      variant: 'transparent',
    },
  },
};
