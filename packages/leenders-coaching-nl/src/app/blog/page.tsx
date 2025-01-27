import { type FC } from "react";
import { type Metadata } from "next";

import { BlogCard, type BlogPost } from "@/components/ui/BlogCard";
import { Grid } from "@/components/ui/Grid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/sanity.queries";
import { formatDate, calculateReadingTime } from "@/utilities/index";
import { generateMetadata } from "@/utilities/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Blog & Insights",
  description:
    "Read our latest insights on coaching, personal development, and professional growth.",
  type: "article",
  images: [
    {
      url: "/blog-og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Leenders Coaching Blog",
    },
  ],
});

/**
 * Blog listing page component
 */
const BlogPage: FC = async () => {
  const posts = await getAllPosts();

  const blogPosts: BlogPost[] = posts.map((post) => ({
    title: post.title,
    description:
      post.body?.[0]?.children?.[0]?.text || "Preview of the blog post...",
    date: formatDate(post.publishedAt),
    image: post.imageUrl ?? "/images/blog/placeholder.jpg",
    slug: post.slug.current,
    readingTime: calculateReadingTime(post.body),
  }));

  return (
    <Section>
      <PageHeader
        title="Blog & Insights"
        description="Thoughts and advice on personal development, career growth, and life coaching"
      />
      <Grid columns={{ default: 1, md: 2 }} className="max-w-5xl">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Grid>
    </Section>
  );
};

export default BlogPage;
