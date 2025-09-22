'use client';

import { useState, useRef } from 'react';
import { Section } from '@/components/ui/Section';
import type { PastelVariant } from '@/utilities/tokens';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { Pagination } from '@/components/ui/Pagination';
import { ViewTransition } from '@/components/ui/ViewTransition';
import { extractSanityImage } from '@/utilities/image';

import type { ImageSource } from '@/utilities/image';

export type BlogPost = {
  title: string;
  description: string;
  slug: string;
  date: string;
  categories: string[];
  image: ImageSource;
  featured?: boolean;
  variant?: PastelVariant;
};

interface SectionBlogProps {
  /** The title of the section */
  title?: string;
  /** The description text */
  description: string;
  /** Array of blog posts to display */
  posts?: BlogPost[];
  /**
   * Number of posts per page
   * @default 6
   */
  postsPerPage?: number;
  className?: string;
  /** Optional background color */
  background?: PastelVariant;
  /** Whether to show a border */
  border?: boolean;
  /** Test ID for the section */
  testid?: string;
}

/**
 * Component for displaying blog posts in a grid layout with pagination
 */
export const SectionBlog = ({
  title,
  description,
  posts = [],
  postsPerPage = 6,
  className,
  background,
  border = false,
  testid,
  ...props
}: SectionBlogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  /* Get current page posts */
  const getCurrentPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  };

  const currentPosts = getCurrentPosts();

  /* Handle page change with scroll behavior */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    requestAnimationFrame(() => {
      if (gridRef.current) {
        const offset = 100;
        const gridTop = gridRef.current.getBoundingClientRect().top;
        const targetPosition = window.scrollY + gridTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  };

  return (
    <Section
      background={background}
      border={border}
      className={className}
      maxWidth="7xl"
      data-testid={testid}
      {...props}
    >
      {(title || description) && (
        <Flex direction="column" items="center" className="mb-16">
          {title && (
            <Heading
              level="h2"
              variant="large"
              showBorder
              borderColor={background}
              textAlign="center"
            >
              {title}
            </Heading>
          )}
          {description && (
            <Text
              testid="section-description"
              variant="muted"
              textAlign="center"
              maxWidth="2xl"
            >
              {description}
            </Text>
          )}
        </Flex>
      )}

      <Box className="w-full">
        {posts.length > 0 ? (
          <>
            <Grid
              ref={gridRef}
              cols={{
                base: 1,
                lg: 2,
              }}
              gap={6}
              className="mb-12"
            >
              {currentPosts.map((post, index) => (
                <ViewTransition key={post.slug} name={`post-${post.slug}`}>
                  <Card
                    title={post.title}
                    date={post.date}
                    categories={post.categories}
                    slug={post.slug}
                    image={extractSanityImage(post.image) || undefined}
                    variant={post.variant || 'blue'}
                    featured={post.featured}
                    border
                    reverse={index % 2 === 1}
                    testid="card"
                  >
                    <Text testid="post-description" variant="muted">
                      {post.description}
                    </Text>
                  </Card>
                </ViewTransition>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        ) : (
          <Text testid="no-posts-message" variant="muted" textAlign="center">
            Er zijn momenteel geen blog artikelen beschikbaar.
          </Text>
        )}
      </Box>
    </Section>
  );
};
