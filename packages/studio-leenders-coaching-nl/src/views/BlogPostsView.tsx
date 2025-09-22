import React from 'react';
import { Card, Text, Stack, Badge, Flex, Grid } from '@sanity/ui';
import { CalendarIcon, UserIcon } from '@sanity/icons';
import type { SanityDocument } from 'sanity';
import type { ReactElement } from 'react';

type BlogPostsViewProps = {
  documents?: SanityDocument[];
};

/**
 * Custom view for blog posts that provides a rich overview
 * Shows posts in a grid layout with metadata and status
 */
export const BlogPostsView = ({
  documents = [],
}: BlogPostsViewProps): ReactElement => {
  const publishedPosts = documents.filter(
    (doc) => !doc._id.startsWith('drafts.')
  );
  const draftPosts = documents.filter((doc) => doc._id.startsWith('drafts.'));

  return (
    <Stack space={4}>
      {/* Published Posts */}
      <Stack space={3}>
        <Text weight="bold" size={3}>
          Published Posts ({publishedPosts.length})
        </Text>
        <Grid columns={[1, 2, 3]} gap={3}>
          {publishedPosts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </Grid>
      </Stack>

      {/* Draft Posts */}
      {draftPosts.length > 0 && (
        <Stack space={3}>
          <Text weight="bold" size={3}>
            Draft Posts ({draftPosts.length})
          </Text>
          <Grid columns={[1, 2, 3]} gap={3}>
            {draftPosts.map((post) => (
              <BlogPostCard key={post._id} post={post} isDraft />
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
};

type BlogPostCardProps = {
  post: SanityDocument;
  isDraft?: boolean;
};

/**
 * Individual blog post card component
 */
const BlogPostCard = ({ post, isDraft = false }: BlogPostCardProps) => {
  const { title, description, publishedAt, categories, featured } = post;

  return (
    <Card
      padding={3}
      radius={2}
      shadow={1}
      tone={isDraft ? 'caution' : 'default'}
    >
      <Stack space={3}>
        {/* Header with title and badges */}
        <Flex align="center" justify="space-between">
          <Text weight="bold" size={2}>
            {title || 'Untitled Post'}
          </Text>
          <Flex gap={1}>
            {featured && (
              <Badge tone="positive" size={1}>
                Featured
              </Badge>
            )}
            {isDraft && (
              <Badge tone="caution" size={1}>
                Draft
              </Badge>
            )}
          </Flex>
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
                {categories.slice(0, 2).map((category: any, index: number) => (
                  <Badge key={index} tone="primary" size={1}>
                    {category.title || category}
                  </Badge>
                ))}
                {categories.length > 2 && (
                  <Text size={1} muted>
                    +{categories.length - 2} more
                  </Text>
                )}
              </Flex>
            </Flex>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
