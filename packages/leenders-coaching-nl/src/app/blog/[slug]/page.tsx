import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { type FC } from "react";

import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Article } from "@/components/ui/Article";
import { getPost } from "@/graphql/queries";
import {
  generateMetadata as createMetadata,
  generateArticleStructuredData,
} from "@/utilities/metadata";
import { formatDate } from "@/utilities/index";

type PageProps = {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPost(slug);

  if (!post?.title) {
    return createMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      noindex: true,
    });
  }

  /* Get base URL from environment or use default */
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://leenders-coaching.nl';
  const ogImageUrl = new URL('/api/og', baseUrl);

  const title = post.title;
  const description = post.bodyRaw?.[0]?.children?.[0]?.text;
  const imageUrl = post.image?.asset?.url;

  ogImageUrl.searchParams.set("title", title);
  if (description) {
    ogImageUrl.searchParams.set("description", description);
  }
  if (imageUrl) {
    ogImageUrl.searchParams.set("image", imageUrl);
  }

  const structuredData = generateArticleStructuredData({
    title,
    description: description ?? undefined,
    image: imageUrl ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    author: undefined,
  });

  return createMetadata({
    title,
    description: description || undefined,
    type: "article",
    images: [
      {
        url: ogImageUrl.toString(),
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    structuredData,
  });
}

/**
 * Individual blog post page component
 */
const BlogPostPage: FC<PageProps> = async ({ params }) => {
  const slug = (await params).slug;
  const post = await getPost(slug);

  if (!post?.title) {
    notFound();
  }

  return (
    <Section>
      <PageHeader
        title={post.title}
        description={post.publishedAt ? formatDate(post.publishedAt) : undefined}
      />
      <Article content={post.bodyRaw} />
    </Section>
  );
};

export default BlogPostPage;
