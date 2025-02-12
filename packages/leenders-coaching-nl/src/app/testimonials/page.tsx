import type { FC } from 'react';

import { SectionHeader } from '@/components/sections/SectionHeader';

/**
 * Testimonials page component
 */
const TestimonialsPage: FC = () => {
  return (
    <SectionHeader
      title="Client Testimonials"
      description="Hear what others say about their coaching experience"
    />
  );
};

export default TestimonialsPage;
