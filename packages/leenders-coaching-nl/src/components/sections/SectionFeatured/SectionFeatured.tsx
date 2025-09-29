import type { ReactNode } from 'react';
import { ImageRenderer } from '@/components/ui/ImageRenderer';
import { isValidImage, type ImageSource } from '@/utilities/image';

import { Section, type SectionBaseProps } from '@/components/ui/Section';
import type { PastelVariant } from '@/utilities/tokens';
import { Grid } from '@/components/ui/Grid';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';

type CallToAction = {
  href?: string;
  label?: string;
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

interface SectionFeaturedProps extends SectionBaseProps {
  /** The title of the section */
  title?: ReactNode;
  /** The description text */
  description?: ReactNode;
  /** The image - can be a Sanity image object, static image, or string URL */
  image: ImageSource;
  /** Optional call-to-action button */
  cta?: CallToAction;
  /** Optional background color */
  background?: PastelVariant;
  /** Whether to show a border */
  border?: boolean;
  /** Whether to reverse the layout (image on right) */
  reverse?: boolean;
}

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
  noPadding = true,
  maxWidth,
  ...props
}: SectionFeaturedProps) => {
  const sectionClassName = className
    ? `pb-8 sm:pb-0 ${className}`
    : 'pb-8 sm:pb-0';

  const Content = (
    <Stack gap={6} className="max-w-lg" testid="content-stack" justify="center">
      {title && (
        <Heading level="h2" variant="medium">
          {title}
        </Heading>
      )}
      {description && <Text variant="large">{description}</Text>}
      {cta && cta.label && cta.href && (
        <Box className="m-2 flex justify-end">
          <Button href={cta.href} variant={cta.variant} size="lg">
            {cta.label}
          </Button>
        </Box>
      )}
    </Stack>
  );

  const ImageContainer = isValidImage(image) ? (
    <Box className="relative aspect-[4/3] w-full h-full sm:aspect-[16/9]">
      <ImageRenderer
        image={image}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 50vw"
        priority={true}
        followHotspot={true}
        qualityHint={80}
      />
    </Box>
  ) : (
    <Box className="relative aspect-[4/3] w-full h-full sm:aspect-[16/9] bg-muted" />
  );

  return (
    <Section
      maxWidth={maxWidth}
      background={background}
      border={border}
      noPadding={noPadding}
      className={sectionClassName}
      {...props}
    >
      <Grid
        cols={{
          base: 1,
          sm: 2,
        }}
        className="overflow-hidden"
        gap={0}
      >
        <Box
          className={`${reverse ? 'sm:order-2' : ''} ${
            reverse ? '-mr-4 sm:-mr-6 lg:-mr-12' : '-ml-4 sm:-ml-6 lg:-ml-12'
          }`}
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
