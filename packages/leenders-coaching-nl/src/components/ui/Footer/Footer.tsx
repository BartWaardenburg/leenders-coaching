import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utilities/cn';

import { Text } from '@/components/ui/Text';
import { Link } from '@/components/ui/Link';
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
  const instagramLink = socialLinks?.find(
    (link) => link.platform?.toLowerCase() === 'instagram'
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
            {copyright && (
              <Text variant="muted" className="text-sm">
                {copyright}
              </Text>
            )}
            <Flex direction="row" gap={4}>
              <Link
                href="/privacy"
                variant="subtle"
                className="text-sm text-muted-foreground hover:text-primary transition-theme"
              >
                Privacy
              </Link>
              <Link
                href="/voorwaarden"
                variant="subtle"
                className="text-sm text-muted-foreground hover:text-primary transition-theme"
              >
                Voorwaarden
              </Link>
            </Flex>
          </Flex>

          {/* Instagram - hidden on mobile, second on desktop */}
          {instagramLink?.url && (
            <Link
              href={instagramLink.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              className="hidden md:inline-flex md:items-center md:order-2 text-sm text-muted-foreground hover:text-primary transition-theme"
            >
              Instagram
            </Link>
          )}

          {/* Contact - first on mobile, last on desktop */}
          <Flex
            direction="column"
            items="start"
            gap={2}
            className="order-1 md:order-3"
          >
            {contact.email && (
              <Link
                href={`mailto:${contact.email}`}
                variant="subtle"
                className="text-sm"
              >
                <Text
                  variant="muted"
                  className="hover:text-primary transition-theme"
                >
                  {contact.email}
                </Text>
              </Link>
            )}
            {contact.phone && (
              <Link
                href={`tel:${contact.phone}`}
                variant="subtle"
                className="text-sm"
              >
                <Text
                  variant="muted"
                  className="hover:text-primary transition-theme"
                >
                  {contact.phone}
                </Text>
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
