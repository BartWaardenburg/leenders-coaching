'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityImage } from '@/components/ui/Image';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Flex } from '@/components/ui/Flex';
import { Box } from '@/components/ui/Box';
import { twMerge } from 'tailwind-merge';
import { useConfig } from '@/components/providers/ClientConfigProvider';
import { motion, easeInOut, useReducedMotion } from 'motion/react';

type CardVariant = 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';

const cardBackgrounds: Record<CardVariant, string> = {
  blue: 'bg-pastel-blue dark:bg-pastel-blue-dark',
  purple: 'bg-pastel-purple dark:bg-pastel-purple-dark',
  green: 'bg-pastel-green dark:bg-pastel-green-dark',
  pink: 'bg-pastel-pink dark:bg-pastel-pink-dark',
  yellow: 'bg-pastel-yellow dark:bg-pastel-yellow-dark',
  teal: 'bg-pastel-teal dark:bg-pastel-teal-dark',
};

const cardBordersLight: Record<CardVariant, string> = {
  blue: 'border-pastel-blue dark:border-pastel-blue-dark',
  purple: 'border-pastel-purple dark:border-pastel-purple-dark',
  green: 'border-pastel-green dark:border-pastel-green-dark',
  pink: 'border-pastel-pink dark:border-pastel-pink-dark',
  yellow: 'border-pastel-yellow dark:border-pastel-yellow-dark',
  teal: 'border-pastel-teal dark:border-pastel-teal-dark',
};

const cardBordersDark: Record<CardVariant, string> = {
  blue: 'border-pastel-blue-dark dark:border-pastel-blue',
  purple: 'border-pastel-purple-dark dark:border-pastel-purple',
  green: 'border-pastel-green-dark dark:border-pastel-green',
  pink: 'border-pastel-pink-dark dark:border-pastel-pink',
  yellow: 'border-pastel-yellow-dark dark:border-pastel-yellow',
  teal: 'border-pastel-teal-dark dark:border-pastel-teal',
};

const cardBordersHoverLight: Record<CardVariant, string> = {
  blue: 'hover:border-pastel-blue hover:dark:border-pastel-blue-dark',
  purple: 'hover:border-pastel-purple hover:dark:border-pastel-purple-dark',
  green: 'hover:border-pastel-green hover:dark:border-pastel-green-dark',
  pink: 'hover:border-pastel-pink hover:dark:border-pastel-pink-dark',
  yellow: 'hover:border-pastel-yellow hover:dark:border-pastel-yellow-dark',
  teal: 'hover:border-pastel-teal hover:dark:border-pastel-teal-dark',
};

const cardBordersHoverDark: Record<CardVariant, string> = {
  blue: 'hover:border-pastel-blue-dark hover:dark:border-pastel-blue',
  purple: 'hover:border-pastel-purple-dark hover:dark:border-pastel-purple',
  green: 'hover:border-pastel-green-dark hover:dark:border-pastel-green',
  pink: 'hover:border-pastel-pink-dark hover:dark:border-pastel-pink',
  yellow: 'hover:border-pastel-yellow-dark hover:dark:border-pastel-yellow',
  teal: 'hover:border-pastel-teal-dark hover:dark:border-pastel-teal',
};

