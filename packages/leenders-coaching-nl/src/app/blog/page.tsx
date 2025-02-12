import type { Metadata } from 'next';
import { getAllPosts } from '@/graphql/queries';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { SectionCards } from '@/components/sections/SectionCards';
import { Card } from '@/components/ui/Card';

/**
 * Fetches data for the Blog page
 */
const getBlogPageData = async () => {
  const posts = await getAllPosts();
  return { posts };
};

/**
 * Generates metadata for the Blog page
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getBlogPageData();

  return {
    title: 'Blog | Leenders Coaching',
    description: 'Lees de laatste artikelen over coaching en persoonlijke ontwikkeling.',
  };
};

/**
 * Blog overview page component
 */
const BlogPage = async () => {
  const { posts } = await getBlogPageData();

  return (
    <main>
      <SectionHeader
        title="Blog"
        description="Lees de laatste artikelen over coaching en persoonlijke ontwikkeling"
        background="pink"
      />
      <SectionCards>
        {posts.map((post) => (
          <Card
            key={post._id}
            title={post.title || ''}
            image={post.image?.asset?.url || undefined}
            slug={post.slug?.current || ''}
            date={post.publishedAt || undefined}
          >
            {post.description}
          </Card>
        ))}
      </SectionCards>
    </main>
  );
};

export default BlogPage;
