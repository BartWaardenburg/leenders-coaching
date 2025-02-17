"use client";

import { useState, useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { Box } from '@/components/ui/Box'
import { Flex } from '@/components/ui/Flex'
import { Grid } from '@/components/ui/Grid'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'

interface BlogPost {
  title: string
  description: string
  slug: string
  date: string
  categories: string[]
  image: string
  featured?: boolean
  variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal'
}

interface SectionBlogProps {
  /** The title of the section */
  title?: string;
  /** The description text */
  description: string;
  /** Array of blog posts to display */
  posts: BlogPost[];
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
  title,
  description,
  posts,
  postsPerPage = 6,
}: SectionBlogProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  /* Get current page posts */
  const getCurrentPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return posts.slice(startIndex, endIndex)
  }

  const currentPosts = getCurrentPosts()

  /* Handle page change with scroll behavior */
  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      if (gridRef.current) {
        const offset = 100 // Adjust this value to control how far above the grid to scroll
        const gridTop = gridRef.current.getBoundingClientRect().top
        const targetPosition = window.scrollY + gridTop - offset

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    })
  }

  return (
    <Section className="py-16 md:py-24">
      <Container>
        {(title || description) && (
          <Flex direction="column" items="center" className="mb-16">
            {title && (
              <Heading level="h2" variant="large" className="mb-6" textAlign="center">
                {title}
              </Heading>
            )}
            {description && (
              <Text className="text-muted-foreground text-center max-w-2xl">
                {description}
              </Text>
            )}
          </Flex>
        )}

        <Box className="w-full">
          <Grid
            ref={gridRef}
            columns={{
              default: 1,
              '@2xl': 2,
            }}
            gap={6}
            className="mb-12"
          >
            {currentPosts.map((post, index) => (
              <Card
                key={post.slug}
                title={post.title}
                date={post.date}
                categories={post.categories}
                slug={post.slug}
                image={post.image}
                variant={post.variant || 'blue'}
                featured={post.featured}
                border
                reverse={index % 2 === 1}
              >
                <Text className="text-muted-foreground">{post.description}</Text>
              </Card>
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
        </Box>
      </Container>
    </Section>
  )
} 