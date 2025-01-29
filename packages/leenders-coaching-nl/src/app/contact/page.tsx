import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/ContactForm";
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
        <ContactForm />
      </Stack>
    </Section>
  );
}
