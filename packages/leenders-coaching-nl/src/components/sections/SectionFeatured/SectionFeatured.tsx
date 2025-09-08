import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import { SanityImage } from '@/components/ui/Image';

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
  /** The image - can be a Sanity image object, static image, or string URL */
  image: SanityImageSource | StaticImageData | string | null;
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
  cta,
  background,
  border = false,
  reverse = false,
  className,
  ...props
}: SectionFeaturedProps) => {
  const Content = (
    <Stack gap={6} className="justify-center max-w-lg" testid="content-stack">
      {title && (
        <Heading level="h2" variant="medium">
          {title}
        </Heading>
      )}
      {description && <Text className="text-lg">{description}</Text>}
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
      {/* Check if image is a Sanity image object (has asset property) */}
      {typeof image === 'object' && 'asset' in image ? (
        <SanityImage
          image={image as SanityImageSource}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          priority={true}
          followHotspot={true}
          qualityHint={80}
        />
      ) : (
        /* For static images or string URLs, use next/image */
        <Image
          src={image as string | StaticImageData}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          priority={true}
        />
      )}
    </Box>
  ) : (
    <Box className="relative aspect-[4/3] sm:aspect-[16/9] w-full h-full bg-muted" />
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
          sm: 2,
        }}
        className="overflow-hidden"
        gap={0}
      >
        <Box
          className={`${reverse ? 'sm:order-2' : ''} -ml-4 sm:-ml-6 lg:-ml-12`}
        >
          {ImageContainer}
        </Box>
        <Stack
          gap={6}
          className={`justify-center p-4 sm:p-8 md:p-12 lg:p-16 ${
            reverse ? 'sm:order-1' : ''
          }`}
          testid="stack"
        >
          {title || description ? Content : null}
        </Stack>
      </Grid>
    </Section>
  );
};
