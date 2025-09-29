import { Section, type SectionBaseProps } from '@/components/ui/Section';
import { Box } from '@/components/ui/Box';
import { PortableText } from '@/components/ui/PortableText';
import type { PortableTextBlock } from '@portabletext/react';

interface SectionContentProps extends SectionBaseProps {
  /** The main content as Portable Text blocks */
  content?: PortableTextBlock[];
}

/**
 * Section component for displaying Portable Text content with an optional title and description
 */
export const SectionContent = ({
  content,
  maxWidth = '7xl',
  ...props
}: SectionContentProps) => (
  <Section maxWidth={maxWidth} {...props}>
    <Box className="mx-auto justify-self-center">
      <Box className="pt-6 max-w-3xl">
        {content && content.length > 0 && (
          <PortableText content={content} testid="portable-text" />
        )}
      </Box>
    </Box>
  </Section>
);