export type CardProps = {
  featured?: boolean;
  title: string;
  date?: string;
  categories?: string[];
  children?: ReactNode;
  slug?: string;
  image?: string | StaticImageData | SanityImageSource;
  variant?: CardVariant;
  border?: boolean;
  reverse?: boolean;
  testid?: string;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * Card component for displaying article previews with fancy animations
 */
export const Card: FC<CardProps> = ({
  featured = false,
  title,
  date,
  categories = [],
  children,
  slug,
  image,
  variant = 'blue',
  border = false,
  reverse = false,
  testid,
  ...props
}) => {
  const config = useConfig();
  const shouldReduceMotion = useReducedMotion();
  const hasMetaData = date || categories.length > 0;
  const cardClasses = twMerge(
    'group relative h-full transition-theme block @container border',
    cardBackgrounds[variant],
    border ? cardBordersDark[variant] : cardBordersLight[variant],
    slug &&
      (border ? cardBordersHoverLight[variant] : cardBordersHoverDark[variant]),
    slug && 'cursor-pointer'
  );

  /* Get the full path for blog posts */
  const href = slug?.startsWith('/') ? slug : `/blog/${slug}`;

  /* Animation variants */
  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.4,
            ease: [0.2, 0.65, 0.3, 0.9] as const,
            when: 'beforeChildren',
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
    },
    ...(slug &&
      !shouldReduceMotion && {
        hover: {
          y: -5,
          opacity: 1,
          transition: {
            duration: 0.2,
            ease: easeInOut,
          },
        },
      }),
  } as const;

  const childVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.3,
            ease: [0.2, 0.65, 0.3, 0.9] as const,
          },
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
  } as const;

  const imageVariants = {
    hidden: shouldReduceMotion
      ? { scale: 1, opacity: 1 }
      : { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.5,
            ease: [0.2, 0.65, 0.3, 0.9] as const,
          },
    },
    ...(slug &&
      !shouldReduceMotion && {
        hover: {
          scale: 1.05,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: easeInOut,
          },
        },
      }),
  } as const;

  const content = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={slug ? 'hover' : undefined}
      viewport={{ once: true, margin: '-100px' }}
      className="h-full"
    >
      <Flex className="h-full flex-col @lg:flex-row">
        {image && (
          <Box
            className={twMerge(
              'relative border-b @lg:border-b-0 @lg:border-l-0 @lg:border-r border-foreground/80 h-48 @lg:h-auto w-full @lg:w-1/3 @4xl:w-1/2 shrink-0 overflow-hidden',
              reverse && '@lg:order-last @lg:border-r-0 @lg:border-l'
            )}
          >
            <motion.div variants={imageVariants} className="h-full w-full">
              {/* Check if image is a Sanity image object or static image/URL */}
              {typeof image === 'object' && 'asset' in image ? (
                <SanityImage
                  image={image as SanityImageSource}
                  alt={title}
                  fill
                  className="object-cover"
                  followHotspot={true}
                  qualityHint={80}
                />
              ) : (
                <Image
                  src={image as string | StaticImageData}
                  alt={title}
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
          </Box>
        )}

        <Box className="flex-1 p-4 @md:p-8 h-full">
          <Flex direction="column" className="h-full">
            <motion.div
              variants={childVariants}
              className="flex flex-col h-full"
            >
              {featured && (
                <Box className="relative mb-6">
                  <Text variant="card-meta" weight="medium" className="mb-2">
                    {config.blog.labels.featured}
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
                        <Text
                          variant="card-meta"
                          textAlign="right"
                          className="break-words hyphens-auto overflow-hidden"
                        >
                          {date}
                        </Text>
                      </Box>
                    )}
                    {categories.length > 0 && (
                      <Box className="pl-4 py-2 w-1/2">
                        <Text
                          variant="card-meta"
                          textAlign="left"
                          className="break-words hyphens-auto overflow-hidden"
                        >
                          {categories.join(', ')}
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </Box>
              )}

              {children && <Box className="py-6 flex-1">{children}</Box>}
            </motion.div>

            {slug && (
              <motion.div variants={childVariants}>
                <Flex justify="end" className="mt-auto pt-6">
                  <Box className="relative group/link">
                    <Box className="h-[2px] w-12 bg-foreground/80 transition-all duration-300 group-hover:translate-x-2 group-hover:bg-primary" />
                    <Text
                      variant="card-meta"
                      weight="medium"
                      className="pt-2 transition-theme group-hover:text-primary"
                    >
                      {config.blog.labels.readArticle}
                    </Text>
                  </Box>
                </Flex>
              </motion.div>
            )}
          </Flex>
        </Box>
      </Flex>
    </motion.div>
  );

  const MotionLink = motion.create(Link);

  if (slug) {
    // Create a clean props object with only anchor-compatible props
    const linkProps = {
      className: cardClasses,
      'data-testid': testid,
      // Only include basic HTML attributes that are valid for both div and anchor
      id: props.id,
      style: props.style,
      role: props.role,
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
      tabIndex: props.tabIndex,
    };

    return (
      <MotionLink href={href} {...linkProps}>
        {content}
      </MotionLink>
    );
  }

  return (
    <Box className={cardClasses} data-testid={testid} {...props}>
      {content}
    </Box>
  );
};

export default Card;
