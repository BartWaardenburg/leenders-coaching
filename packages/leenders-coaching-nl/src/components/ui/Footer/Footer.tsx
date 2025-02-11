import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Text } from "@/components/ui/Text";
import { Link } from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";

import { footerConfig } from "@/config/footer.config";

type FooterProps = ComponentPropsWithoutRef<"footer">;

/**
 * Footer component using the footerConfig for content
 */
export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <Box
      as="footer"
      className={twMerge(
        "mt-auto bg-secondary/20 dark:bg-menu transition-theme bg-background",
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
            {footerConfig.copyright}
          </Text>

          {/* Instagram - hidden on mobile, second on desktop */}
          <Link
            href={footerConfig.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="subtle"
            className="hidden md:block md:order-2"
          >
            <Text variant="muted" className="text-sm hover:text-primary transition-theme">
              {footerConfig.instagram.label}
            </Text>
          </Link>

          {/* Contact - first on mobile, last on desktop */}
          <Flex
            direction="column"
            gap={2}
            className="md:flex-row md:gap-4 order-1 md:order-3"
          >
            {footerConfig.contact.email && (
              <Link href={`mailto:${footerConfig.contact.email}`} variant="subtle">
                <Text variant="muted" className="text-sm hover:text-primary transition-theme">
                  {footerConfig.contact.email}
                </Text>
              </Link>
            )}
            {footerConfig.contact.phone && (
              <Link href={`tel:${footerConfig.contact.phone}`} variant="subtle">
                <Text variant="muted" className="text-sm hover:text-primary transition-theme">
                  {footerConfig.contact.phone}
                </Text>
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
