import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';

type SectionFAQProps = {
  /** The title of the section */
  title?: ReactNode;
  /** Optional description text */
  description?: ReactNode;
  /** Array of FAQ items */
  items: FAQItem[];
  /** Optional background color */
  background?: PastelColor;
  /** Whether to show a border */
  border?: boolean;
} & ComponentPropsWithoutRef<'section'>;

/**
 * Section component for displaying a FAQ with optional title and description
 */
export const SectionFAQ = ({
  title,
  description,
  items,
  background,
  border = false,
  className,
  ...props
}: SectionFAQProps) => {
  return (
    <Section
      background={background}
      border={border}
      className={className}
      {...props}
    >
      <Box className="mx-auto max-w-3xl">
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
          <FAQ items={items} variant={background} />
        </Stack>
      </Box>
    </Section>
  );
};
