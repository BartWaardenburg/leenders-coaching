import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/ContactForm";
import { ContentSection } from "@/components/sections/ContentSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";

export const metadata: Metadata = {
  title: "Contact - Leenders Coaching",
  description:
    "Get in touch to start your journey towards personal growth and success.",
};

/**
 * Contact page with form and contact information
 */
export default function ContactPage() {
  return (
    <Section>
      <Stack space={12}>
        <PageHeader
          title="Contact Me"
          description="Ready to start your journey? Get in touch today"
        />
        <ContentSection>
          I&apos;m here to help you take the first step towards positive change.
          Fill out the form below and I&apos;ll get back to you as soon as
          possible.
        </ContentSection>
        <ContactForm />
      </Stack>
    </Section>
  );
}
