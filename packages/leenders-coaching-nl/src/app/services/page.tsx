import { type FC } from 'react';
import { type Metadata } from 'next';

import { SectionHeader } from '@/components/sections/SectionHeader';
import { generateMetadata } from '@/utilities/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Our Services',
  description:
    'Discover our range of coaching services designed to help you achieve your personal and professional goals.',
  images: [
    {
      url: '/services-og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Leenders Coaching Services',
    },
  ],
});

/**
 * Services page showcasing available coaching options
 */
const ServicesPage: FC = () => {
  return (
    <SectionHeader
      title="Our Services"
      description="Personalized coaching services to help you reach your full potential"
    />
  );
};

export default ServicesPage;
