import type { Meta, StoryObj } from '@storybook/react';
import { Metadata } from './Metadata';

const meta = {
  title: 'UI/Metadata',
  component: Metadata,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title',
    },
    description: {
      control: 'text',
      description: 'Page description',
    },
    keywords: {
      control: 'object',
      description: 'SEO keywords',
    },
    openGraph: {
      control: 'object',
      description: 'Open Graph metadata',
    },
    twitter: {
      control: 'object',
      description: 'Twitter metadata',
    },
  },
} satisfies Meta<typeof Metadata>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Professional Life Coaching Services',
    description:
      'Transform your life with professional coaching services. Expert guidance for personal and professional growth.',
    keywords: [
      'life coaching',
      'career coaching',
      'personal development',
      'professional growth',
    ],
    openGraph: {
      title: 'Professional Life Coaching Services | Leenders Coaching',
      description:
        'Transform your life with professional coaching services. Expert guidance for personal and professional growth.',
      type: 'website',
      siteName: 'Leenders Coaching',
      image: {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Leenders Coaching',
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: '@leenders-coaching',
      creator: '@leenders-coaching',
      image: {
        url: '/twitter-card.jpg',
        alt: 'Leenders Coaching',
      },
    },
  },
};
