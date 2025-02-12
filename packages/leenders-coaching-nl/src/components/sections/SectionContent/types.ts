import type { PastelColor } from '@/components/ui/Section';
import type { PortableTextBlock } from '@portabletext/react';

export type SectionContentProps = {
  title?: string;
  showBorder?: boolean;
  background?: PastelColor;
  border?: boolean;
  contentRaw?: PortableTextBlock[] | null;
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
};
