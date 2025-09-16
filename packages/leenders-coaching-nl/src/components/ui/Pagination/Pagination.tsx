import { FC } from 'react';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { motion } from 'motion/react';

interface PaginationProps {
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Current active page (1-based)
   */
  currentPage: number;
  /**
   * Maximum number of visible page buttons
   * @default 5
   */
  maxVisiblePages?: number;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Optional className for styling
   */
  className?: string;
}

/**
 * Pagination component that handles both simple and complex pagination scenarios
 * with subtle animations and square buttons.
 *
 * @param {PaginationProps} props - The props for the Pagination component.
 * @returns {JSX.Element | null} The rendered Pagination component or null if only one page.
 */
export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  maxVisiblePages = 5,
  onPageChange,
  className,
}) => {
  /* Don't render if only one page */
  if (totalPages <= 1) return null;

  /**
   * Calculates the visible page numbers and ellipsis for pagination.
   * Always shows the first and last page, and uses ellipsis when needed.
   *
   * @returns {(number | '...')[]} Array of page numbers and ellipsis.
   */
  const getVisiblePages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    /* Always show first page */
    pages.push(1);

    if (totalPages <= maxVisiblePages) {
      /* Show all pages if total is less than max visible */
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      /* Complex pagination with ellipsis */
      if (currentPage <= halfVisible + 1) {
        /* Near start */
        for (let i = 2; i <= maxVisiblePages - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfVisible) {
        /* Near end */
        pages.push('...');
        for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        /* Middle */
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  /* Common styles for all pagination items */
  const itemClasses =
    'h-10 w-10 min-w-[2.5rem] p-0 flex items-center justify-center border border-foreground/80 dark:border-background/80';

  /* Animation variants for pagination buttons */
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  /* Guard functions to prevent out-of-range calls */
  const prev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const next = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <nav aria-label="Paginering">
      <Flex justify="center" gap={2} className={className}>
        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <IconButton
            variant="ghost"
            shape="square"
            bordered
            onClick={prev}
            disabled={currentPage === 1}
            label="Vorige pagina"
            className={itemClasses}
          >
            <IoChevronBack className="h-4 w-4" />
          </IconButton>
        </motion.div>

        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <motion.div key={`ellipsis-${index}`} variants={buttonVariants}>
                <Box
                  role="presentation"
                  aria-hidden
                  className={`${itemClasses} text-muted-foreground`}
                >
                  …
                </Box>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={page}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                variant={currentPage === page ? 'black' : 'transparent'}
                onClick={() => onPageChange(page)}
                aria-label={`Ga naar pagina ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={itemClasses}
              >
                {page}
              </Button>
            </motion.div>
          );
        })}

        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <IconButton
            variant="ghost"
            shape="square"
            bordered
            onClick={next}
            disabled={currentPage === totalPages}
            label="Volgende pagina"
            className={itemClasses}
          >
            <IoChevronForward className="h-4 w-4" />
          </IconButton>
        </motion.div>
      </Flex>
    </nav>
  );
};
