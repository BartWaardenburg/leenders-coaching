import Link from 'next/link';
import { FiLinkedin, FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';
import { Stack } from '@/components/ui/Stack';
import { Grid } from '@/components/ui/Grid';

type MenuFooterSection = {
  title: string | null;
  description?: string | null;
};

type MenuFooterEnquiry = {
  label: string | null;
  href: string | null;
  linkText: string | null;
};

type MenuFooterContact = {
  title: string | null;
  projectEnquiry: MenuFooterEnquiry | null;
  generalEnquiry: MenuFooterEnquiry | null;
};

type MenuFooterSocial = {
  title: string | null;
};

type MenuFooter = {
  _id?: string;
  about: MenuFooterSection | null;
  social: MenuFooterSocial | null;
  contact: MenuFooterContact | null;
};

type SocialLink = {
  _key: string;
  platform: string | null;
  url: string | null;
};

type MenuFooterProps = {
  sections: MenuFooter;
  socialLinks: SocialLink[];
};

/* Animation variants for the footer sections container */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

/* Animation variants for individual footer sections */
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* Animation variants for links */
const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

type FooterSectionProps = {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
};

const FooterSection = ({
  title,
  children,
  isLast = false,
}: FooterSectionProps) => (
  <motion.div variants={sectionVariants} className="h-full">
    <Flex direction="column" className="h-full">
      <Heading
        level="h3"
        variant="small"
        spacing="none"
        className="mb-6 sm:px-0 md:px-4"
      >
        {title}
      </Heading>
      <Box
        className={`border-t ${!isLast ? 'md:border-r' : ''} border-foreground/80 pt-4 sm:px-0 md:px-4 pb-8 flex-1`}
      >
        {children}
      </Box>
    </Flex>
  </motion.div>
);

type SocialLinkProps = {
  href: string;
  label: string;
};

const SocialLink = ({ href, label }: SocialLinkProps) => (
  <motion.div variants={linkVariants}>
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Flex items="center" gap={2}>
        {label}
        {label.toLowerCase() === 'linkedin' ? (
          <FiLinkedin className="w-5 h-5" />
        ) : (
          <FiInstagram className="w-5 h-5" />
        )}
      </Flex>
    </Link>
  </motion.div>
);

export const MenuFooter = ({ sections, socialLinks }: MenuFooterProps) => {
  if (!sections.about || !sections.contact) return null;

  return (
    <Box>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="h-full"
      >
        <Grid columns={{ default: 1, 'md': 3 }} gap={0} className="h-full">
          <FooterSection title={sections.about.title || ''}>
            <Flex direction="column" className="h-full">
              <motion.div variants={linkVariants} className="flex-1">
                <Text variant="muted" className="text-sm">
                  {sections.about.description}
                </Text>
              </motion.div>
            </Flex>
          </FooterSection>

          <FooterSection title={sections.social?.title || ''}>
            <Flex direction="column" className="h-full">
              <Box as="ul" className="flex-1">
                <Stack space={4}>
                  {socialLinks.map(link => (
                    link.platform && link.url && (
                      <Box as="li" key={link._key}>
                        <SocialLink href={link.url} label={link.platform} />
                      </Box>
                    )
                  ))}
                </Stack>
              </Box>
            </Flex>
          </FooterSection>

          <FooterSection title={sections.contact.title || ''} isLast>
            <Flex direction="column" className="h-full">
              <Stack space={4} className="flex-1">
                {sections.contact.projectEnquiry && (
                  <motion.div variants={linkVariants}>
                    <Box>
                      <Text as="span" className="text-sm">
                        {sections.contact.projectEnquiry.label} /
                      </Text>
                      <Link
                        href={sections.contact.projectEnquiry.href || '#'}
                        className="text-sm underline hover:text-primary transition-colors ml-1"
                      >
                        {sections.contact.projectEnquiry.linkText}
                      </Link>
                    </Box>
                  </motion.div>
                )}
                {sections.contact.generalEnquiry && (
                  <motion.div variants={linkVariants}>
                    <Box>
                      <Text as="span" className="text-sm">
                        {sections.contact.generalEnquiry.label} /
                      </Text>
                      <Link
                        href={sections.contact.generalEnquiry.href || '#'}
                        className="text-sm underline hover:text-primary transition-colors ml-1"
                      >
                        {sections.contact.generalEnquiry.linkText}
                      </Link>
                    </Box>
                  </motion.div>
                )}
              </Stack>
            </Flex>
          </FooterSection>
        </Grid>
      </motion.div>
      <Box className="h-px bg-foreground/80" />
    </Box>
  );
};
