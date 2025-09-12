import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/utilities/groq-queries';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Section } from '@/components/ui/Section';
import { Box } from '@/components/ui/Box';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Flex } from '@/components/ui/Flex';
import { SanityImage } from '@/components/ui/Image';
import type { Post } from '@/types/sanity/schema';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

/* Type for resolved blog post data from GROQ query */
type _ResolvedBlogPost = Omit<Post, 'categories'> & {
  categories?: Array<{ title: string }>;
  content?: unknown;
  metadata?: {
    title?: string;
    description?: string;
    openGraph?: unknown;
  };
};

/* Types for the blog post page */
type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* Generate metadata for the blog post */
export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  const post = (await getBlogPostBySlug(
    resolvedParams.slug
  )) as _ResolvedBlogPost;

  if (!post) {
    return {};
  }

  const { metadata, title, description } = post;

  return {
    title: metadata?.title || title || 'Untitled Post',
    description: metadata?.description || description || '',
    openGraph: metadata?.openGraph,
  };
};

/* Blog post page component */
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const resolvedParams = await params;
  const post = (await getBlogPostBySlug(
    resolvedParams.slug
  )) as _ResolvedBlogPost;

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
              {post.publishedAt &&
                format(new Date(post.publishedAt), 'd MMMM yyyy', {
                  locale: nl,
                })}
            </Text>
            <Flex gap={2}>
              {post.categories?.filter(Boolean).map((category) => (
                <Box
                  key={category.title}
                  className="bg-muted px-3 py-1 rounded-full"
                >
                  <Text variant="small">{category.title}</Text>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>

        {/* Featured Image */}
        {post.image && (
          <Box className="relative w-full h-[400px] mb-8">
            <SanityImage
              image={post.image as SanityImageSource}
              alt={post.title || 'Blog post image'}
              fill
              className="object-cover rounded-lg"
              priority
              followHotspot={true}
            />
          </Box>
        )}

        {/* Content */}
        {post.content && (
          <Box className="prose prose-lg max-w-none">
            <PortableText value={post.content} />
          </Box>
        )}
      </Box>
    </Section>
  );
};

export default BlogPostPage;
