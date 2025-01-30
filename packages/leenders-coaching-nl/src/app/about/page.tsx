import type { Metadata } from "next";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionContent } from "@/components/sections/SectionContent";
import { SectionCards } from "@/components/sections/SectionCards";
import { Card } from "@/components/ui/Card";

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
    <>
      <SectionHeader
        title="About Me"
        description="Discover my unique approach to personal development and coaching"
        background="teal"
      />
      <SectionContent border title="Over mij">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </p>
      </SectionContent>
      <SectionCards title="Mijn expertise">
        <Card title="Mijn expertise" slug="my-expertise" />
        <Card title="Mijn expertise" slug="my-expertise" />
        <Card title="Mijn expertise" slug="my-expertise" />
        <Card title="Mijn expertise" slug="my-expertise" />
      </SectionCards>
    </>
  );
}
