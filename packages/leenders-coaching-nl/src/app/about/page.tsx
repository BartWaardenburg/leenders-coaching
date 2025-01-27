import type { Metadata } from "next";

import { ContentSection } from "@/components/sections/ContentSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
          <ContentSection>
            <SectionHeader title="My Approach" />I believe in a holistic
            approach to coaching, focusing on both personal and professional
            growth. My methods are based on proven techniques and years of
            experience in helping people achieve their goals.
          </ContentSection>

          <ContentSection>
            <SectionHeader title="Qualifications" />
            With extensive training in personal development and coaching
            methodologies, I am committed to providing the highest quality
            guidance and support.
          </ContentSection>

          <ContentSection>
            <SectionHeader title="Experience" />
            Over the years, I have helped numerous clients transform their lives
            through targeted coaching sessions and personalized development
            plans.
          </ContentSection>
        </Stack>
      </Stack>
    </Section>
  );
}
