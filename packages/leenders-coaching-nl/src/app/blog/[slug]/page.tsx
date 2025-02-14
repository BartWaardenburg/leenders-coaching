import type { Metadata } from 'next';
import { getPost } from '@/graphql/pages/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

/**
 * Fetches data for a single blog post
 */
const getBlogPostData = async (slug: string) => {
  console.log('Fetching blog post with slug:', slug);
  const post = await getPost(slug);
  console.log('Found post:', post);
  if (!post) {
    notFound();
  }
  return { post };
};

/**
 * Generates metadata for the blog post
 */
export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { post } = await getBlogPostData(params.slug);

  const openGraphImage = post.image?.asset?.url && post.image.asset.metadata?.dimensions
    ? {
      images: [
        {
          url: post.image.asset.url,
          width: Number(post.image.asset.metadata.dimensions.width),
          height: Number(post.image.asset.metadata.dimensions.height),
          alt: post.title || 'Blog post image',
        },
      ],
    }
    : undefined;

  return {
    title: `${post.title} | Blog | Leenders Coaching`,
    description: post.description || undefined,
    openGraph: openGraphImage,
  };
};

/**
 * Blog post page component
 */
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { post } = await getBlogPostData(params.slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose prose-lg mx-auto">
        <h1 className="mb-4">{post.title}</h1>
        {post.image?.asset?.url && post.image.asset.metadata?.dimensions && (
          <div className="relative aspect-video mb-8">
            <Image
              src={post.image.asset.url}
              alt={post.title || 'Blog post image'}
              fill
              className="object-cover rounded-lg"
              sizes="(min-width: 1024px) 800px, 100vw"
              priority
            />
          </div>
        )}
        <div className="mt-8">
          {/* TODO: Implement rich text rendering */}
          {post.description}
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
