import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box } from '@/components/ui/Box';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';

type NavigationItem = {
  _key: string;
  label: string | null;
  href: string | null;
};

type NavigationItemsProps = {
  links: NavigationItem[] | null;
  onItemClick: () => void;
};

/* Animation variants for the navigation container */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/* Animation variants for individual navigation items */
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const NavigationItems = ({ links, onItemClick }: NavigationItemsProps) => (
  <Box as={motion.ul}
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <Stack space={4}>
      {links?.map((link) => (
        link.href && link.label && (
          <Box
            as={motion.li}
            variants={itemVariants}
            key={link._key}
          >
            <Link
              href={link.href}
              onClick={onItemClick}
              className="block text-foreground hover:text-primary/80 transition-theme"
            >
              <Text as="span" variant="navigation">
                {link.label}
              </Text>
            </Link>
          </Box>
        )
      ))}
    </Stack>
  </Box>
);
