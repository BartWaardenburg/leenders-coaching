'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { ImageRenderer } from '@/components/ui/ImageRenderer';
import { isValidImage, type ImageSource } from '@/utilities/image';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Flex } from '@/components/ui/Flex';
import { Box } from '@/components/ui/Box';
import { ViewTransition } from '@/components/ui/ViewTransition';
import { cn } from '@/utilities/cn';
import { useConfig } from '@/components/providers/ClientConfigProvider';
import { motion, easeInOut, useReducedMotion } from 'motion/react';
import { pastelVariant, type PastelVariant } from '@/utilities/tokens';

type CardVariant = PastelVariant;

const cardBackgrounds: Record<CardVariant, string> = {
  blue: pastelVariant.blue.bg,
  purple: pastelVariant.purple.bg,
  green: pastelVariant.green.bg,
  pink: pastelVariant.pink.bg,
  yellow: pastelVariant.yellow.bg,
  teal: pastelVariant.teal.bg,
};

const cardBordersLight: Record<CardVariant, string> = {
  blue: pastelVariant.blue.borderLight,
  purple: pastelVariant.purple.borderLight,
  green: pastelVariant.green.borderLight,
  pink: pastelVariant.pink.borderLight,
  yellow: pastelVariant.yellow.borderLight,
  teal: pastelVariant.teal.borderLight,
};

const cardBordersDark: Record<CardVariant, string> = {
  blue: pastelVariant.blue.borderDark,
  purple: pastelVariant.purple.borderDark,
  green: pastelVariant.green.borderDark,
  pink: pastelVariant.pink.borderDark,
  yellow: pastelVariant.yellow.borderDark,
  teal: pastelVariant.teal.borderDark,
};

const cardBordersHoverLight: Record<CardVariant, string> = {
  blue: pastelVariant.blue.hoverBorderLight,
  purple: pastelVariant.purple.hoverBorderLight,
  green: pastelVariant.green.hoverBorderLight,
  pink: pastelVariant.pink.hoverBorderLight,
  yellow: pastelVariant.yellow.hoverBorderLight,
  teal: pastelVariant.teal.hoverBorderLight,
};

const cardBordersHoverDark: Record<CardVariant, string> = {
  blue: pastelVariant.blue.hoverBorderDark,
  purple: pastelVariant.purple.hoverBorderDark,
  green: pastelVariant.green.hoverBorderDark,
  pink: pastelVariant.pink.hoverBorderDark,
  yellow: pastelVariant.yellow.hoverBorderDark,
  teal: pastelVariant.teal.hoverBorderDark,
};

export type CardProps = {
  featured?: boolean;
  title: string;
  date?: string;
  categories?: string[];
  children?: ReactNode;
  slug?: string;
  image?: ImageSource;
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
  const cardClasses = cn(
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
        {isValidImage(image) && (
          <Box
            className={cn(
              'relative border-b @lg:border-b-0 @lg:border-l-0 @lg:border-r border-foreground/80 h-48 @lg:h-auto w-full @lg:w-1/3 @4xl:w-1/2 shrink-0 overflow-hidden',
              reverse && '@lg:order-last @lg:border-r-0 @lg:border-l'
            )}
          >
            <motion.div variants={imageVariants} className="h-full w-full">
              <ImageRenderer
                image={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                followHotspot={true}
                qualityHint={80}
              />
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
                <ViewTransition name={`title-${slug}`} disabled={!slug}>
                  <Heading
                    level="h2"
                    variant="medium"
                    weight="normal"
                    spacing="none"
                  >
                    {title}
                  </Heading>
                </ViewTransition>
              </Box>

              {hasMetaData && (
                <Box className="border-b border-t border-foreground/80">
                  <Flex
                    gap={0}
                    direction="row"
                    divide="x"
                    className="relative divide-foreground/80 w-full overflow-hidden"
                  >
                    {date && (
                      <Box className="pr-4 py-2 w-1/2">
                        <ViewTransition name={`date-${slug}`} disabled={!slug}>
                          <Text
                            variant="card-meta"
                            textAlign="right"
                            className="break-words hyphens-auto overflow-hidden"
                          >
                            {date}
                          </Text>
                        </ViewTransition>
                      </Box>
                    )}
                    {categories.length > 0 && (
                      <Box className="pl-4 py-2 w-1/2">
                        <ViewTransition
                          name={`categories-${slug}`}
                          disabled={!slug}
                        >
                          <Text
                            variant="card-meta"
                            textAlign="left"
                            className="break-words hyphens-auto overflow-hidden"
                          >
                            {categories.join(', ')}
                          </Text>
                        </ViewTransition>
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
