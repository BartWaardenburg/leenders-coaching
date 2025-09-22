import React from 'react';
import { Card, Text, Stack, Badge, Flex } from '@sanity/ui';
import { CalendarIcon, UserIcon } from '@sanity/icons';
import type { SanityDocument } from 'sanity';

type BlogPostPreviewProps = {
  document: SanityDocument;
};

/**
 * Custom preview component for blog posts in the Studio
 * Provides a rich preview with metadata and status
 */
export const BlogPostPreview = ({ document }: BlogPostPreviewProps) => {
  const { title, description, publishedAt, categories, featured, _rev } =
    document;

  return (
    <Card padding={3} radius={2} shadow={1}>
      <Stack space={3}>
        {/* Header with title and featured badge */}
        <Flex align="center" justify="space-between">
          <Text weight="bold" size={2}>
            {title || 'Untitled Post'}
          </Text>
          {featured && (
            <Badge tone="positive" size={1}>
              Featured
            </Badge>
          )}
        </Flex>

        {/* Description */}
        {description && (
          <Text size={1} muted>
            {description}
          </Text>
        )}

        {/* Metadata */}
        <Stack space={2}>
          {publishedAt && (
            <Flex align="center" gap={2}>
              <CalendarIcon />
              <Text size={1} muted>
                {new Date(publishedAt).toLocaleDateString()}
              </Text>
            </Flex>
          )}

          {categories && categories.length > 0 && (
            <Flex align="center" gap={2} wrap>
              <UserIcon />
              <Flex gap={1} wrap>
                {categories.map((category: any, index: number) => (
                  <Badge key={index} tone="primary" size={1}>
                    {category.title || category}
                  </Badge>
                ))}
              </Flex>
            </Flex>
          )}
        </Stack>

        {/* Draft indicator */}
        {_rev && _rev.startsWith('drafts.') && (
          <Badge tone="caution" size={1}>
            Draft
          </Badge>
        )}
      </Stack>
    </Card>
  );
};
