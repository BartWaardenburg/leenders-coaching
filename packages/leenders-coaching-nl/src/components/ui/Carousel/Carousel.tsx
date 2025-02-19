'use client';

import {
  type ReactNode,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import { Box } from '@/components/ui/Box';
import { IconButton } from '@/components/ui/IconButton';
import { Stack } from '@/components/ui/Stack';
import { Flex } from '@/components/ui/Flex';

type CarouselProps = {
  /** Array of slides to display */
  slides: ReactNode[];
  /** Optional className for styling */
  className?: string;
};

const MotionBox = motion.create(Box);

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

/**
 * Carousel component with navigation arrows, dot indicators and swipe support
 */
export const Carousel = ({ slides, className }: CarouselProps) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const x = useMotionValue(0);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      const newHeight = contentRef.current.offsetHeight;
      if (newHeight !== height) {
        setHeight(newHeight);
      }
    }
  }, [height]);

  useEffect(() => {
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    window.addEventListener('resize', updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [updateHeight]);

  // Update height when page changes
  useEffect(() => {
    updateHeight();
  }, [page, updateHeight]);

  const paginate = useCallback(
    (newDirection: number) => {
      const newPage = page + newDirection;
      if (newPage >= 0 && newPage < slides.length) {
        setPage([newPage, newDirection]);
      }
    },
    [page, slides.length],
  );

  const goToSlide = useCallback(
    (index: number) => {
      const newDirection = index > page ? 1 : -1;
      setPage([index, newDirection]);
    },
    [page],
  );

  return (
    <Box className={twMerge('relative group px-4 sm:px-8', className)}>
      {/* Main carousel area */}
      <Box className="relative">
        <Flex className="relative items-center">
          {/* Previous button */}
          <Box className="w-12 shrink-0 flex justify-start z-10">
            <IconButton
              label="Previous slide"
              onClick={() => paginate(-1)}
              disabled={page === 0}
              variant="ghost"
              shape="square"
              bordered
              className={twMerge(
                'h-10 w-10 min-w-[2.5rem] p-0',
                'disabled:opacity-0',
                page === 0 && 'hidden',
              )}
            >
              <IoChevronBack className="h-4 w-4" />
            </IconButton>
          </Box>

          {/* Slide content */}
          <Box
            style={{ height: height ? `${height}px` : 'auto' }}
            className="relative flex-1"
          >
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <MotionBox
                key={page}
                ref={contentRef}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="w-full absolute left-0 right-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                style={{ x }}
                onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              >
                {slides[page]}
              </MotionBox>
            </AnimatePresence>
          </Box>

          {/* Next button */}
          <Box className="w-12 shrink-0 flex justify-end z-10">
            <IconButton
              label="Next slide"
              onClick={() => paginate(1)}
              disabled={page === slides.length - 1}
              variant="ghost"
              shape="square"
              bordered
              className={twMerge(
                'h-10 w-10 min-w-[2.5rem] p-0',
                'disabled:opacity-0',
                page === slides.length - 1 && 'hidden',
              )}
            >
              <IoChevronForward className="h-4 w-4" />
            </IconButton>
          </Box>
        </Flex>

        {/* Dot indicators */}
        <Stack direction="row" justify="center" gap={2} className="mt-8">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={twMerge(
                'w-2 h-2 rounded-full transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'focus-visible:ring-pastel-blue dark:focus-visible:ring-pastel-blue-dark',
                'focus-visible:ring-offset-background',
                index === page
                  ? 'bg-pastel-blue dark:bg-pastel-blue-dark'
                  : 'bg-pastel-blue/30 dark:bg-pastel-blue-dark/30 hover:bg-pastel-blue/50 dark:hover:bg-pastel-blue-dark/50',
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
