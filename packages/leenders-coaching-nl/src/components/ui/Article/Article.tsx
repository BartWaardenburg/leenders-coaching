import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PortableTextBlock } from '@portabletext/react';

import { Box } from '@/components/ui/Box';
import { PortableText } from '@/components/ui/PortableText';

type ArticleProps = {
  content: PortableTextBlock[];
} & ComponentPropsWithoutRef<'article'>;

/**
 * Article component for consistent content styling and structure
 */
export const Article = ({
  content,
  className,
  ...props
}: ArticleProps) => {
  return (
    <Box
      as="article"
      className={twMerge('mx-auto max-w-3xl', className)}
      {...props}
    >
      <PortableText content={content} />
    </Box>
  );
};
