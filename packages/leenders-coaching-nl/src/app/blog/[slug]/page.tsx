import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POST_BY_SLUG_QUERY } from '@/groq/queries';
import { client, urlForImage } from '@/utilities/sanity';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Section } from '@/components/ui/Section';
import { Box } from '@/components/ui/Box';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Flex } from '@/components/ui/Flex';
import Image from 'next/image';

/* Types for the blog post page */
type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* Generate metadata for the blog post */
export const generateMetadata = async ({ params }: BlogPostPageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY(resolvedParams.slug));

  if (!post) {
    return {};
  }

  const { metadata = {}, title, description } = post;

  return {
    title: metadata.title || title,
    description: metadata.description || description,
    openGraph: metadata.openGraph,
  };
};

/* Blog post page component */
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const resolvedParams = await params;
  const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY(resolvedParams.slug));

  if (!post) {
    notFound();
  }

  return (
    <Section maxWidth="4xl">
      <Box className="w-full">
        {/* Header */}
        <Box className="mb-8">
          <Heading level="h1" variant="large" showBorder>
            {post.title}
          </Heading>
          <Flex gap={4} className="mt-4">
            <Text variant="muted">
              {format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: nl })}
            </Text>
            <Flex gap={2}>
              {post.categories.map((category: string) => (
                <Box
                  key={category}
                  className="bg-gray-100 px-3 py-1 rounded-full"
                >
                  <Text variant="small">{category}</Text>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>

        {/* Featured Image */}
        {post.image && (
          <Box className="relative w-full h-[400px] mb-8">
            <Image
              src={urlForImage(post.image).url()}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </Box>
        )}

        {/* Content */}
        <Box className="prose prose-lg max-w-none">
          <PortableText value={post.content} />
        </Box>
      </Box>
    </Section>
  );
};

export default BlogPostPage; 