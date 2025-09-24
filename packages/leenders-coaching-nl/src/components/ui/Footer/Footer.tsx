import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { cn } from '@/utilities/cn';

import { Container } from '@/components/ui/Container';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';

type FooterContact = {
  email: string | null;
  phone: string | null;
};

type SocialLink = {
  _key: string;
  platform: string | null;
  url: string | null;
};

type FooterProps = ComponentPropsWithoutRef<'footer'> & {
  copyright: string | null;
  contact: FooterContact;
  socialLinks: SocialLink[];
};

/**
 * Footer component using Sanity data
 */
export const Footer = ({
  className,
  copyright,
  contact,
  socialLinks,
  ...props
}: FooterProps) => {
  const linkedinLink = socialLinks?.find(
    (link) => link.platform?.toLowerCase() === 'linkedin'
  );

  return (
    <Box
      as="footer"
      className={cn(
        'mt-auto bg-background dark:[background-color:var(--color-menu-background-dark)] transition-theme',
        className
      )}
      {...props}
    >
      <Container>
        <Box className="h-px bg-muted-foreground/10" />
        <Flex
          direction="column"
          items="start"
          justify="between"
          gap={8}
          className="py-6 md:flex-row md:items-center"
        >
          {/* Copyright and Legal Links - first on desktop, second on mobile */}
          <Flex
            direction="column"
            items="start"
            gap={2}
            className="order-2 md:order-1"
          >
            <Box>
              <Link
                href="/privacy"
                className="text-sm underline hover:text-primary transition-theme"
              >
                Privacy
              </Link>
            </Box>
            <Box>
              <Link
                href="/voorwaarden"
                className="text-sm underline hover:text-primary transition-theme"
              >
                Voorwaarden
              </Link>
            </Box>
            {copyright && (
              <Box>
                <span className="text-sm underline transition-theme">
                  {copyright}
                </span>
              </Box>
            )}
          </Flex>

          {/* Contact - first on mobile, last on desktop */}
          <Flex
            direction="column"
            items="start"
            gap={2}
            className="order-1 md:order-3"
          >
            {contact.email && (
              <Box>
                <Link
                  href={`mailto:${contact.email}`}
                  className="text-sm underline hover:text-primary transition-theme mr-1"
                >
                  {contact.email}
                </Link>
              </Box>
            )}
            {contact.phone && (
              <Box>
                <Link
                  href={`tel:${contact.phone}`}
                  className="text-sm underline hover:text-primary transition-theme"
                >
                  {contact.phone}
                </Link>
              </Box>
            )}

            {linkedinLink?.url && (
              <Box>
                <Link
                  href={linkedinLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:text-primary transition-theme flex items-center gap-1"
                >
                  LinkedIn
                </Link>
              </Box>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
