import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/utilities/groq-queries';
import { BlogPost, type BlogPostData } from '@/components/ui/BlogPost';
import {
  generateBlogPostMetadata,
  type ResolvedBlogPost,
} from '@/utilities/metadata';

/* Types for the blog post page */
type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Generate metadata for the blog post using shared utility
 */
export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  const post = (await getBlogPostBySlug(
    resolvedParams.slug
  )) as ResolvedBlogPost;

  return await generateBlogPostMetadata(post, resolvedParams.slug);
};

/* Blog post page component */
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const resolvedParams = await params;
  const post = (await getBlogPostBySlug(
    resolvedParams.slug
  )) as ResolvedBlogPost;

  if (!post) {
    notFound();
  }

  /* Transform the post data to match BlogPostData interface */
  const blogPostData: BlogPostData = {
    _id: post._id,
    title: post.title || 'Untitled Post',
    description: post.description,
    slug: post.slug ? { current: post.slug.current } : undefined,
    publishedAt: post.publishedAt || '',
    categories: post.categories
      ?.filter((category) => category != null)
      .map((category) => ({
        _id: category._id,
        title: category.title,
        slug: category.slug,
        color: category.color,
      })),
    image: post.image,
    featured: post.featured,
    variant: post.variant,
    content: post.content,
    metadata: post.metadata,
  };

  return <BlogPost post={blogPostData} testid="blog-post-page" />;
};

export default BlogPostPage;
