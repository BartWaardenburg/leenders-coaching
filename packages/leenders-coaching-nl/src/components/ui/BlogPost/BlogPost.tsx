'use client';

import { FC } from 'react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Section } from '@/components/ui/Section';
import { Box } from '@/components/ui/Box';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Flex } from '@/components/ui/Flex';
import { SanityImage } from '@/components/ui/SanityImage';
import { ViewTransition } from '@/components/ui/ViewTransition';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { PortableText } from '@/components/ui/PortableText';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import type { PortableTextBlock } from '@portabletext/types';
import type { PastelVariant } from '@/utilities/tokens';

export type BlogPostData = {
  _id: string;
  title?: string;
  description?: string;
  slug?: {
    current?: string;
  };
  publishedAt?: string;
  categories?: Array<{
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    color?: string;
  }>;
  image?: SanityImageSource;
  featured?: boolean;
  variant?: PastelVariant;
  content?: unknown;
  metadata?: {
    title?: string;
    description?: string;
    openGraph?: unknown;
  };
};

interface BlogPostProps {
  /** The blog post data */
  post: BlogPostData;
  /** Optional className for styling */
  className?: string;
  /** Test ID for testing */
  testid?: string;
}

/**
 * BlogPost component for displaying individual blog post content
 * Handles the full blog post layout with header, image, content, and metadata
 */
export const BlogPost: FC<BlogPostProps> = ({
  post,
  className,
  testid,
  ...props
}) => {
  const {
    title,
    description,
    publishedAt,
    categories,
    image,
    content,
    slug,
    variant,
  } = post;
  const postSlug = slug?.current || 'unknown';

  return (
    <Section
      maxWidth="4xl"
      background={variant}
      className={className}
      data-testid={testid}
      {...props}
    >
      <Box className="w-full">
        {/* Header */}
        <Box className="mb-8">
          <ViewTransition name={`post-${postSlug}`}>
            <Heading level="h1" variant="large" showBorder>
              {title}
            </Heading>
          </ViewTransition>

          {description && (
            <ViewTransition name={`description-${postSlug}`}>
              <Text variant="muted" className="mt-4 text-lg">
                {description}
              </Text>
            </ViewTransition>
          )}

          <Flex gap={4} className="mt-6">
            <ViewTransition name={`date-${postSlug}`}>
              <Text variant="muted">
                {publishedAt &&
                  format(new Date(publishedAt), 'd MMMM yyyy', {
                    locale: nl,
                  })}
              </Text>
            </ViewTransition>

            {categories && categories.length > 0 && (
              <Flex gap={2} wrap="wrap">
                {categories.filter(Boolean).map((category) => (
                  <ViewTransition
                    key={category._id}
                    name={`category-${postSlug}-${category.title}`}
                  >
                    <Badge
                      variant={(category.color as BadgeVariant) || 'blue'}
                      testid={`category-${category._id}`}
                      url={`/blog/categorie/${category.slug.current}`}
                    >
                      {category.title}
                    </Badge>
                  </ViewTransition>
                ))}
              </Flex>
            )}
          </Flex>
        </Box>

        {/* Featured Image */}
        {image &&
          typeof image === 'object' &&
          'image' in image &&
          image.image?.asset && (
            <Box className="relative w-full h-[400px] mb-8">
              <SanityImage
                image={image.image}
                alt={image.alt || title || 'Blog post image'}
                fill
                className="object-cover"
                priority
                followHotspot={true}
              />
            </Box>
          )}

        {/* Content */}
        {content && (
          <ViewTransition name="content" update="none">
            <PortableText
              content={content as PortableTextBlock[]}
              testid="blog-post-content"
            />
          </ViewTransition>
        )}
      </Box>
    </Section>
  );
};

export default BlogPost;
