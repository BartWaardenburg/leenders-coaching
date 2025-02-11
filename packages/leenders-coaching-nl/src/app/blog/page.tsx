import { type FC } from "react";
import { type Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionCards } from "@/components/sections/SectionCards";
import { getAllPosts } from "@/graphql/queries";
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

  const blogPosts = posts
    .filter((post): post is NonNullable<typeof post> =>
      post?.title !== null &&
      post?.slug?.current !== null
    )
    .map((post) => ({
      title: post.title ?? "",
      description: post.bodyRaw?.[0]?.children?.[0]?.text || "Preview of the blog post...",
      date: formatDate(post.publishedAt),
      image: post.image?.asset?.url ?? "/images/blog/placeholder.jpg",
      slug: post.slug?.current ?? "",
      readingTime: calculateReadingTime(post.bodyRaw),
    }));

  return (
    <>
      <SectionHeader
        title="Blog & Insights"
        description="Thoughts and advice on personal development, career growth, and life coaching"
      />
      <SectionCards>
        {blogPosts.map((post) => (
          <Card
            key={post.slug}
            title={post.title}
            date={post.date}
            image={post.image}
            slug={post.slug}
            variant="blue"
          >
            {post.description}
          </Card>
        ))}
      </SectionCards>
    </>
  );
};

export default BlogPage;
