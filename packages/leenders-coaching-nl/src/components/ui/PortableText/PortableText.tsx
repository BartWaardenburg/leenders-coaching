import { PortableText as BasePortableText } from '@portabletext/react';
import type {
  PortableTextComponents,
  PortableTextBlock,
} from '@portabletext/react';
import { SanityImage } from '@/components/ui/SanityImage';

import { Heading } from '@/components/ui/Heading';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';

type LinkAnnotation = {
  _type: 'link';
  href: string;
  blank?: boolean;
};

type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type?: 'reference';
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
};

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <Heading level="h1" variant="large">
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading level="h2" variant="medium">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading level="h3" variant="small">
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading level="h4" variant="small">
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading level="h5" variant="small">
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading level="h6" variant="small">
        {children}
      </Heading>
    ),
    normal: ({ children }) => (
      <Text as="div" className="mb-4">
        {children}
      </Text>
    ),
    blockquote: ({ children }) => (
      <Box
        as="blockquote"
        className="pl-4 border-l-4 border-gray-300 my-4 italic"
      >
        {children}
      </Box>
    ),
    bullet: ({ children }) => (
      <Text as="div" className="mb-4">
        {children}
      </Text>
    ),
    number: ({ children }) => (
      <Text as="div" className="mb-4">
        {children}
      </Text>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-pastel-blue/40 dark:bg-pastel-blue-dark/40 px-1 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    strike: ({ children }) => <span className="line-through">{children}</span>,
    highlight: ({ children }) => (
      <span className="bg-pastel-yellow/40 dark:bg-pastel-yellow-dark/40 px-1">
        {children}
      </span>
    ),
    link: ({
      value,
      children,
    }: {
      value?: LinkAnnotation;
      children: React.ReactNode;
    }) => {
      const target = value?.blank ? '_blank' : undefined;
      const rel = value?.blank ? 'noopener noreferrer' : undefined;
      return (
        <Link
          href={value?.href ?? '#'}
          variant="subtle"
          target={target}
          rel={rel}
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null;

      return (
        <Box className="my-8">
          <Box className="relative border border-foreground/80 h-48 md:h-[400px] w-full overflow-hidden bg-pastel-blue dark:bg-pastel-blue-dark">
            <SanityImage
              image={value}
              alt={value?.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              followHotspot={true}
              qualityHint={80}
            />
          </Box>
          {value?.caption && (
            <Text
              as="figcaption"
              variant="muted"
              textAlign="center"
              className="mt-2"
            >
              {value.caption}
            </Text>
          )}
        </Box>
      );
    },
    callToAction: ({ value }) => (
      <div className="my-4">
        <Button
          href={value?.url}
          variant="blue"
          size="md"
          target={value?.isExternal ? '_blank' : undefined}
        >
          {value?.text}
        </Button>
      </div>
    ),
    code: ({ value }) => (
      <pre className="bg-pastel-blue/20 dark:bg-pastel-blue-dark/20 border border-foreground/80 p-4 my-4 overflow-x-auto">
        <code className="font-mono text-sm">{value?.code}</code>
      </pre>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
};

type PortableTextProps = {
  /** Array of Portable Text blocks */
  content: PortableTextBlock[];
  /** Optional className for the wrapper */
  className?: string;
  /** Test ID for the component */
  testid?: string;
};

/**
 * Enhanced Portable Text component with themed components
 * Supports various block types, marks, and custom components
 */
export const PortableText = ({
  content,
  className,
  testid,
}: PortableTextProps) => {
  return (
    <Box className={className} data-testid={testid}>
      <BasePortableText value={content} components={components} />
    </Box>
  );
};
