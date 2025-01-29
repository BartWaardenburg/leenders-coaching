import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Text } from '@/components/ui/Text'
import { Heading } from '@/components/ui/Heading'
import { Flex } from '@/components/ui/Flex'
import type { StaticImageData } from 'next/image'
import { Box } from '@/components/ui/Box'
import { twMerge } from 'tailwind-merge'

/* Types for the Card component props */
type CardProps = {
  featured?: boolean
  title: string
  date?: string
  categories?: string[]
  excerpt?: string
  slug: string
  image?: string | StaticImageData
  variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal'
}

const getCardBackground = (variant: CardProps['variant']) => {
  const backgrounds = {
    blue: 'bg-pastel-blue dark:bg-pastel-blue-dark',
    purple: 'bg-pastel-purple dark:bg-pastel-purple-dark',
    green: 'bg-pastel-green dark:bg-pastel-green-dark',
    pink: 'bg-pastel-pink dark:bg-pastel-pink-dark',
    yellow: 'bg-pastel-yellow dark:bg-pastel-yellow-dark',
    teal: 'bg-pastel-teal dark:bg-pastel-teal-dark',
  }
  return backgrounds[variant || 'blue']
}

/**
 * Card component for displaying article previews
 */
const Card: FC<CardProps> = ({
  featured = false,
  title,
  date,
  categories = [],
  excerpt,
  slug,
  image,
  variant = 'blue',
}) => {
  const hasMetaData = date || categories.length > 0;

  return (
    <Box
      as="article"
      className={twMerge(
        'group relative @container/card',
        image && '@md/card:pl-6 @lg/card:pl-12 @xl/card:pl-16',
        getCardBackground(variant)
      )}
    >
      <Flex className="h-full items-stretch flex-col @md/card:flex-row">
        {image && (
          <Box className="relative border-b @md/card:border-b-0 @md/card:border-l @md/card:border-r border-foreground/80 h-48 @md/card:h-auto w-full @md/card:w-1/2 @lg/card:w-2/3 shrink-0 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Box>
        )}

        <Box className="flex-1 p-6 @md/card:p-8 @lg/card:p-12">
          <Flex direction="column" className="h-full">
            <Box>
              {featured && (
                <Box className="relative mb-6">
                  <Text
                    variant="card-meta"
                    weight="medium"
                    className="mb-2"
                  >
                    Featured
                  </Text>
                  <Box className="h-[2px] w-12 bg-foreground/80" />
                </Box>
              )}

              <Box className="pb-6">
                <Heading
                  level="h2"
                  variant="card"
                  weight="normal"
                  spacing="none"
                >
                  {title}
                </Heading>
              </Box>

              {hasMetaData && (
                <Box className="border-b border-t border-foreground/80">
                  <Flex
                    gap={0}
                    justify='center'
                    className={twMerge(
                      "relative divide-foreground/80",
                      "flex-row divide-x"
                    )}
                  >
                    {date && (
                      <Box className={twMerge(
                        "px-4 py-2",
                      )}>
                        <Text variant="card-meta">
                          {date}
                        </Text>
                      </Box>
                    )}
                    {categories.length > 0 && (
                      <Box className="px-4 py-2">
                        <Text variant="card-meta">
                          {categories.join(', ')}
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </Box>
              )}

              {excerpt && (
                <Box className="py-6">
                  <Text variant="card-excerpt">
                    {excerpt}
                  </Text>
                </Box>
              )}
            </Box>

            <Flex justify="end" className="mt-auto pt-6">
              <Box className="relative group/link">
                <Box className="h-[2px] w-12 bg-foreground/80 transition-all duration-300 group-hover/link:translate-x-2 group-hover/link:bg-primary" />
                <Text variant="card-meta" weight="medium">
                  <Link
                    href={`/blog/${slug}`}
                    className="pt-2 inline-block transition-colors hover:text-primary"
                  >
                    Read Article
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default Card
