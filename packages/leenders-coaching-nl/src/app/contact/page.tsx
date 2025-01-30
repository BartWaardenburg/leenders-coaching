import type { Metadata } from "next";

import { SectionHeader } from "@/components/sections/SectionHeader";

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
    <SectionHeader
      title="Contact Me"
      description="Ready to start your journey? Get in touch today"
    />
  );
}
