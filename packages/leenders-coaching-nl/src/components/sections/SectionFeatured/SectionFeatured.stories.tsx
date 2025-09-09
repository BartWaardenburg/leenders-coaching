import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionFeatured } from './SectionFeatured';

const meta = {
  title: 'Sections/SectionFeatured',
  component: SectionFeatured,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Background color of the section',
    },
    border: {
      control: 'boolean',
      description: 'Show top and bottom borders',
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse the layout (image on right)',
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
    label: 'Learn More',
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
