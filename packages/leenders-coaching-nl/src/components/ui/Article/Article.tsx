import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PortableTextBlock } from '@portabletext/react';

import { Box } from '@/components/ui/Box';
import { PortableText } from '@/components/ui/PortableText';

type ArticleProps = {
  content: PortableTextBlock[];
  maxWidth?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
} & ComponentPropsWithoutRef<'article'>;

/**
 * Article component for consistent content styling and structure
 */
export const Article = ({
  content,
  maxWidth = '3xl',
  className,
  ...props
}: ArticleProps) => {
  return (
    <Box
      as="article"
      className={twMerge('mx-auto', `max-w-${maxWidth}`, className)}
      {...props}
    >
      <PortableText content={content} />
    </Box>
  );
};
