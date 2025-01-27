import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getPost } from "@/lib/sanity.queries";
import {
  generateMetadata as createMetadata,
  generateArticleStructuredData,
} from "@/utilities/metadata";
import { formatDate } from "@/utilities/index";
import { PortableText } from "@portabletext/react";

type PageParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      noindex: true,
    });
  }

  // Create dynamic OG image URL
  const ogImageUrl = new URL("/api/og", process.env.NEXT_PUBLIC_BASE_URL);
  ogImageUrl.searchParams.set("title", post.title);
  if (post.body?.[0]?.children?.[0]?.text) {
    ogImageUrl.searchParams.set("description", post.body[0].children[0].text);
  }
  if (post.imageUrl) {
    ogImageUrl.searchParams.set("image", post.imageUrl);
  }

  const structuredData = generateArticleStructuredData({
    title: post.title,
    description: post.body?.[0]?.children?.[0]?.text,
    image: post.imageUrl,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: post.author?.name,
  });

  return createMetadata({
    title: post.title,
    description: post.body?.[0]?.children?.[0]?.text,
    type: "article",
    images: [
      {
        url: ogImageUrl.toString(),
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
    structuredData,
  });
}

/**
 * Individual blog post page component
 */
export default async function BlogPostPage({ params }: { params: PageParams }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose prose-lg dark:prose-invert mx-auto">
      <header className="text-center mb-8">
        <h1>{post.title}</h1>
        {post.publishedAt && (
          <time dateTime={post.publishedAt} className="text-muted-foreground">
            {formatDate(post.publishedAt)}
          </time>
        )}
      </header>
      <PortableText value={post.body} />
    </article>
  );
}
