import { PortableText as BasePortableText } from "@portabletext/react";
import type {
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";

import { Heading } from "@/components/ui/Heading";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { Box } from "@/components/ui/Box";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <Heading level="h1">{children}</Heading>,
    h2: ({ children }) => <Heading level="h2">{children}</Heading>,
    h3: ({ children }) => <Heading level="h3">{children}</Heading>,
    normal: ({ children }) => (
      <Box className="mb-4">
        <Text>{children}</Text>
      </Box>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Link href={value?.href} variant="underline">
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => (
      <Box className="my-8">
        <Image
          src={value?.asset?.url}
          alt={value?.alt || ""}
          width={800}
          height={400}
          className="rounded-lg"
        />
      </Box>
    ),
  },
};

/**
 * Enhanced Portable Text component with themed components
 */
export const PortableText = ({ content }: { content: PortableTextBlock[] }) => {
  return <BasePortableText value={content} components={components} />;
};
