import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
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
  /** Image source URL */
  image: string;
};

type SectionTestimonialProps = {
  /** The title of the section */
  title?: ReactNode;
  /** Optional description text */
  description?: ReactNode;
  /** Array of testimonials */
  testimonials: Testimonial[];
  /** Optional background color */
  background?: PastelColor;
  /** Whether to show a border */
  border?: boolean;
  /** Whether to show a border under the title */
  showBorder?: boolean;
  /** Maximum width of the content */
  maxWidth?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
} & ComponentPropsWithoutRef<'section'>;

const TestimonialSlide = ({ quote, name, role, image }: Testimonial) => (
  <Box className="w-full max-w-2xl mx-auto px-4">
    <Quote
      cite={
        <Person
          name={name}
          description={role}
          imageSrc={image}
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
  title,
  description,
  testimonials,
  background,
  border = false,
  showBorder = false,
  maxWidth = '3xl',
  className,
  ...props
}: SectionTestimonialProps) => {
  return (
    <Section
      background={background}
      border={border}
      className={twMerge('py-12', className)}
      {...props}
    >
      <Box className={twMerge('mx-auto', `max-w-${maxWidth}`)}>
        <Stack gap={12}>
          {(title || description) && (
            <Stack space={4} className="text-center">
              {title && (
                <Heading
                  level="h2"
                  variant="large"
                  showBorder={showBorder}
                  borderColor={background}
                >
                  {title}
                </Heading>
              )}
              {description && (
                <Text variant="large" className="max-w-2xl mx-auto">
                  {description}
                </Text>
              )}
            </Stack>
          )}
          <Box className="py-8 -mx-4 sm:mx-0">
            <Carousel
              slides={testimonials.map((testimonial) => (
                <TestimonialSlide key={testimonial.name} {...testimonial} />
              ))}
            />
          </Box>
        </Stack>
      </Box>
    </Section>
  );
};
