'use client';

import { twMerge } from 'tailwind-merge';
import { motion, type HTMLMotionProps } from 'motion/react';
import { Avatar } from '@/components/ui/Avatar';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';

type PersonProps = {
  name: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
} & Omit<
  HTMLMotionProps<'div'>,
  | 'onAnimationStart'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragExit'
>;

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

/**
 * Person component for displaying a person's information with avatar and animations
 */
export const Person = ({
  name,
  description,
  imageSrc,
  imageAlt,
  className,
  ...props
}: PersonProps) => {
  return (
    <MotionStack
      direction="row"
      className={twMerge(
        'items-stretch border border-foreground/80',
        className,
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      {...props}
    >
      <motion.div
        className="w-24"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <Avatar
          src={imageSrc}
          alt={imageAlt || name}
          size="fill"
          className="border-none aspect-square"
        />
      </motion.div>
      <MotionStack
        direction="col"
        justify="center"
        className="flex-1 min-w-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.2,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <MotionBox
          className="py-2 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.3,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          <Heading
            level="h3"
            variant="small"
            spacing="none"
            className="break-words"
          >
            {name}
          </Heading>
        </MotionBox>
        {description && (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.4,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <div className="border-t border-foreground/80" />
            <Box className="py-2 px-4">
              <Text variant="muted" className="text-sm break-words">
                {description}
              </Text>
            </Box>
          </MotionBox>
        )}
      </MotionStack>
    </MotionStack>
  );
};
