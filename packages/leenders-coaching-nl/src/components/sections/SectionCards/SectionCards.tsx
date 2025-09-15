import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Grid } from '@/components/ui/Grid';
import { Box } from '@/components/ui/Box';

type SectionCardsProps = {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  background?: PastelColor;
  border?: boolean;
} & ComponentPropsWithoutRef<'section'>;

/**
 * Section component for displaying a grid of cards with optional title and description
 */
export const SectionCards = ({
  title,
  description,
  children,
  background,
  border,
  className,
  ...props
}: SectionCardsProps) => {
  return (
    <Section
      background={background}
      border={border}
      className={className}
      maxWidth="7xl"
      {...props}
    >
      <Stack gap={8}>
        {(title || description) && (
          <Stack space={4} className="text-center">
            {title && (
              <Heading
                level="h2"
                variant="large"
                showBorder
                borderColor={background}
                textAlign="center"
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
        <Box className="flex justify-center w-full">
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6} className="w-full">
            {children}
          </Grid>
        </Box>
      </Stack>
    </Section>
  );
};
