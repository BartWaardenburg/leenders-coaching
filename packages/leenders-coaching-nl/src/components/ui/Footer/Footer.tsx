import Link from "next/link";

import { GradientBackground } from "@/components/ui/GradientBackground";
import { Text } from "@/components/ui/Text";

import { FooterCopyright } from "./FooterCopyright";
import { FooterHeading } from "./FooterHeading";
import { FooterList, FooterListItem } from "./FooterList";
import { FooterSection, FooterSectionItem } from "./FooterSection";
import { FooterSocialLinks } from "./FooterSocialLinks";

export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  href: string;
  label: string;
};

type FooterProps = {
  brandSection: {
    title: string;
    description: string;
  };
  navigationSection: {
    title: string;
    items: NavItem[];
  };
  contactSection: {
    title: string;
    email: {
      label: string;
      value: string;
    };
    phone: {
      label: string;
      value: string;
    };
    location: {
      label: string;
      value: string;
    };
  };
  socialSection: {
    title: string;
    items: SocialLink[];
  };
  copyright: {
    text: string;
  };
};

/**
 * Footer component with navigation, contact information, and social links
 */
export const Footer = ({
  brandSection,
  navigationSection,
  contactSection,
  socialSection,
  copyright,
}: FooterProps) => {
  return (
    <footer className="mt-auto">
      <GradientBackground variant="footer">
        <div className="container mx-auto px-4 py-16">
          <FooterSection>
            {/* Brand */}
            <FooterSectionItem>
              <FooterHeading>{brandSection.title}</FooterHeading>
              <Text variant="muted">{brandSection.description}</Text>
            </FooterSectionItem>

            {/* Quick Links */}
            <FooterSectionItem>
              <FooterHeading>{navigationSection.title}</FooterHeading>
              <FooterList>
                {navigationSection.items.map((item) => (
                  <FooterListItem key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200"
                    >
                      {item.label}
                    </Link>
                  </FooterListItem>
                ))}
              </FooterList>
            </FooterSectionItem>

            {/* Contact */}
            <FooterSectionItem>
              <FooterHeading>{contactSection.title}</FooterHeading>
              <FooterList>
                <FooterListItem>
                  <Text variant="muted">
                    <span className="text-primary">
                      {contactSection.email.label}:
                    </span>{" "}
                    {contactSection.email.value}
                  </Text>
                </FooterListItem>
                <FooterListItem>
                  <Text variant="muted">
                    <span className="text-primary">
                      {contactSection.phone.label}:
                    </span>{" "}
                    {contactSection.phone.value}
                  </Text>
                </FooterListItem>
                <FooterListItem>
                  <Text variant="muted">
                    <span className="text-primary">
                      {contactSection.location.label}:
                    </span>{" "}
                    {contactSection.location.value}
                  </Text>
                </FooterListItem>
              </FooterList>
            </FooterSectionItem>

            {/* Social */}
            <FooterSectionItem>
              <FooterHeading>{socialSection.title}</FooterHeading>
              <FooterSocialLinks items={socialSection.items} />
            </FooterSectionItem>
          </FooterSection>

          <FooterCopyright>{copyright.text}</FooterCopyright>
        </div>
      </GradientBackground>
    </footer>
  );
};
