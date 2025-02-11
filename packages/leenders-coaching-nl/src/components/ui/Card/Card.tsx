import { FC, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { Text } from '@/components/ui/Text'
import { Heading } from '@/components/ui/Heading'
import { Flex } from '@/components/ui/Flex'
import { Box } from '@/components/ui/Box'
import { twMerge } from 'tailwind-merge'
import { cardConfig } from '@/config/card.config'

type CardVariant = 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal'

const cardBackgrounds: Record<CardVariant, string> = {
  blue: "bg-pastel-blue dark:bg-pastel-blue-dark",
  purple: "bg-pastel-purple dark:bg-pastel-purple-dark",
  green: "bg-pastel-green dark:bg-pastel-green-dark",
  pink: "bg-pastel-pink dark:bg-pastel-pink-dark",
  yellow: "bg-pastel-yellow dark:bg-pastel-yellow-dark",
  teal: "bg-pastel-teal dark:bg-pastel-teal-dark",
}

const cardBordersLight: Record<CardVariant, string> = {
  blue: "border-pastel-blue dark:border-pastel-blue-dark",
  purple: "border-pastel-purple dark:border-pastel-purple-dark",
  green: "border-pastel-green dark:border-pastel-green-dark",
  pink: "border-pastel-pink dark:border-pastel-pink-dark",
  yellow: "border-pastel-yellow dark:border-pastel-yellow-dark",
  teal: "border-pastel-teal dark:border-pastel-teal-dark",
}

const cardBordersDark: Record<CardVariant, string> = {
  blue: "border-pastel-blue-dark dark:border-pastel-blue",
  purple: "border-pastel-purple-dark dark:border-pastel-purple",
  green: "border-pastel-green-dark dark:border-pastel-green",
  pink: "border-pastel-pink-dark dark:border-pastel-pink",
  yellow: "border-pastel-yellow-dark dark:border-pastel-yellow",
  teal: "border-pastel-teal-dark dark:border-pastel-teal",
}

const cardBordersHoverLight: Record<CardVariant, string> = {
  blue: "hover:border-pastel-blue hover:dark:border-pastel-blue-dark",
  purple: "hover:border-pastel-purple hover:dark:border-pastel-purple-dark",
  green: "hover:border-pastel-green hover:dark:border-pastel-green-dark",
  pink: "hover:border-pastel-pink hover:dark:border-pastel-pink-dark",
  yellow: "hover:border-pastel-yellow hover:dark:border-pastel-yellow-dark",
  teal: "hover:border-pastel-teal hover:dark:border-pastel-teal-dark",
}

const cardBordersHoverDark: Record<CardVariant, string> = {
  blue: "hover:border-pastel-blue-dark hover:dark:border-pastel-blue",
  purple: "hover:border-pastel-purple-dark hover:dark:border-pastel-purple",
  green: "hover:border-pastel-green-dark hover:dark:border-pastel-green",
  pink: "hover:border-pastel-pink-dark hover:dark:border-pastel-pink",
  yellow: "hover:border-pastel-yellow-dark hover:dark:border-pastel-yellow",
  teal: "hover:border-pastel-teal-dark hover:dark:border-pastel-teal",
}

type CardProps = {
  featured?: boolean
  title: string
  date?: string
  categories?: string[]
  children?: ReactNode
  slug?: string
  image?: string | StaticImageData
  variant?: CardVariant
  border?: boolean
}

/**
 * Card component for displaying article previews
 */
const Card: FC<CardProps> = ({
  featured = false,
  title,
  date,
  categories = [],
  children,
  slug,
  image,
  variant = 'blue',
  border = false,
}) => {
  const hasMetaData = date || categories.length > 0;
  const cardClasses = twMerge(
    'group relative h-full transition-theme block @container border',
    cardBackgrounds[variant],
    border ? cardBordersDark[variant] : cardBordersLight[variant],
    border ? cardBordersHoverLight[variant] : cardBordersHoverDark[variant],
    slug && 'cursor-pointer'
  );

  const content = (
    <Flex className="h-full flex-col @lg:flex-row">
      {image && (
        <Box className="relative border-b @lg:border-b-0 @lg:border-l-0 @lg:border-r border-foreground/80 h-48 @lg:h-auto w-full @lg:w-1/3 @4xl:w-1/2 shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </Box>
      )}

      <Box className="flex-1 p-4 @md:p-8">
        <Flex direction="column" className="h-full">
          <Box>
            {featured && (
              <Box className="relative mb-6">
                <Text
                  variant="card-meta"
                  weight="medium"
                  className="mb-2"
                >
                  {cardConfig.labels.featured}
                </Text>
                <Box className="h-[2px] w-12 bg-foreground/80" />
              </Box>
            )}

            <Box className="pb-6 w-full">
              <Heading
                level="h2"
                variant="medium"
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
                  className="relative divide-foreground/80 flex-row divide-x w-full overflow-hidden"
                >
                  {date && (
                    <Box className="pr-4 py-2 w-1/2">
                      <Text variant="card-meta" textAlign="right" className="break-words hyphens-auto overflow-hidden">
                        {date}
                      </Text>
                    </Box>
                  )}
                  {categories.length > 0 && (
                    <Box className="pl-4 py-2 w-1/2">
                      <Text variant="card-meta" textAlign="left" className="break-words hyphens-auto overflow-hidden">
                        {categories.join(', ')}
                      </Text>
                    </Box>
                  )}
                </Flex>
              </Box>
            )}

            {children && (
              <Box className="py-6">
                {children}
              </Box>
            )}
          </Box>

          {slug && (
            <Flex justify="end" className="mt-auto pt-6">
              <Box className="relative group/link">
                <Box className="h-[2px] w-12 bg-foreground/80 transition-all duration-300 group-hover:translate-x-2 group-hover:bg-primary" />
                <Text variant="card-meta" weight="medium" className="pt-2 transition-theme group-hover:text-primary">
                  {cardConfig.labels.readArticle}
                </Text>
              </Box>
            </Flex>
          )}
        </Flex>
      </Box>
    </Flex>
  );

  if (slug) {
    return (
      <Link href={`${cardConfig.paths.blog}/${slug}`} className={cardClasses}>
        {content}
      </Link>
    );
  }

  return (
    <Box className={cardClasses}>
      {content}
    </Box>
  );
}

export default Card
