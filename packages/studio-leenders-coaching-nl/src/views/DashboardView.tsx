import { Card, Text, Stack, Badge, Flex, Grid, Button } from '@sanity/ui';
import { DocumentIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import type { SanityDocument } from 'sanity';

/**
 * Custom dashboard view for the Studio
 * Provides an overview of content status and quick actions
 */
export const DashboardView = (): ReactElement => {
  const client = useClient({ apiVersion: '2023-01-01' });
  const [documents, setDocuments] = useState<SanityDocument[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await client.fetch(
          '*[_type in ["post", "homePage", "aboutPage", "coachingPage", "approachPage", "contactPage", "blogPage"]]'
        );
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, [client]);
  const posts = documents.filter((doc) => doc._type === 'post');
  const pages = documents.filter((doc) =>
    [
      'homePage',
      'aboutPage',
      'coachingPage',
      'approachPage',
      'contactPage',
      'blogPage',
    ].includes(doc._type)
  );

  const publishedPosts = posts.filter((doc) => !doc._id.startsWith('drafts.'));
  const draftPosts = posts.filter((doc) => doc._id.startsWith('drafts.'));
  const recentPosts = posts
    .sort(
      (a, b) =>
        new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime()
    )
    .slice(0, 5);

  return (
    <Stack space={4}>
      {/* Quick Stats */}
      <Grid columns={[1, 2, 4]} gap={3}>
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <Text weight="bold" size={2}>
              {publishedPosts.length}
            </Text>
            <Text size={1} muted>
              Published Posts
            </Text>
          </Stack>
        </Card>

        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <Text weight="bold" size={2}>
              {draftPosts.length}
            </Text>
            <Text size={1} muted>
              Draft Posts
            </Text>
          </Stack>
        </Card>

        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <Text weight="bold" size={2}>
              {pages.length}
            </Text>
            <Text size={1} muted>
              Pages
            </Text>
          </Stack>
        </Card>

        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <Text weight="bold" size={2}>
              {documents.length}
            </Text>
            <Text size={1} muted>
              Total Documents
            </Text>
          </Stack>
        </Card>
      </Grid>

      {/* Recent Activity */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={3}>
          <Text weight="bold" size={3}>
            Recent Activity
          </Text>
          <Stack space={2}>
            {recentPosts.map((post) => (
              <Flex
                key={post._id}
                align="center"
                justify="space-between"
                padding={2}
              >
                <Flex align="center" gap={3}>
                  <DocumentIcon />
                  <Stack space={1}>
                    <Text weight="medium" size={2}>
                      {(post.title as string) || 'Untitled Post'}
                    </Text>
                    <Text size={1} muted>
                      {new Date(post._updatedAt).toLocaleDateString()}
                    </Text>
                  </Stack>
                </Flex>
                <Flex gap={1}>
                  {post._id.startsWith('drafts.') && (
                    <Badge tone="caution" size={1}>
                      Draft
                    </Badge>
                  )}
                  {(post.featured as boolean) && (
                    <Badge tone="positive" size={1}>
                      Featured
                    </Badge>
                  )}
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Quick Actions */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={3}>
          <Text weight="bold" size={3}>
            Quick Actions
          </Text>
          <Grid columns={[1, 2, 3]} gap={3}>
            <Button mode="ghost" tone="primary" text="Create New Post" />
            <Button mode="ghost" tone="primary" text="Edit Site Settings" />
            <Button mode="ghost" tone="primary" text="View Site" />
          </Grid>
        </Stack>
      </Card>
    </Stack>
  );
};
