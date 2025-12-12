import type { StaticImageData } from 'next/image';
import type { SanityImageSource } from '@sanity/image-url';

import { Section, type SectionBaseProps } from '@/components/ui/Section';
import { Box } from '@/components/ui/Box';
import { Quote } from '@/components/ui/Quote';
import { Person } from '@/components/ui/Person';
import { Carousel } from '@/components/ui/Carousel';

export type Testimonial = {
  /** The testimonial quote */
  quote: string;
  /** The name of the person */
  name: string;
  /** Optional role or description */
  role?: string;
  /** Image source (URL, StaticImageData, or SanityImageSource) */
  image?: string | StaticImageData | SanityImageSource;
};

interface SectionTestimonialProps extends SectionBaseProps {
  /** Array of testimonials */
  testimonials: Testimonial[];
}

const TestimonialSlide = ({ quote, name, role, image }: Testimonial) => (
  <Box className="w-full max-w-2xl mx-auto px-4">
    <Quote
      cite={
        <Person
          name={name}
          description={role}
          imageSrc={image || ''}
          className="max-w-xs mx-auto"
        />
      }
    >
      {quote}
    </Quote>
  </Box>
);

/**
 * Section component for displaying testimonials in a carousel
 */
export const SectionTestimonial = ({
  testimonials,
  maxWidth,
  ...props
}: SectionTestimonialProps) => {
  return (
    <Section maxWidth={maxWidth} {...props}>
      <Box className="mx-auto max-w-3xl">
        <Box className="p-8 -mx-4 sm:mx-0">
          <Carousel
            slides={testimonials.map((testimonial) => (
              <TestimonialSlide key={testimonial.name} {...testimonial} />
            ))}
          />
        </Box>
      </Box>
    </Section>
  );
};
