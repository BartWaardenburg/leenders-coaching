import type { ReactNode } from 'react';

import { Section, type SectionBaseProps } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Box } from '@/components/ui/Box';

interface SectionCardsProps extends SectionBaseProps {
  children: ReactNode;
}

/**
 * Section component for displaying a grid of cards with optional title and description
 */
export const SectionCards = ({
  children,
  maxWidth = '7xl',
  ...props
}: SectionCardsProps) => (
  <Section maxWidth={maxWidth} {...props}>
    <Box className="flex justify-center w-full">
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6} className="w-full">
        {children}
      </Grid>
    </Box>
  </Section>
);
