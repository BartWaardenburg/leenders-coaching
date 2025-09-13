import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionFeatured } from './SectionFeatured';

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

const defaultArgs = {
  title: 'Featured Section',
  description:
    'This is a featured section with an image and some descriptive text. It can be used to highlight important content or features.',
  image: 'https://picsum.photos/id/237/1200/800',
  cta: {
    href: '#',
    label: 'Meer informatie',
    variant: 'blue' as const,
  },
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
    title: 'Section Without Image',
    description:
      'This section demonstrates the layout without an image, showing only the content area.',
    image: null,
    background: 'green',
    border: true,
  },
};

export const WithoutCTA: Story = {
  args: {
    title: 'Section Without CTA',
    description:
      'This section shows the layout without a call-to-action button.',
    image: 'https://picsum.photos/id/1015/1200/800',
    background: 'pink',
  },
};

export const MinimalContent: Story = {
  args: {
    title: 'Minimal Section',
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
            title={`${background.charAt(0).toUpperCase() + background.slice(1)} Background`}
            description={`This section demonstrates the ${background} background variant.`}
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
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} CTA Button`}
          description={`This section demonstrates the ${variant} button variant.`}
          image="https://picsum.photos/id/1025/1200/800"
          background="blue"
          cta={{
            href: '#',
            label: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Button`,
            variant,
          }}
        />
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    title: 'Section with Long Content',
    description:
      'This is a longer description that demonstrates how the section handles more extensive text content. It shows how the layout adapts to different amounts of content while maintaining good readability and visual hierarchy. The text can span multiple lines and the section will handle it gracefully.',
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
