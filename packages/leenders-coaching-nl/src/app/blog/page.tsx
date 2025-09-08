import type { Metadata } from 'next';
import type { BlogPage, Post } from '@/types/sanity/schema';
import { createPageComponent } from '@/utilities/page';
import { getBlogPosts } from '@/groq/queries';
import { client, urlForImage } from '@/utilities/sanity';
import { SectionBlog, type BlogPost } from '@/components/sections/SectionBlog';

/* Type for resolved post data from GROQ query */
type _ResolvedPost = Omit<Post, 'categories'> & {
  categories?: Array<{ title: string }>;
};

/* Type for blog section from BlogPage */
type BlogSection = Extract<
  NonNullable<BlogPage['sections']>[number],
  { _type: 'sectionBlog' }
>;

/*
 * Create page component with type, fallback title, and optional wrapper
 */
const { getMetadata } = createPageComponent<BlogPage>(
  'blogPage',
  'Blog | Leenders Coaching'
);

/* Generate metadata from Sanity data */
export const generateMetadata = (): Promise<Metadata> => getMetadata();

/* Blog page component */
const BlogPage = async () => {
  /* Get both page data and posts */
  const [pageData, posts] = await Promise.all([
    client.fetch<BlogPage>('*[_type == "blogPage"][0]'),
    getBlogPosts() as Promise<_ResolvedPost[]>,
  ]);

  console.log(posts);

  /* Transform posts to match SectionBlog format */
  const transformedPosts = posts.map((post: _ResolvedPost): BlogPost => {
    if (!post.slug?.current) {
      throw new Error(`Post "${post.title}" is missing a slug`);
    }

    return {
      title: post.title || 'Untitled Post',
      description: post.description || '',
      slug: post.slug.current || '',
      date: post.publishedAt || '',
      categories: post.categories?.map((cat) => cat.title) || [],
      image: post.image ? urlForImage(post.image).url() : '',
      featured: post.featured,
      variant: post.variant,
    };
  });

  /* Find the blog section from page data if it exists */
  const blogSection = pageData?.sections?.find(
    (section): section is BlogSection => section._type === 'sectionBlog'
  );

  return (
    <SectionBlog
      title={blogSection?.title || 'Blog'}
      description={
        blogSection?.description ||
        'Ontdek de laatste inzichten en verhalen over coaching en persoonlijke ontwikkeling.'
      }
      posts={transformedPosts}
      postsPerPage={blogSection?.postsPerPage || 6}
      background={blogSection?.background || 'blue'}
      border={blogSection?.border}
    />
  );
};

/* Default export is the page component */
export default BlogPage;
