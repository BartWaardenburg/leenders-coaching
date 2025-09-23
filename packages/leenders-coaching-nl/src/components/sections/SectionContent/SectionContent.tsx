import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Section } from '@/components/ui/Section';
import type { PastelVariant } from '@/utilities/tokens';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { PortableText } from '@/components/ui/PortableText';
import type { PortableTextBlock } from '@portabletext/react';

type SectionContentProps = Omit<
  ComponentPropsWithoutRef<'section'>,
  'content'
> & {
  /** The title of the section */
  title?: ReactNode;
  /** Optional description text */
  description?: ReactNode;
  /** Optional background color */
  background?: PastelVariant;
  /** Whether to show a border */
  border?: boolean;
  /** The main content as Portable Text blocks */
  content?: PortableTextBlock[];
};

/**
 * Section component for displaying Portable Text content with an optional title and description
 */
export const SectionContent = ({
  title,
  description,
  content,
  background,
  border = false,
  className,
  ...props
}: SectionContentProps) => {
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
        <Box className="mx-auto">
          <Box className="pt-6 max-w-3xl">
            {content && content.length > 0 && (
              <PortableText content={content} testid="portable-text" />
            )}
          </Box>
        </Box>
      </Stack>
    </Section>
  );
};
