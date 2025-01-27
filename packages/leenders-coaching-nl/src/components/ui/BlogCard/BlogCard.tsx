import type { ComponentPropsWithoutRef } from "react";

import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { AspectImage } from "@/components/ui/AspectImage";

export type BlogPost = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  slug: string;
  image: string;
};

type BlogCardProps = {
  post: BlogPost;
} & ComponentPropsWithoutRef<"div">;

/**
 * Card component for displaying blog post previews
 */
export const BlogCard = ({ post, className, ...props }: BlogCardProps) => {
  return (
    <Card
      href={`/blog/${post.slug}`}
      className={className}
      {...props}
    >
      <AspectImage
        src={post.image}
        alt={post.title}
        aspect="16/9"
        className="mb-4 rounded-lg"
      />
      <Heading level="h3" className="mb-2">
        {post.title}
      </Heading>
      <Text variant="muted" className="mb-4">
        {post.description}
      </Text>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Text>{post.date}</Text>
        <Text>{post.readingTime}</Text>
      </div>
    </Card>
  );
};
