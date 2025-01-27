import { PortableText as BasePortableText } from "@portabletext/react";
import type {
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";

import { Heading } from "@/components/ui/Heading";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <Heading level="h1">{children}</Heading>,
    h2: ({ children }) => <Heading level="h2">{children}</Heading>,
    h3: ({ children }) => <Heading level="h3">{children}</Heading>,
    normal: ({ children }) => <Text className="mb-4">{children}</Text>,
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
      <div className="my-8">
        <Image
          src={value?.asset?.url}
          alt={value?.alt || ""}
          width={800}
          height={400}
          className="rounded-lg"
        />
      </div>
    ),
  },
};

/**
 * Enhanced Portable Text component with themed components
 */
export const PortableText = ({ content }: { content: PortableTextBlock[] }) => {
  return <BasePortableText value={content} components={components} />;
};
