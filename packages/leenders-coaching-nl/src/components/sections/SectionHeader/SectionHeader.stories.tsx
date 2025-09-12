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
      description: 'The title of the section',
    },
    description: {
      control: 'text',
      description: 'The description text',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Background color of the section',
    },
    border: {
      control: 'boolean',
      description: 'Show top and bottom borders',
    },
    primaryCta: {
      control: 'object',
      description: 'Primary call-to-action button configuration',
    },
    secondaryCta: {
      control: 'object',
      description: 'Secondary call-to-action button configuration',
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section Title',
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
      label: 'Get Started',
    },
    secondaryCta: {
      href: '/about',
      label: 'Learn More',
    },
  },
};

export const WithoutTitle: Story = {
  args: {
    description: 'This section demonstrates the layout without a title.',
    background: 'green',
    primaryCta: {
      href: '/contact',
      label: 'Contact Us',
      variant: 'green',
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
      label: 'View Services',
      variant: 'pink',
    },
  },
};

export const SingleCTA: Story = {
  args: {
    title: 'Single Call to Action',
    description: 'Sometimes you only need one clear call to action.',
    background: 'yellow',
    primaryCta: {
      href: '/signup',
      label: 'Sign Up Now',
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
      label: 'External Link',
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
              label: 'Get Started',
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
      label: 'Get Started Today',
      variant: 'purple',
    },
    secondaryCta: {
      href: '/about',
      label: 'Learn More About Us',
      variant: 'transparent',
    },
  },
};
