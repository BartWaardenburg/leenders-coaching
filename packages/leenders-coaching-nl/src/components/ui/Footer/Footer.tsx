import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Text } from "@/components/ui/Text";
import { Link } from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";

type FooterProps = {
  copyright?: string;
  instagram?: {
    href: string;
    label: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
} & ComponentPropsWithoutRef<"footer">;

/**
 * Simplified footer component with copyright, Instagram link, and contact information
 */
export const Footer = ({
  copyright = "© 2025 Leenders Coaching",
  instagram = {
    href: "https://instagram.com/leenderscoaching",
    label: "Instagram"
  },
  contact = {
    email: "info@leenders-coaching.nl",
    phone: "+31 6 12345678"
  },
  className,
  ...props
}: FooterProps) => {
  return (
    <Box
      as="footer"
      className={twMerge(
        "mt-auto bg-secondary/20 dark:bg-menu transition-colors duration-300 bg-background",
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
          {/* Copyright - first on desktop, second on mobile */}
          <Text variant="muted" className="text-sm order-2 md:order-1">
            {copyright}
          </Text>

          {/* Instagram - hidden on mobile, second on desktop */}
          <Link
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="subtle"
            className="hidden md:block md:order-2"
          >
            <Text variant="muted" className="text-sm hover:text-primary transition-colors">
              {instagram.label}
            </Text>
          </Link>

          {/* Contact - first on mobile, last on desktop */}
          <Flex
            direction="column"
            gap={2}
            className="md:flex-row md:gap-4 order-1 md:order-3"
          >
            {contact.email && (
              <Link href={`mailto:${contact.email}`} variant="subtle">
                <Text variant="muted" className="text-sm hover:text-primary transition-colors">
                  {contact.email}
                </Text>
              </Link>
            )}
            {contact.phone && (
              <Link href={`tel:${contact.phone}`} variant="subtle">
                <Text variant="muted" className="text-sm hover:text-primary transition-colors">
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
