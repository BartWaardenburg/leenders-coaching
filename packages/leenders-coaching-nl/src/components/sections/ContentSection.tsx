import type { PortableTextBlock } from "@portabletext/react";

import { Section } from "@/components/ui/Section";
import { Box } from "@/components/ui/Box";
import { PortableText } from "@/components/ui/PortableText";

type ContentSectionProps = {
  content: PortableTextBlock[];
  className?: string;
};

/**
 * Content section that renders Portable Text content with consistent styling
 */
export const ContentSection = ({
  content,
  className,
}: ContentSectionProps) => {
  return (
    <Section className={className}>
      <Box className="relative z-10">
        <PortableText content={content} />
      </Box>
    </Section>
  );
};
