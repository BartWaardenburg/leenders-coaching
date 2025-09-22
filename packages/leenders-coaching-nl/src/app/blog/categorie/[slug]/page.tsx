import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCategoryBySlug,
  getPostsByCategorySlug,
  getCategories,
} from '@/utilities/groq-queries';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import {
  transformBlogPosts,
  type ResolvedPost,
  generateBlogCategoryMetadata,
} from '@/utilities/blog';
import type { Category } from '@/types/sanity/schema';

/* Types for the category page */
type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Generate metadata for the category page using shared utility
 */
export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  return await generateBlogCategoryMetadata(
    category as Category,
    resolvedParams.slug
  );
};

/**
 * Generate static params for all category pages
 */
export const generateStaticParams = async () => {
  const categories = (await getCategories(false)) as Category[];

  return categories.map((category: Category) => ({
    slug: category.slug!.current,
  }));
};

/**
 * Category page component
 */
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const resolvedParams = await params;

  /* Get category data and posts */
  const [category, posts] = await Promise.all([
    getCategoryBySlug(resolvedParams.slug) as Promise<Category>,
    getPostsByCategorySlug(resolvedParams.slug) as Promise<ResolvedPost[]>,
  ]);

  if (!category) {
    notFound();
  }

  /* Transform posts to match SectionBlog format using shared utility */
  const transformedPosts = transformBlogPosts(posts as ResolvedPost[]);

  /* Create sections array with optional header and blog section */
  const sections = [];

  /* Add header section if it exists */
  if ((category as Category).header) {
    sections.push({
      ...(category as Category).header,
      _type: 'sectionHeader',
      _key: 'category-header',
    });
  }

  /* Add blog section with category-specific posts */
  sections.push({
    _type: 'sectionBlog',
    _key: 'category-blog',
    title: `${(category as Category).title} - Blog Artikelen`,
    description:
      (category as Category).description ||
      `Ontdek alle blog artikelen in de categorie ${(category as Category).title}.`,
    posts: transformedPosts,
    postsPerPage: 6,
    background: (category as Category).color || 'blue',
    border: true,
  });

  /* Render the sections */
  return (
    <>
      {sections.map((section, index) => {
        if (!section._type) return null;

        const sectionType = String(section._type);
        const sectionKey = section._key || `section-${index}`;

        return (
          <SectionRenderer
            key={sectionKey}
            type={sectionType}
            data={section as unknown as Record<string, unknown>}
          />
        );
      })}
    </>
  );
};

export default CategoryPage;
