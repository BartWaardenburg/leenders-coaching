import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Image from 'next/image';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';

type CallToAction = {
  href: string;
  label: string;
  variant?:
  | 'black'
  | 'transparent'
  | 'blue'
  | 'purple'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'teal';
};

type SectionFeaturedProps = {
  /** The title of the section */
  title?: ReactNode;
  /** The description text */
  description?: ReactNode;
  /** The image source URL */
  image: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Optional call-to-action button */
  cta?: CallToAction;
  /** Optional background color */
  background?: PastelColor;
  /** Whether to show a border */
  border?: boolean;
  /** Whether to reverse the layout (image on right) */
  reverse?: boolean;
} & ComponentPropsWithoutRef<'section'>;

/**
 * A section component with a 50/50 layout featuring an image and content
 * The image can be positioned on the left (default) or right (reverse) side
 */
export const SectionFeatured = ({
  title,
  description,
  image,
  imageAlt,
  cta,
  background,
  border = false,
  reverse = false,
  className,
  ...props
}: SectionFeaturedProps) => {
  const Content = (
    <Stack gap={6} className="justify-center max-w-lg">
      {title && (
        <Heading level="h2" variant="medium">
          {title}
        </Heading>
      )}
      {description && (
        <Text className="text-lg">{description}</Text>
      )}
      {cta && (
        <Box className="mt-2 flex justify-end">
          <Button href={cta.href} variant={cta.variant} size="lg">
            {cta.label}
          </Button>
        </Box>
      )}
    </Stack>
  );

  const ImageContainer = image ? (
    <Box className="relative aspect-[4/3] sm:aspect-[16/9] w-full h-full">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 50vw"
        quality={80}
        priority={true}
      />
    </Box>
  ) : (
    <Box className="relative aspect-[4/3] sm:aspect-[16/9] w-full h-full bg-gray-100" />
  );

  return (
    <Section
      background={background}
      border={border}
      noPadding
      className={`pb-8 sm:pb-0 ${className}`}
      {...props}
    >
      <Grid
        columns={{
          default: 1,
          'sm': 2,
        }}
        className="overflow-hidden"
        gap={0}
      >
        <Box className={`${reverse ? 'sm:order-2' : ''} -ml-4 sm:-ml-6 lg:-ml-12`}>{ImageContainer}</Box>
        <Stack
          gap={6}
          className={`justify-center p-4 sm:p-8 md:p-12 lg:p-16 ${reverse ? 'sm:order-1' : ''
            }`}
        >
          {title || description ? Content : null}
        </Stack>
      </Grid>
    </Section>
  );
};
