import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";

export const metadata: Metadata = {
  title: "About - Leenders Coaching",
  description:
    "Learn about my approach to coaching and how I can help you achieve your goals.",
};

/**
 * About page with information about the coach and approach
 */
export default function AboutPage() {
  return (
    <Section>
      <Stack space={12}>
        <PageHeader
          title="About Me"
          description="Discover my unique approach to personal development and coaching"
        />

        <Stack space={8}>
          <div>About</div>
        </Stack>
      </Stack>
    </Section>
  );
}
