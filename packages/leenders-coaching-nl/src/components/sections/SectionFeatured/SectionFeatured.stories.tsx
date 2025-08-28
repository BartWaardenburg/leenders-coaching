import type { Meta, StoryObj } from '@storybook/nextjs';
import { SectionFeatured } from './SectionFeatured';

const meta = {
  title: 'Sections/SectionFeatured',
  component: SectionFeatured,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
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
  image:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
  imageAlt: 'People working together',
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
