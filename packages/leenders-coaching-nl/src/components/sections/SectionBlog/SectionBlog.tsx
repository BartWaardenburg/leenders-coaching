'use client';

import { useState, useRef } from 'react';
import { Section, type SectionBaseProps } from '@/components/ui/Section';
import type { PastelVariant } from '@/utilities/tokens';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
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

interface SectionBlogProps extends SectionBaseProps {
  /** Array of blog posts to display */
  posts?: BlogPost[];
  /**
   * Number of posts per page
   * @default 6
   */
  postsPerPage?: number;
}

/**
 * Component for displaying blog posts in a grid layout with pagination
 */
export const SectionBlog = ({
  posts = [],
  postsPerPage = 6,
  maxWidth = '7xl',
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
    <Section maxWidth={maxWidth} {...props}>
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
