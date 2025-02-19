import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { PortableText } from '@/components/ui/PortableText';
import type { PortableTextBlock } from '@portabletext/react';

type SectionContentProps = {
  title?: ReactNode;
  background?: PastelColor;
  border?: boolean;
  contentRaw?: PortableTextBlock[];
} & ComponentPropsWithoutRef<'section'>;

/**
 * Section component for displaying Portable Text content with an optional title
 */
export const SectionContent = ({
  title,
  contentRaw,
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
        {title && (
          <Box className="w-full">
            <Heading
              level="h2"
              variant="large"
              showBorder
              borderColor={background}
              textAlign="center"
            >
              {title}
            </Heading>
          </Box>
        )}
        <Box className="mx-auto">
          <Box className="pt-6 max-w-3xl">
            {contentRaw && <PortableText content={contentRaw} />}
          </Box>
        </Box>
      </Stack>
    </Section >
  );
};
